import asyncio

from app.services.citybike_url_generator import CitiBikeURLGenerator
from app.services.url_checker import URLChecker

class CitiBikeService:
    def __init__(self, url_generator: CitiBikeURLGenerator, url_checker: URLChecker):
        self.url_generator = url_generator
        self.url_checker = url_checker

    async def get_dataset_urls(self, year: int, month: int = None):
        """Obtiene y verifica los datasets disponibles para el año y mes dados."""
        if month:
            urls = self.url_generator.generate(year, month)
            valid_files = await self.url_checker.check_urls(urls)
        else:
            # Si no se especifica mes, busca en todos los meses del año
            tasks = {m: self.url_generator.generate(year, m) for m in range(1, 13)}
            checks = {m: self.url_checker.check_urls(urls) for m, urls in tasks.items()}
            valid_results = await asyncio.gather(*checks.values())

            valid_files = [file for result in valid_results for file in result]

        return valid_files
