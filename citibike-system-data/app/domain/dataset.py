from pydantic import BaseModel

class Dataset(BaseModel):
    name: str
    url: str
