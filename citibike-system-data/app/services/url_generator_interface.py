from abc import ABC, abstractmethod
from typing import List

### INTERFACE FOR URL GENERATION (Open/Closed Principle - OCP) ###
class URLGenerator(ABC):
    @abstractmethod
    def generate(self, year: int, month: int) -> List[str]:
        pass