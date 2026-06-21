from pydantic import BaseModel


class ImagePromptRequest(BaseModel):
    gender: str

    height: float
    weight: float

    bmi: float

    bodyType: str
    skinTone: str

    preferredStyle: str
    favoriteColor: str

    outfitName: str

    outfitItems: list[str]


class ImagePromptResponse(BaseModel):
    prompt: str