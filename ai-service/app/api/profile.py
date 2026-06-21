from fastapi import APIRouter

from app.schemas.profile import (
    ProfileAnalysisRequest,
    ProfileAnalysisResponse,
)

from app.services.profile_analysis import (
    ProfileAnalysisService,
)

router = APIRouter(
    prefix="/api/v1",
    tags=["Profile Analysis"],
)


@router.post(
    "/analyze-profile",
    response_model=ProfileAnalysisResponse,
)
def analyze_profile(
    payload: ProfileAnalysisRequest,
):

    bmi = ProfileAnalysisService.calculate_bmi(
        payload.height,
        payload.weight,
    )

    body_type = (
        ProfileAnalysisService.classify_body_type(
            bmi,
        )
    )

    return {
        "bmi": bmi,
        "bodyType": body_type,
    }