from pydantic import BaseModel
from typing import Optional, Union, List
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
    def create_account(self, account:AccountIn, hashed_password: str)-> Account:
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
                id=result.fetchone()[0]
                return Account(
                    id=id,
                    email=account.email,
                    hashed_password=hashed_password,
                    first_name=account.first_name,
                    last_name=account.last_name
                )


    def get_account(self, email: str)-> Account:
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
                record=result.fetchone()
                if record is None:
                    return None
                return Account(
                    id=record[0],
                    email=record[1],
                    hashed_password=record[2],
                    first_name=record[3],
                    last_name=record[4]
                )


    # def get_accounts(self)->Union[Error, List[AccountOut]]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     select id, username, password, first_name, last_name, email
    #                     from accounts
    #                     order by last_name;
    #                     """
    #                 )
    #                 return [
    #                     self.record_to_account_out(record)
    #                     for record in db
    #                 ]
    #     except Exception as e:
    #         print(e)
    #         return {"message": "could not get all accounts"}

    # def update_account(self, account_id:int, account:AccountIn)->Union[AccountOut, Error]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     update accounts
    #                     set username = %s
    #                     , hashed_password = %s
    #                     , first_name = %s
    #                     , last_name = %s
    #                     , email = %s
    #                     where id = %s
    #                     """,
    #                     [
    #                         account.username,
    #                         account.hashed_password,
    #                         account.first_name,
    #                         account.last_name,
    #                         account.email,
    #                         account.id
    #                     ]
    #                 )
    #                 return self.account_in_to_out(account_id, account)
    #     except Exception as e:
    #         print(e)
    #         return {"message": "could not update that account"}

    # def delete_account(self, account_id:int)->bool:
    #     try:
    #         with pool.connection as conn:
    #              with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     delete from accounts
    #                     where id = %s
    #                     """,
    #                     [account_id]
    #                 )
    #                 return True

    #     except Exception as e:
    #         print(e)
    #         return False
