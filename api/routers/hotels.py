from fastapi import APIRouter, Depends, Response
from typing import List, Optional
from queries.hotels import HotelIn, HotelOut, HotelRepository, Error
from queries.trips import TripRepository
from authenticator import authenticator


router = APIRouter()


@router.post('/api/trips/{trip_id}/hotels', response_model= HotelOut | Error)
def create_hotel(
    hotel: HotelIn,
    trip_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    trip_repo: TripRepository = Depends(),
    hotel_repo: HotelRepository=Depends()
):
    trip = trip_repo.get_trip(trip_id, account_data['id'])
    if trip is None:
        response.status_code=404
    else:
        return hotel_repo.create_hotel(hotel, trip)


@router.get('/api/trips/{trip_id}/hotels/', response_model= List[HotelOut] | Error)
def get_hotels(
    trip_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    trip_repo: TripRepository=Depends(),
    hotel_repo: HotelRepository=Depends()
):
    trip = trip_repo.get_trip(trip_id, account_data['id'])
    if trip is None:
        response.status_code=404
    else:
        return hotel_repo.get_hotels(trip)

@router.get('/api/trips/{trip_id}/hotels/{hotel.id}', response_model = Optional[HotelOut])
def get_hotel(
    hotel_id: int,
    trip_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    trip_repo: TripRepository=Depends(),
    hotel_repo: HotelRepository=Depends(),
) -> HotelOut:
    trip = trip_repo.get_trip(trip_id, account_data['id'])
    if trip is None:
        response.status_code=404
    else:
        return hotel_repo.get_hotel(hotel_id, trip)

@router.put('/api/trips/{trip_id}/hotels/{hotel.id}', response_model = HotelOut | Error)
def update_hotel(
    hotel_id: int,
    trip_id: int,
    hotel: HotelIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    trip_repo: TripRepository=Depends(),
    hotel_repo: HotelRepository=Depends(),
) -> HotelOut | Error:
    trip = trip_repo.get_trip(trip_id, account_data['id'])
    if trip is None:
        response.status_code=404
    else:
        return hotel_repo.update_hotel(hotel_id, hotel, trip)

@router.delete('/api/trips/{trip_id}/hotels/{hotel.id}', response_model = bool)
def delete_hotel(
    hotel_id: int,
    trip_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    trip_repo: TripRepository=Depends(),
    hotel_repo: HotelRepository=Depends(),
) -> bool:
    trip = trip_repo.get_trip(trip_id, account_data['id'])
    if trip is None:
        response.status_code=404
    else:
        return hotel_repo.delete_hotel(hotel_id, trip)
