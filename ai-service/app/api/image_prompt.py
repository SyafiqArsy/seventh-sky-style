from fastapi import APIRouter

from app.schemas.image_prompt import (
    ImagePromptRequest,
    ImagePromptResponse,
)

from app.services.image_prompt_service import (
    ImagePromptService,
)

router = APIRouter(
    prefix="/api/v1",
    tags=["Image Prompt"],
)


@router.post(
    "/generate-image-prompt",
    response_model=ImagePromptResponse,
)
def generate_image_prompt(
    payload: ImagePromptRequest,
):
    return ImagePromptService.generate_prompt(
        payload
    )