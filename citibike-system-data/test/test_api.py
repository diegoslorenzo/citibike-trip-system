from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_citibike_datatset_data():
    response = client.get("/api/v1/citibike-datatset/?year=2025&month=1")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
