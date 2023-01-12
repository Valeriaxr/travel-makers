from fastapi import APIRouter, Depends, Response
from typing import Optional, List
from queries.flights import (
    Error,
    FlightIn,
    FlightRepository,
    FlightOut,
)
from queries.trips import TripRepository


router = APIRouter()


@router.post("/api/trips/{trip_id}/flights", response_model=FlightOut| Error)
def create_flight(
    flight: FlightIn,
    trip_id: int,
    response: Response,
    trip_repo: TripRepository = Depends(),
    flight_repo: FlightRepository = Depends(),
):
    trip = trip_repo.get_trip(trip_id)
    if trip is None:
        response.status_code=404
    else:
        return flight_repo.create_flight(flight, trip)


@router.get('/api/trips/{trip_id}/flights', response_model=List[FlightOut] | Error)
def get_flights(
    trip_id:int,
    response: Response,
    trip_repo: TripRepository=Depends(),
    flight_repo: FlightRepository=Depends()
):
    trip = trip_repo.get_trip(trip_id)
    if trip is None:
        response.status_code=404
    else:
        return flight_repo.get_flights(trip)


@router.get('/api/trips/{trip_id}/flights/{flight.id}', response_model = Optional[FlightOut])
def get_flight(
    flight_id: int,
    trip_id: int,
    response: Response,
    trip_repo: TripRepository=Depends(),
    flight_repo: FlightRepository=Depends(),

) -> FlightOut:
    trip = trip_repo.get_trip(trip_id)
    if trip is None:
        response.status_code=404
    else:
        return flight_repo.get_flight(flight_id, trip)



@router.put('/api/trips/{trip_id}/flights/{flight.id}', response_model = FlightOut | Error)
def update_flight(
    flight_id: int,
    trip_id: int,
    flight: FlightIn,
    response: Response,
    trip_repo: TripRepository=Depends(),
    flight_repo: FlightRepository=Depends(),
)-> FlightOut | Error:
    trip = trip_repo.get_trip(trip_id)
    if trip is None:
        response.status_code=404
    else:
        return flight_repo.update_flight(flight_id, flight, trip)

@router.delete('/api/trips/{trip_id}/flights/{flight.id}', response_model = bool)
def delete_flight(
    flight_id: int,
    trip_id: int,
    response: Response,
    trip_repo: TripRepository=Depends(),
    flight_repo: FlightRepository=Depends(),
) -> bool:
    trip = trip_repo.get_trip(trip_id)
    if trip is None:
        response.status_code=404
    else:
        return flight_repo.delete_flight(flight_id, trip)
