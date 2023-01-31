from pydantic import BaseModel
from typing import List
from queries.pool import pool
from datetime import date


class Error(BaseModel):
    message: str


class TripIn(BaseModel):
    trip_name: str
    destination: str
    start_date: date
    end_date: date
    num_people: int


class TripOut(BaseModel):
    id: int
    trip_name: str
    destination: str
    start_date: date
    end_date: date
    num_people: int


class TripRepository:
    def create_trip(self, trip: TripIn, user_id: int) -> TripOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        insert into trips
                            (
                                trip_name
                                , destination
                                , start_date
                                , end_date
                                , num_people
                                , user_id
                            )
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
                            user_id,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.trip_in_to_out(id, trip)
        except Exception as e:
            print(e)
            return {"message": "create did not work"}

    def get_trip(self, trip_id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id
                        , trip_name
                        , destination
                        , start_date
                        , end_date
                        , num_people
                        from trips
                        where id = %s and user_id = %s;
                        """,
                        [trip_id, user_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_trip_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get that trip"}

    def get_trips(self, user_id: int) -> Error | List[TripOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        select
                            id
                            , trip_name
                            , destination
                            , start_date
                            , end_date
                            , num_people
                        from trips
                        where user_id = %s
                        order by start_date
                        """,
                        [user_id]
                    )
                    return [
                        self.record_to_trip_out(record)
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all trips"}

    def update_trip(
        self,
        trip_id: int,
        trip: TripIn,
        user_id: int
    ) -> TripOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        update trips
                        set trip_name = %s
                            , destination = %s
                            , start_date = %s
                            , end_date = %s
                            , num_people = %s
                        where id = %s and user_id = %s;
                        """,
                        [
                            trip.trip_name,
                            trip.destination,
                            trip.start_date,
                            trip.end_date,
                            trip.num_people,
                            trip_id,
                            user_id
                        ]
                    )
                    return self.trip_in_to_out(trip_id, trip)
        except Exception as e:
            print(e)
            return {"message": "could not update that trip"}

    def delete_trip(self, trip_id: int, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        delete from trips
                        where id = %s and user_id = %s;
                        """,
                        [trip_id, user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def trip_in_to_out(self, id: int, trip: TripIn):
        old_data = trip.dict()
        return TripOut(id=id, **old_data)

    def record_to_trip_out(self, record):
        return TripOut(
            id=record[0],
            trip_name=record[1],
            destination=record[2],
            start_date=record[3],
            end_date=record[4],
            num_people=record[5]
        )
