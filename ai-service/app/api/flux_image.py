from fastapi import APIRouter

from app.schemas.flux_image import (
    FluxImageRequest,
    FluxImageResponse,
)

from app.services.flux_image_service import (
    FluxImageService,
)

router = APIRouter(
    prefix="/api/v1",
    tags=["Flux Image"],
)


@router.post(
    "/generate-image",
    response_model=FluxImageResponse,
)
def generate_image(
    payload: FluxImageRequest,
):
    return FluxImageService.generate_image(
        payload.prompt
    )