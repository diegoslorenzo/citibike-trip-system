from pydantic_settings import BaseSettings
from typing import List

BASE_URL = "https://s3.amazonaws.com/tripdata/"

class Settings(BaseSettings):
    # Server configuration
    APP_NAME: str = "CitiBike API"
    DEBUG: bool = True

    # CORS configuration (making sure it's a list)
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]

settings = Settings()
