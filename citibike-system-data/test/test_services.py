import pytest
from unittest.mock import AsyncMock
from app.services.citybike_url_generator import CitiBikeURLGenerator
from app.services.url_checker import URLChecker

from app.services.citibike_service import CitiBikeService

BASE_URL = "https://s3.amazonaws.com/tripdata/"



@pytest.mark.asyncio
async def test_get_dataset_urls():
    mock_generator = AsyncMock(CitiBikeURLGenerator)
    mock_checker = AsyncMock(URLChecker)
    
    # Simulate generated URLs
    mock_generator.generate.return_value = [
        "https://s3.amazonaws.com/tripdata/valid-dataset.zip"
    ]

    # Simulate URL checking
    mock_checker.check_urls.return_value = [
        {"name": "valid-dataset.zip", "url": "https://s3.amazonaws.com/tripdata/valid-dataset.zip"}
    ]

    service = CitiBikeService(mock_generator, mock_checker)
    result = await service.get_dataset_urls(2024, 2)

    assert len(result) == 1
    assert result[0]["name"] == "valid-dataset.zip"
