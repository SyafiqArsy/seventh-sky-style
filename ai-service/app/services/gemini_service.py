import json

from google import genai

from app.core.config import (GEMINI_API_KEY,)

from tenacity import (retry,stop_after_attempt,wait_exponential,)

client = genai.Client(
    api_key=GEMINI_API_KEY
)


class GeminiService:

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(
            multiplier=2,
            min=2,
            max=10,
        ),
    )
    def _call_gemini(prompt: str):
        return client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={
                "response_mime_type":
                "application/json"
            }
        )

    @staticmethod
    def generate_fashion_advice(
        payload,
    ):

        prompt = f"""
You are a professional fashion stylist.

User Profile:
- Gender: {payload.gender}
- Age: {payload.age}
- Height: {payload.height}
- Weight: {payload.weight}
- Body Type: {payload.bodyType}
- Skin Tone: {payload.skinTone}
- Preferred Style: {payload.preferredStyle}
- Favorite Color: {payload.favoriteColor}

Recommended Outfit:
- Outfit Name: {payload.outfitName}
- Items: {", ".join(payload.outfitItems)}

Return ONLY this JSON structure.

Do not add any other fields.

{{
  "advice": "...",
  "explanation": "...",
  "tips": [
    "...",
    "...",
    "..."
  ]
}}
"""

        try:
            response = GeminiService._call_gemini(
                prompt
            )

            return json.loads(
                response.text
            )

        except Exception as e:

            print(e)

            return {
                "advice":
                    f"The {payload.outfitName} outfit suits your profile well.",

                "explanation":
                    "AI stylist service is temporarily unavailable. This recommendation is generated using system fallback logic.",

                "tips": [
                    "Choose proper fit",
                    "Maintain color balance",
                    "Wear with confidence"
                ]
            }

        print("========== GEMINI RESPONSE ==========")
        print(response.text)
        print("====================================")

        return json.loads(
            response.text
        )