from pydantic import BaseModel
from queries.pool import pool


class AccountIn(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str


class Account(BaseModel):
    id: int
    email: str
    hashed_password: str
    first_name: str
    last_name: str


class AccountOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str


class AccountRepository:
    def create_account(
        self,
        account: AccountIn,
        hashed_password: str
    ) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    insert into accounts
                        (email, hashed_password, first_name, last_name)
                    values
                        (%s, %s, %s, %s)
                    returning id;
                    """,
                    [
                        account.email,
                        hashed_password,
                        account.first_name,
                        account.last_name
                    ]
                )
                id = result.fetchone()[0]
                return Account(
                    id=id,
                    email=account.email,
                    hashed_password=hashed_password,
                    first_name=account.first_name,
                    last_name=account.last_name,
                )

    def get_account(self, email: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    select id
                    , email
                    , hashed_password
                    , first_name
                    , last_name
                    from accounts
                    where email=%s;
                    """,
                    [email]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return Account(
                    id=record[0],
                    email=record[1],
                    hashed_password=record[2],
                    first_name=record[3],
                    last_name=record[4]
                )
