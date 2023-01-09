from authenticator import authenticator
from fastapi import APIRouter, Depends, Response, Request
from queries.accounts import AccountIn, AccountOut, AccountRepository
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel


class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str


router = APIRouter()

@router.post("/api/accounts", response_model=AccountOut | HttpError)
async def create_account(info:AccountIn, request: Request, response:Response, repo:AccountRepository=Depends()):
    hashed_password= authenticator.hash_password(info.password)
    account= repo.create_account(info, hashed_password)
    form= AccountForm(username=info.email, password=info.password)
    token= await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
