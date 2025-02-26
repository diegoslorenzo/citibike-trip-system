import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_citibike_dataset():
    response = client.get("/api/v1/citibike-datatset/?year=2024&month=2")
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Must return a list of datasets.

@pytest.mark.parametrize("year", [2024, 2023])
def test_get_citibike_dataset_without_month(year):
    """Test para verificar que la API funciona sin el parámetro month"""
    response = client.get(f"/api/v1/citibike-datatset/?year={year}")

    assert response.status_code == 200
    json_response = response.json()
    
    # Must return a list of datasets.
    assert isinstance(json_response, list)

    # Must be at most 12 months * 4 formats = 48 possible files 
    assert len(json_response) <= 48

    # Check that there are datasets with different months
    months_found = set()
    for item in json_response:
        assert "name" in item
        assert "url" in item
        assert item["url"].startswith("https://s3.amazonaws.com/tripdata/")
        
        # Extract the month from the file name
        for month in range(1, 13):
            if f"{year}{month:02d}" in item["name"]:
                months_found.add(month)

    # Must have found at least one month
    assert len(months_found) > 0