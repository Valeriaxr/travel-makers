from fastapi import APIRouter, Depends, Response
from typing import Union, Optional, List
from queries.activities import (
    Error,
    ActivityIn,
    ActivityOut,
    ActivityRepository
)


router = APIRouter()


@router.post("/activities", response_model=Union[ActivityOut, Error] )
def create_activity(
    activity: ActivityIn,
    response: Response,
   repo: ActivityRepository = Depends(),
):
    return repo.create_activity(activity)


@router.get('/api/activities', response_model=List[ActivityOut] | Error)
def get_activities(repo: ActivityRepository=Depends()):
    return repo.get_activities()


@router.get('/api/activities/{activity.id}', response_model = Optional[ActivityOut])
def get_activity(
    activity_id: int,
    response: Response,
    repo: ActivityRepository=Depends(),

) -> ActivityOut:
    activity=repo.get_activity(activity_id)
    if activity is None:
        response.status_code=404
    return activity



@router.put('/api/activities/{activity.id}', response_model = ActivityOut | Error)
def update_activity(
    activity_id: int,
    activity: ActivityIn,
    repo: ActivityRepository=Depends(),
)-> ActivityOut | Error:
    return repo.update_activity(activity_id, activity)

@router.delete('/api/activities/{activity.id}', response_model = bool)
def delete_activity(
    activity_id: int,
    repo: ActivityRepository=Depends(),
) -> bool:
    return repo.delete_activity(activity_id)
