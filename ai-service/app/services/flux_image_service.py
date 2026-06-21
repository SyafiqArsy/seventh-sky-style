import replicate

from app.core.config import (
    REPLICATE_API_TOKEN,
)

replicate.Client(
    api_token=REPLICATE_API_TOKEN,
)


class FluxImageService:

    @staticmethod
    def generate_image(
        prompt: str,
    ):

        output = replicate.run(
            "black-forest-labs/flux-1.1-pro",
            input={
                "prompt": prompt,
            },
        )

        print("========== FLUX OUTPUT ==========")
        print(type(output))
        print(output)
        print("=================================")

        return {
            "imageUrl": str(output)
        }