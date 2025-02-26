from app.services.url_generator_interface import URLGenerator

from typing import List

from app.core.config import BASE_URL

class CitiBikeURLGenerator(URLGenerator):
    def generate(self, year: int, month: int) -> List[str]:
        """Genera todas las posibles combinaciones de URLs para un mes y año."""
        month_str = f"{month:02d}"
        return [
            f"{BASE_URL}{year}{month_str}-citibike-tripdata.csv.zip",
            f"{BASE_URL}{year}{month_str}-citibike-tripdata.zip",
            f"{BASE_URL}JC-{year}{month_str}-citibike-tripdata.csv.zip",
            f"{BASE_URL}JC-{year}{month_str}-citibike-tripdata.zip"
        ]