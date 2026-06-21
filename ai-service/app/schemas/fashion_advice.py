from pydantic import BaseModel

from app.schemas.fashion_advice_response import (
    FashionAdviceResponse,
)


class FashionAdviceRequest(BaseModel):
    gender: str
    age: int

    height: float
    weight: float

    bodyType: str
    skinTone: str

    preferredStyle: str
    favoriteColor: str

    outfitName: str

    outfitItems: list[str]


class FashionAdviceResponse(BaseModel):
    advice: str
    explanation: str
    tips: list[str]