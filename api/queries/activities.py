from pydantic import BaseModel
from queries.pool import pool
from datetime import date
from typing import List, Optional

class Error(BaseModel):
    message: str

class ActivityIn(BaseModel):
    activity_name: str
    activity_address: str
    longitude: float
    latitude: float
    rating: float
    picture_url: str
    hotel_distance: float

class ActivityOut(BaseModel):
    id: int
    activity_name: str
    activity_address: str
    longitude: float
    latitude: float
    rating: float
    picture_url: str
    hotel_distance: float

class ActivityRepository:
    def create_activity(self, activity:ActivityIn)-> ActivityOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        insert into activities
                            (activity_name, activity_address, longitude, latitude, rating, picture_url, hotel_distance)
                        values
                            (%s, %s, %s, %s, %s, %s, %s)
                        returning id;
                        """,
                        [
                            activity.activity_name,
                            activity.activity_address,
                            activity.longitude,
                            activity.latitude,
                            activity.rating,
                            activity.picture_url,
                            activity.hotel_distance,
                        ]
                    )
                    id=result.fetchone()[0]
                    return self.activity_in_to_out(id, activity)
        except Exception:
            return {"message": "create did not work"}

    def get_activities(self)-> Error | List[ActivityOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id, activity_name, activity_address, longitude, latitude, rating, picture_url, hotel_distance
                        from activities
                        order by activity_name
                        """
                    )
                    return[
                        self.record_to_activity_out(record)
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return{"message": "could not get all activities"}

    def get_activity(self, activity_id: int) -> Optional[ActivityOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id
                            , activity_name
                            , activity_address
                            , longitude
                            , latitude
                            , rating
                            , picture_url
                            , hotel_distance
                        from activities
                        where id = %s;
                        """,
                        [activity_id]
                    )
                    record=result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_activity_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get that activity"}

    def update_activity(self, activity_id: int, activity: ActivityIn) -> ActivityOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        update activities
                        set activity_name = %s
                            , activity_address = %s
                            , longitude = %s
                            , latitude = %s
                            , rating = %s
                            , picture_url = %s
                            , hotel_distance = %s
                        where id = %s;
                        """,
                        [
                            activity.activity_name,
                            activity.activity_address,
                            activity.longitude,
                            activity.latitude,
                            activity.rating,
                            activity.picture_url,
                            activity.hotel_distance,
                            activity_id
                        ]
                    )
                    return self.activity_in_to_out(activity_id, activity)
        except Exception as e:
            print(e)
            return {"message": "could not update that activity"}


    def delete_activity(self, activity_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        delete from activities
                        where id = %s;
                        """,
                        [activity_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False



    def activity_in_to_out(self, id:int, activity:ActivityIn):
        old_data=activity.dict()
        return ActivityOut(id=id, **old_data)

    def record_to_activity_out(self, record):
        return ActivityOut(
            id=record[0],
            activity_name=record[1],
            activity_address=record[2],
            longitude=record[3],
            latitude=record[4],
            rating=record[5],
            picture_url=record[6],
            hotel_distance=record[7],
        )
