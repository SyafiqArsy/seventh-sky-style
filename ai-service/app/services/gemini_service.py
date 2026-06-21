import json

from google import genai

from app.core.config import (
    GEMINI_API_KEY,
)

client = genai.Client(
    api_key=GEMINI_API_KEY
)


class GeminiService:

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

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json"
            }
        )

        print("========== GEMINI RESPONSE ==========")
        print(response.text)
        print("====================================")

        return json.loads(
            response.text
        )