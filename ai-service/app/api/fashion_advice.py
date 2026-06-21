from fastapi import APIRouter

from app.schemas.fashion_advice import (
    FashionAdviceRequest,
    FashionAdviceResponse,
)

from app.services.gemini_service import (
    GeminiService,
)

router = APIRouter(
    prefix="/api/v1",
    tags=["Fashion Advice"],
)


@router.post(
    "/fashion-advice",
    response_model=FashionAdviceResponse,
)
def fashion_advice(
    payload: FashionAdviceRequest,
):
    return GeminiService.generate_fashion_advice(
        payload
    )