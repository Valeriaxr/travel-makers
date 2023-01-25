from pydantic import BaseModel
from queries.pool import pool
from datetime import datetime
from typing import List, Optional
from queries.trips import TripOut


class Error(BaseModel):
    message: str


class FlightIn(BaseModel):
    number: str
    departure_location: str
    arrival_location: str
    departure_time: datetime
    arrival_time: datetime


class FlightOut(BaseModel):
    id: int
    number: str
    departure_location: str
    arrival_location: str
    departure_time: datetime
    arrival_time: datetime


class FlightRepository:
    def create_flight(self, flight:FlightIn, trip: TripOut)-> FlightOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        insert into flights
                            (number, departure_location, arrival_location, departure_time, arrival_time, trip_id)
                        values
                            (%s, %s, %s, %s, %s, %s)
                        returning id;
                        """,
                        [
                            flight.number,
                            flight.departure_location,
                            flight.arrival_location,
                            flight.departure_time,
                            flight.arrival_time,
                            trip.id
                        ]
                    )
                    id=result.fetchone()[0]
                    return self.flight_in_to_out(id, flight)
        except Exception as e:
            print(e)
            return {"message": "create did not work"}

    def get_flights(self, trip: TripOut)-> Error | List[FlightOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        select id, number, departure_location, arrival_location, departure_time, arrival_time, trip_id
                        from flights
                        where trip_id = %s
                        order by departure_time;
                        """,
                        [trip.id]
                    )
                    return[
                        self.record_to_flight_out(record)
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return{"message": "could not get all flights"}

    def get_flight(self, flight_id: int, trip: TripOut) -> Optional[FlightOut] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id
                            , number
                            , departure_location
                            , arrival_location
                            , departure_time
                            , arrival_time
                            , trip_id
                        from flights
                        where id = %s and trip_id = %s;
                        """,
                        [flight_id, trip.id]
                    )
                    record=result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_flight_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get that flight"}

    def update_flight(self, flight_id: int, flight: FlightIn, trip: TripOut) -> FlightOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        update flights
                        set number = %s
                            , departure_location = %s
                            , arrival_location = %s
                            , departure_time = %s
                            , arrival_time = %s
                        where id = %s and trip_id = %s;
                        """,
                        [
                            flight.number,
                            flight.departure_location,
                            flight.arrival_location,
                            flight.departure_time,
                            flight.arrival_time,
                            flight_id,
                            trip.id
                        ]
                    )
                    return self.flight_in_to_out(flight_id, flight)
        except Exception as e:
            print(e)
            return {"message": "could not update that flight"}

    def delete_flight(self, flight_id: int, trip: TripOut) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        delete from flights
                        where id = %s and trip_id=%s;
                        """,
                        [flight_id, trip.id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def flight_in_to_out(self, id:int, flight:FlightIn):
        old_data=flight.dict()
        return FlightOut(id=id, **old_data)

    def record_to_flight_out(self, record):
        return FlightOut(
            id=record[0],
            number=record[1],
            departure_location=record[2],
            arrival_location=record[3],
            departure_time=record[4],
            arrival_time=record[5],
            trip_id=record[5],

        )
