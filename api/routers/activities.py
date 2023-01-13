from fastapi import APIRouter, Depends, Response
from typing import Union, Optional, List
from queries.activities import (
    Error,
    ActivityIn,
    ActivityOut,
    ActivityRepository
)
from queries.trips import TripRepository


router = APIRouter()


@router.post("/api/trips/{trip_id}/activities", response_model=Union[ActivityOut, Error] )
def create_activity(
    activity: ActivityIn,
    trip_id: int,
    response: Response,
    trip_repo: TripRepository = Depends(),
    activity_repo: ActivityRepository = Depends(),
):
    trip = trip_repo.get_trip(trip_id)
    if trip is None:
        response.status_code=404
    else:
        return activity_repo.create_activity(activity, trip)


@router.get('/api/trips/{trip_id}/activities', response_model=List[ActivityOut] | Error)
def get_activities(
    trip_id:int,
    response: Response,
    trip_repo: TripRepository=Depends(),
    activity_repo: ActivityRepository=Depends()
):
    trip = trip_repo.get_trip(trip_id)
    if trip is None:
        response.status_code=404
    else:
        return activity_repo.get_activities(trip)


@router.get('/api/trips/{trip_id}/activities/{activity.id}', response_model = Optional[ActivityOut])
def get_activity(
    activity_id: int,
    trip_id:int,
    response: Response,
    activity_repo: ActivityRepository=Depends(),
    trip_repo: TripRepository=Depends(),

) -> ActivityOut:
    trip = trip_repo.get_trip(trip_id)
    if trip is None:
        response.status_code=404
    else:
        return activity_repo.get_activity(activity_id, trip)



@router.put('/api/trips/{trip_id}/activities/{activity.id}', response_model = ActivityOut | Error)
def update_activity(
    activity_id: int,
    trip_id: int,
    activity: ActivityIn,
    response: Response,
    trip_repo: TripRepository=Depends(),
    activity_repo: ActivityRepository=Depends(),

)-> ActivityOut | Error:
    trip = trip_repo.get_trip(trip_id)
    if trip is None:
        response.status_code=404
    else:
        return activity_repo.update_activity(activity_id, activity, trip)

@router.delete('/api/trips/{trip_id}/activities/{activity.id}', response_model = bool)
def delete_activity(
    activity_id: int,
    trip_id: int,
    response: Response,
    trip_repo: TripRepository=Depends(),
    activity_repo: ActivityRepository=Depends(),
) -> bool:
    trip = trip_repo.get_trip(trip_id)
    if trip is None:
        response.status_code=404
    else:
        return activity_repo.delete_activity(activity_id, trip)
