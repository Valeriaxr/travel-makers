from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool
from datetime import date
from queries.flights import FlightOut
from queries.activities import ActivityOut
from queries.accounts import AccountOut
from queries.hotels import HotelOut



class Error(BaseModel):
    message: str


class TripIn(BaseModel):
    trip_name: str
    destination: str
    start_date: date
    end_date: date
    outgoing_flight: int
    returning_flight: int
    num_people: int
    user_id: int
    hotel_id: int


class TripOut(BaseModel):
    id: int
    trip_name: str
    destination: str
    start_date: date
    end_date: date
    outgoing_flight: FlightOut
    returning_flight: FlightOut
    num_people: int
    user: AccountOut
    hotel: HotelOut


class TripRepository:
    def create_trip(self, trip: TripIn) -> TripOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        insert into trips
                            (trip_name, destination, start_date, end_date, outgoing_flight, returning_flight, num_people, user_id, hotel_id)
                        values
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        returning id;
                        """,
                        [
                            trip.trip_name,
                            trip.destination,
                            trip.start_date,
                            trip.end_date,
                            trip.outgoing_flight,
                            trip.returning_flight,
                            trip.num_people,
                            trip.user_id,
                            trip.hotel_id
                        ]
                    )
                    id=result.fetchone()[0]
                    return self.get_trip(id)
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

    # def trip_in_to_out(self, id:int, trip:TripIn):
    #     old_data=trip.dict()
    #     return TripOut(id=id, **old_data)
