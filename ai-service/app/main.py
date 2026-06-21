from fastapi import FastAPI

from app.api.profile import router as profile_router

from app.api.fashion_advice import (router as fashion_advice_router,)

from app.api.image_prompt import (router as image_prompt_router,)

app = FastAPI(
    title="Seventh Sky Style AI Service",
    version="1.0.0",
)

app.include_router(profile_router)

app.include_router(
    fashion_advice_router
)

@app.get("/")
def root():
    return {
        "message": "Seventh Sky Style AI Service",
    }

app.include_router(
    image_prompt_router
)