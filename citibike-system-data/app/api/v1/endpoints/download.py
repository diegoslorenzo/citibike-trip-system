from fastapi import APIRouter, Depends
from app.services.citibike_service import CitiBikeService
from app.services.citybike_url_generator import CitiBikeURLGenerator
from app.services.url_checker import URLChecker
import httpx

router = APIRouter()

@router.get("/download/")
async def download_data(year: int, month: int = None):
    """Endpoint que obtiene las URLs disponibles de CitiBike."""
    url_generator = CitiBikeURLGenerator()
    
    async with httpx.AsyncClient() as client:
        url_checker = URLChecker(client)
        service = CitiBikeService(url_generator, url_checker)
        result = await service.get_dataset_urls(year, month)

    return result
