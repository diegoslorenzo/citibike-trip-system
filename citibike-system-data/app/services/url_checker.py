import httpx
from typing import List
from app.domain.dataset import Dataset

class URLChecker:
    def __init__(self, client: httpx.AsyncClient):
        self.client = client

    async def check_urls(self, urls: List[str]) -> List[Dataset]:
        """Check if the URLs exist on the server."""
        valid_files = []
        for url in urls:
            response = await self.client.head(url)
            if response.status_code == 200:
                file_name = url.split("/")[-1]
                valid_files.append(Dataset(name=file_name, url=url))
        
        return valid_files
