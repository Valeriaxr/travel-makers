from fastapi import APIRouter, Depends, Response
from typing import List, Optional
from queries.hotels import HotelIn, HotelOut, HotelRepository, Error


router = APIRouter()


@router.post('/api/hotels', response_model= HotelOut | Error) 
def create_hotel(hotel: HotelIn, repo: HotelRepository=Depends()):
    return repo.create_hotel(hotel)


@router.get('/api/hotels', response_model= List[HotelOut] | Error)
def get_hotels(repo: HotelRepository=Depends()):
    return repo.get_hotels()

@router.get('/api/hotels/{hotel.id}', response_model = Optional[HotelOut])
def get_hotel(
    hotel_id: int,
    response: Response,
    repo: HotelRepository=Depends(),
) -> HotelOut:
    hotel=repo.get_hotel(hotel_id)
    if hotel is None:
        response.status_code=404
    return hotel

@router.put('/api/hotels/{hotel.id}', response_model = HotelOut | Error)
def update_hotel(
    hotel_id: int,
    hotel: HotelIn,
    repo: HotelRepository=Depends(),
) -> HotelOut | Error:
    return repo.update_hotel(hotel_id, hotel)

@router.delete('/api/hotels/{hotel.id}', response_model = bool)
def delete_hotel(
    hotel_id: int,
    repo: HotelRepository=Depends(),
) -> bool:
    return repo.delete_hotel(hotel_id)