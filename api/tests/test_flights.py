import json
from fastapi.testclient import TestClient
from queries.flights import FlightRepository
from queries.trips import TripRepository, TripOut, TripIn
from routers.flights import FlightIn, FlightOut
from authenticator import authenticator
from main import app

client = TestClient(app=app)

def get_current_account_data_mock():
    return {
        'id': 1,
        'email': 'email@email.com',
        'first_name': 'Victoria',
        'last_name': 'Figueroa'
    }

class TripQueriesMock:
    def get_trip():
        return {
            'id': 1,
            'trip_name': 'Family Trip',
            'destination': 'Washington',
            'start_date': '2023-01-11',
            'end_date': '2023-01-23',
            'num_people': 1
        }





class FlightQueriesMock:
    def get_flights(self):
        return []

    def create_flight(self, flight: FlightIn, trip_id:int) -> FlightOut:
        flight_dict = flight.dict()
        return FlightOut(id = 13, **flight_dict)


def test_create_flight():
    # Arrange
    app.dependency_overrides[FlightRepository] = FlightQueriesMock
    app.dependency_overrides[TripRepository] = TripQueriesMock
    app.dependency_overrides[authenticator.get_current_account_data] = get_current_account_data_mock
    flight_body = {
        'number': "American 1234",
        'departure_location': 'Washington DC',
        'arrival_location': "Hawaii",
        'departure_time': '2023-01-18T20:31:29.458Z',
        'arrival_time': '2023-01-18T20:31:29.458Z',
    }

    # Act
    res = client.post('/api/trips/{trip_id}/flights', json.dumps(flight_body))

    # Assert
    assert res.status_code == 200
    assert res.json()['id'] == 13
    assert res.json()['trip_id'] == 1

    # A cleanup
    app.dependency_overrides = {}

def test_get_flights():
    # Arrange
    app.dependency_overrides[FlightRepository] = FlightQueriesMock
    app.dependency_overrides[TripRepository] = TripQueriesMock
    app.dependency_overrides[authenticator.get_current_account_data] = get_current_account_data_mock
    # Act
    res = client.get('/api/trips/{trip_id}/flights')

    # Assert
    assert res.status_code == 200
    assert res.json()["number"] == "American 1234"
    assert res.json()["id"] == 13
    assert res.json()["trip_id"] == 1


    # A cleanup
    app.dependency_overrides = {}
