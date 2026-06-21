from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY"
)

REPLICATE_API_TOKEN = os.getenv(
    "REPLICATE_API_TOKEN"
)