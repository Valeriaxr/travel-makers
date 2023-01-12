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
    repo: TripRepository = Depends(),
) -> TripOut:
    trip = repo.get_trip(trip_id)
    if trip is None:
        response.status_code = 404
    else:
        return trip
