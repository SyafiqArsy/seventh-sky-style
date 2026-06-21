from pydantic import BaseModel


class PromptGenerationRequest(BaseModel):
    gender: str
    height: float
    weight: float

    bodyType: str
    skinTone: str

    preferredStyle: str
    favoriteColor: str

    outfitName: str
    outfitItems: list[str]


class PromptGenerationResponse(BaseModel):
    prompt: str