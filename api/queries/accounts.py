from pydantic import BaseModel
from typing import Optional


class AccountIn(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    email: str

class AccountOut(BaseModel):
    id: int
    username: str
    password: str
    first_name: str
    last_name: str
    email: str
