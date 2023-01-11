from fastapi import APIRouter, Depends, Response
from typing import List, Optional
from queries.trips import TripIn, TripOut, TripRepository, Error


router = APIRouter()


@router.post('/api/trips', response_model= TripOut | Error) 
def create_trip(trip: TripIn, repo: TripRepository=Depends()):
    return repo.create_trip(trip)