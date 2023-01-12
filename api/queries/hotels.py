from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool
from queries.trips import TripOut

class Error(BaseModel):
    message: str


class HotelIn(BaseModel):
    hotel_name: str
    address: str
    city: str
    longitude: float
    latitude: float


class HotelOut(BaseModel):
    id: int
    hotel_name: str
    address: str
    city: str
    longitude: float
    latitude: float


class HotelRepository:
    def create_hotel(self, hotel: HotelIn, trip: TripOut) -> HotelOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        insert into hotels
                            (hotel_name, address, city, longitude, latitude, trip_id)
                        values
                            (%s, %s, %s, %s, %s, %s)
                        returning id;
                        """,
                        [
                            hotel.hotel_name,
                            hotel.address,
                            hotel.city,
                            hotel.longitude,
                            hotel.latitude,
                            trip.id
                        ]
                    )
                    id=result.fetchone()[0]
                    return self.hotel_in_to_out(id, hotel)
        except Exception:
            return {"message": "create did not work"}


    def get_hotels(self, trip: TripOut) -> Error | List[HotelOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id, hotel_name, address, city, longitude, latitude, trip_id
                        from hotels
                        where trip_id = %s
                        order by hotel_name
                        """,
                        [trip.id]
                    )
                    return [
                        self.record_to_hotel_out(record)
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all hotels"}

    def get_hotel(self, hotel_id: int, trip: TripOut) -> Optional[HotelOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id
                            , hotel_name
                            , address
                            , city
                            , longitude
                            , latitude
                            , trip_id
                        from hotels
                        where id = %s and trip_id = %s;
                        """,
                        [hotel_id, trip.id]
                    )
                    record=result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_hotel_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get that hotel"}

    def update_hotel(self, hotel_id: int, hotel: HotelIn, trip: TripOut) -> HotelOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        update hotels
                        set hotel_name = %s
                            , address = %s
                            , city = %s
                            , longitude = %s
                            , latitude = %s
                        where id = %s and trip_id = %s;
                        """,
                        [
                            hotel.hotel_name,
                            hotel.address,
                            hotel.city,
                            hotel.longitude,
                            hotel.latitude,
                            hotel_id,
                            trip.id
                        ]
                    )
                    return self.hotel_in_to_out(hotel_id, hotel)
        except Exception as e:
            print(e)
            return {"message": "could not update that hotel"}

    def delete_hotel(self, hotel_id: int, trip: TripOut) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        delete from hotels
                        where id = %s and trip_id = %s;
                        """,
                        [hotel_id, trip.id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False


    def hotel_in_to_out(self, id:int, hotel:HotelIn):
        old_data=hotel.dict()
        return HotelOut(id=id, **old_data)

    def record_to_hotel_out(self, record):
        return HotelOut(
            id=record[0],
            hotel_name=record[1],
            address=record[2],
            city=record[3],
            longitude=record[4],
            latitude=record[5],
            trip_id=record[6],
        )
