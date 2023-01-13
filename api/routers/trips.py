from fastapi import APIRouter, Depends, Response
from typing import List, Optional
from queries.trips import TripIn, TripOut, TripRepository, Error
from authenticator import authenticator


router = APIRouter()

@router.post('/api/trips', response_model= TripOut | Error)
def create_trip(
    trip: TripIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TripRepository=Depends()):
    return repo.create_trip(trip, account_data['id'])

@router.get("/api/trips/{trip_id}", response_model=Optional[TripOut])
def get_trip(
    trip_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TripRepository = Depends(),
) -> TripOut:
    trip = repo.get_trip(trip_id, account_data['id'])
    if trip is None:
        response.status_code = 404
    else:
        return repo.get_trip(trip_id, account_data['id'])

@router.get('/api/trips/', response_model= List[TripOut] | Error)
def get_trips(
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    trip_repo: TripRepository=Depends(),
):
    trips = trip_repo.get_trips(account_data['id'])
    if trips == []:
        response.status_code = 404
    else:
        return trip_repo.get_trips(account_data['id'])

@router.put('/api/trips/{trip_id}/', response_model = TripOut | Error)
def update_trip(
    trip_id: int,
    trip: TripIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    trip_repo: TripRepository=Depends(),
) -> TripOut | Error:
    db_trip = trip_repo.get_trip(trip_id, account_data['id'])
    if db_trip is None:
        response.status_code=404
    else:
        return trip_repo.update_trip(trip_id, trip, account_data['id'])

@router.delete('/api/trips/{trip_id}/', response_model = bool)
def delete_trip(
    trip_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    trip_repo: TripRepository=Depends(),
) -> bool:
    trip = trip_repo.get_trip(trip_id, account_data['id'])
    if trip is None:
        response.status_code=404
    else:
        return trip_repo.delete_trip(trip_id, account_data['id'])
