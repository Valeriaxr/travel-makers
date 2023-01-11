from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool
from datetime import date
from queries.accounts import AccountOut



class Error(BaseModel):
    message: str


class TripIn(BaseModel):
    trip_name: str
    destination: str
    start_date: date
    end_date: date
    num_people: int
    user_id: int


class TripOut(BaseModel):
    id: int
    trip_name: str
    destination: str
    start_date: date
    end_date: date
    num_people: int
    user: AccountOut

class TripRepository:
    def create_trip(self, trip: TripIn) -> TripOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        insert into trips
                            (trip_name, destination, start_date, end_date, num_people, user_id)
                        values
                            (%s, %s, %s, %s, %s, %s)
                        returning id;
                        """,
                        [
                            trip.trip_name,
                            trip.destination,
                            trip.start_date,
                            trip.end_date,
                            trip.num_people,
                            trip.user_id,
                        ]
                    )
                    id=result.fetchone()[0]
                    return self.trip_in_to_out(id, trip)
        except Exception as e:
            print(e)
            return {"message": "create did not work"}

    def get_trip(self, trip_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT t.id as trip_id, t.trip_name, t.destination, t.start_date,
                    t.end_date, f.number as outgoing_flight

                    """
                )

    def trip_in_to_out(self, id:int, trip:TripIn):
        old_data=trip.dict()
        return TripOut(id=id, **old_data)
