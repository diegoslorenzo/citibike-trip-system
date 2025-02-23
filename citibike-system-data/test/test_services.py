import pytest
from app.services.url_generator import CitiBikeURLGenerator

def test_url_generator():
    generator = CitiBikeURLGenerator()
    urls = generator.generate(2025, 1)
    
    assert len(urls) == 4
    assert "202501-citibike-tripdata.csv.zip" in urls[0]
