from pydantic import BaseModel, Field


class ProfileAnalysisRequest(BaseModel):
    height: float = Field(..., gt=0)
    weight: float = Field(..., gt=0)


class ProfileAnalysisResponse(BaseModel):
    bmi: float
    bodyType: str