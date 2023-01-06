from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str

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


class AccountRepository:
    def create_account(self, account:AccountIn)-> AccountOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        insert into accounts
                            (username, password, first_name, last_name, email)
                        values 
                            (%s, %s, %s, %s, %s)
                        returning id:
                        """,
                        [
                            account.username, 
                            account.password,
                            account.first_name,
                            account.last_name,
                            account.email
                        ]
                    )
                    id=result.fetchone()[0]
                    return self.account_in_to_out(id, account)
        except Exception:
            return {"message": "create did not work"}

    def get_account(self, account_id: int)-> Optional[AccountOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id 
                        , username
                        , password
                        , first_name
                        , last_name
                        , email
                        from accounts 
                        where id=%s 
                        """,
                        [account_id]
                    )
                    record=result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get that account"}

    def get_accounts(self)->Union[Error, List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id, username, password, first_name, last_name, email
                        from accounts
                        order by last_name;
                        """
                    )
                    return [
                        self.record_to_account_out(record)
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all accounts"}

    def update_account(self, account_id:int, account:AccountIn)->Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        update accounts
                        set username = %s
                        , password = %s
                        , first_name = %s
                        , last_name = %s
                        , email = %s
                        where id = %s
                        """,
                        [
                            account.username,
                            account.password,
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.id
                        ]
                    )
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            print(e)
            return {"message": "could not update that account"}
    
    def delete_account(self, account_id:int)->bool:
        try:
            with pool.connection as conn:
                 with conn.cursor() as db:
                    db.execute(
                        """
                        delete from accounts
                        where id = %s
                        """,
                        [account_id]
                    )
                    return True
                
        except Exception as e:
            print(e)
            return False

            
    def account_in_to_out(self, id:int, account:AccountIn):
        old_data=account.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account_out(self, record):
        return AccountOut(
            id=record[0],
            username=record[1],
            password=record[2],
            first_name=record[3],
            last_name=record[4],
            email=record[5]
        )


