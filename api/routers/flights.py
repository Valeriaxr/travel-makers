from fastapi import APIRouter, Depends, Response
from Typing import Union
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

response.satus_code = 400
return repo.create(flight)


@router.get('/api/flights', response_model=List[FlightOut] | Error)
def get_flights(repo: FlightRepository=Depends()):
    return repo.get_hotels()


@router.get('/api/flights/{flight.id}'), response_model = Optional[HotelOut])
def get_flight(
    flight_id: int,
    response: Response,
    repo: FlightRepository=Depends(),

)


)




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
