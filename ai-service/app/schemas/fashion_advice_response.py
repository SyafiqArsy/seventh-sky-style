from pydantic import BaseModel


class FashionAdviceResponse(
    BaseModel,
):
    advice: str
    explanation: str
    tips: list[str]