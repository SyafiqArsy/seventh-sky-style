from fastapi import APIRouter

from app.schemas.prompt_generation import (
    PromptGenerationRequest,
    PromptGenerationResponse,
)

from app.services.prompt_generation_service import (
    PromptGenerationService,
)

router = APIRouter(
    prefix="/api/v1",
    tags=["Prompt Generation"],
)


@router.post(
    "/generate-prompt",
    response_model=PromptGenerationResponse,
)
def generate_prompt(
    payload: PromptGenerationRequest,
):
    return PromptGenerationService.generate(
        payload
    )