import pytest
import httpx
from unittest.mock import AsyncMock
from app.services.url_checker import URLChecker
from app.domain.dataset import Dataset

@pytest.mark.asyncio
async def test_check_urls():
    mock_client = AsyncMock(httpx.AsyncClient)
    
    # Simulate HTTP responses (200 for valid URLs)
    mock_client.head = AsyncMock(side_effect=lambda url: AsyncMock(status_code=200 if "valid" in url else 404))

    checker = URLChecker(mock_client)
    urls = [
        "https://s3.amazonaws.com/tripdata/valid-dataset.zip",
        "https://s3.amazonaws.com/tripdata/blabla-dataset.zip"
    ]
    
    result = await checker.check_urls(urls)

    assert len(result) == 1
    assert isinstance(result[0], Dataset)
    assert result[0].name == "valid-dataset.zip"
    assert result[0].url == "https://s3.amazonaws.com/tripdata/valid-dataset.zip"
