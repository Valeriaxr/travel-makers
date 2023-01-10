from fastapi import APIRouter, Depends, Response
from typing import Union, Optional, List
from queries.flights import (
    Error,
    FlightIn,
    FlightRepository,
    FlightOut,
)


router = APIRouter()


@router.post("/flights", response_model=Union[FlightOut, Error] )
def create_flight(
    flight: FlightIn,
    response: Response,
   repo: FlightRepository = Depends(),
):
    return repo.create_flight(flight)


@router.get('/api/flights', response_model=List[FlightOut] | Error)
def get_flights(repo: FlightRepository=Depends()):
    return repo.get_flights()


@router.get('/api/flights/{flight.id}', response_model = Optional[FlightOut])
def get_flight(
    flight_id: int,
    response: Response,
    repo: FlightRepository=Depends(),

) -> FlightOut:
    flight=repo.get_flight(flight_id)
    if flight is None:
        response.status_code=404
    return flight



@router.put('/api/flights/{flight.id}', response_model = FlightOut | Error)
def update_flight(
    flight_id: int,
    flight: FlightIn,
    repo: FlightRepository=Depends(),
)-> FlightOut | Error:
    return repo.update_flight(flight_id, flight)

@router.delete('/api/flights/{flight.id}', response_model = bool)
def delete_flight(
    flight_id: int,
    repo: FlightRepository=Depends(),
) -> bool:
    return repo.delete_flight(flight_id)
