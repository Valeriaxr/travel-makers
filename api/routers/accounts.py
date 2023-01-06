# from authenticator import authenticator
from fastapi import APIRouter
from queries.accounts import AccountIn, AccountOut

router = APIRouter()


@router.post("/api/accounts", )
def create_account(account:AccountIn, response_model=AccountOut):
    pass
