from pydantic import BaseModel


class FluxImageRequest(BaseModel):
    prompt: str


class FluxImageResponse(BaseModel):
    imageUrl: str