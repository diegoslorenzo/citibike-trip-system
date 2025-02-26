import pytest
from app.services.citybike_url_generator import CitiBikeURLGenerator

BASE_URL = "https://s3.amazonaws.com/tripdata/"

@pytest.mark.parametrize("year, month, expected_urls", [
    (2024, 2, [
        f"{BASE_URL}202402-citibike-tripdata.csv.zip",
        f"{BASE_URL}202402-citibike-tripdata.zip",
        f"{BASE_URL}JC-202402-citibike-tripdata.csv.zip",
        f"{BASE_URL}JC-202402-citibike-tripdata.zip"
    ]),
    (2023, 11, [
        f"{BASE_URL}202311-citibike-tripdata.csv.zip",
        f"{BASE_URL}202311-citibike-tripdata.zip",
        f"{BASE_URL}JC-202311-citibike-tripdata.csv.zip",
        f"{BASE_URL}JC-202311-citibike-tripdata.zip"
    ])
])

def test_generate_urls(year, month, expected_urls):
    generator = CitiBikeURLGenerator()
    urls = generator.generate(year, month)
    assert urls == expected_urls
