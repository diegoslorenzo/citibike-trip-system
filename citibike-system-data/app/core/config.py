from pydantic_settings import BaseSettings
from typing import List

BASE_URL = "https://s3.amazonaws.com/tripdata/"

class Settings(BaseSettings):
    # Configuración del servidor
    APP_NAME: str = "CitiBike API"
    DEBUG: bool = True

    # Configuración de CORS (asegurando que sea una lista)
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]

settings = Settings()
