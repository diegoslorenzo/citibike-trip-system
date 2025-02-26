from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import citibike_datatset
from app.core.config import settings

app = FastAPI(title="CitiBike Data API")

# Configure CORS with allowed origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,  # Get the origins from `config.py`.
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers.
)

# Include routes from the citibike_dataset module
app.include_router(citibike_datatset.router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
