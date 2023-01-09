from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool


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
    def create_hotel(self, hotel: HotelIn) -> HotelOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        insert into hotels 
                            (hotel_name, address, city, longitude, latitude)
                        values 
                            (%s, %s, %s, %s, %s)
                        returning id;
                        """,
                        [
                            hotel.hotel_name,
                            hotel.address,
                            hotel.city,
                            hotel.longitude,
                            hotel.latitude,
                        ]
                    )
                    id=result.fetchone()[0]
                    return self.hotel_in_to_out(id, hotel)
        except Exception:
            return {"message": "create did not work"}


    def get_hotels(self) -> Error | List[HotelOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id, hotel_name, address, city, longitude, latitude
                        from hotels
                        order by city, hotel_name
                        """
                    )
                    return [
                        self.record_to_hotel_out(record)
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all hotels"}

    def get_hotel(self, hotel_id: int) -> Optional[HotelOut]:
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
                        from hotels
                        where id = %s;
                        """,
                        [hotel_id]
                    )
                    record=result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_hotel_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get that hotel"}

    def update_hotel(self, hotel_id: int, hotel: HotelIn) -> HotelOut | Error:
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
                        where id = %s; 
                        """,
                        [
                            hotel.hotel_name,
                            hotel.address,
                            hotel.city,
                            hotel.longitude,
                            hotel.latitude,
                            hotel_id
                        ]
                    )
                    return self.hotel_in_to_out(hotel_id, hotel)
        except Exception as e:
            print(e)
            return {"message": "could not update that hotel"}

    def delete_hotel(self, hotel_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        delete from hotels
                        where id = %s;
                        """,
                        [hotel_id]
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
        )
    
