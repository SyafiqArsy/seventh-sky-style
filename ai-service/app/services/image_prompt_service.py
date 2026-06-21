import json

from google import genai

from app.core.config import (
    GEMINI_API_KEY,
)

client = genai.Client(
    api_key=GEMINI_API_KEY,
)


class ImagePromptService:

    @staticmethod
    def generate_prompt(
        payload,
    ):

        prompt = f"""
You are a professional fashion prompt engineer.

Create ONE final FLUX image generation prompt.

Do NOT use placeholders.

Do NOT use variables.

Do NOT use brackets.

Use the real user information below.

User:
Gender: {payload.gender}
Height: {payload.height}
Weight: {payload.weight}
BMI: {payload.bmi}
Body Type: {payload.bodyType}
Skin Tone: {payload.skinTone}
Preferred Style: {payload.preferredStyle}
Favorite Color: {payload.favoriteColor}

Outfit:
Name: {payload.outfitName}
Items:
{", ".join(payload.outfitItems)}

Requirements:

- Full body
- Fashion catalog
- Photorealistic
- Studio lighting
- Realistic proportions
- Detailed fabric textures
- Modern fashion photography
- Luxury clothing presentation

Return JSON only.

{{
  "prompt": "..."
}}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json"
            }
        )

        return json.loads(
            response.text
        )