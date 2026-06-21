class PromptGenerationService:

    @staticmethod
    def generate(payload):

        prompt = f"""
A full body photorealistic fashion catalog photograph featuring a {payload.gender} model.

Height approximately {payload.height} cm.

Body type {payload.bodyType}.

Skin tone {payload.skinTone}.

Style aesthetic {payload.preferredStyle}.

Favorite color accents {payload.favoriteColor}.

Outfit name: {payload.outfitName}

Outfit items:
{", ".join(payload.outfitItems)}

Professional fashion photography.
Studio lighting.
Ultra realistic.
High detail fabric texture.
Luxury fashion catalog.
"""
        return {
            "prompt": prompt
        }