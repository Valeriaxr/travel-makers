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
    outgoing_flight: str
    returning_flight: str
    num_people: int
    activities: list[int]
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
    activities: list[ActivityOut]
    user_id: AccountOut
    hotel_id: HotelOut


class TripRepository:
    def create_trip(self, trip: TripIn) -> TripOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        insert into trips
                            (trip_name, destination, start_date, end_date, outgoing_flight, returning_flight, num_people, activities, user_id, hotel_id)
                        values 
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                            trip.activities,
                            trip.user_id,
                            trip.hotel_id
                        ]
                    )
                    id=result.fetchone()[0]
                    return self.trip_in_to_out(id, trip)
        except Exception:
            return {"message": "create did not work"}

