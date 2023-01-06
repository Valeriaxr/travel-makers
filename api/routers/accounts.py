# from authenticator import authenticator
from fastapi import APIRouter
from queries.accounts import AccountIn, AccountOut

router = APIRouter()


@router.post("/api/accounts", response_model=AccountOut)
def create_account(account:AccountIn):
    pass
