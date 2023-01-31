import json
from fastapi.testclient import TestClient
from queries.hotels import HotelRepository
from queries.trips import TripRepository, TripOut
from routers.hotels import HotelIn, HotelOut
from authenticator import authenticator
from main import app

client = TestClient(app=app)


def get_current_account_data_mock():
    return {
        'id': 1,
        'email': 'em@email.com',
        'first_name': 'Valeria',
        'last_name': 'ram'
    }


class TripQueriesMock:
    def get_trip(self, id: int, user_id: int):
        return TripOut(
            id=1,
            trip_name='trip',
            destination='Italy',
            start_date='2023-01-11',
            end_date='2023-01-23',
            num_people=4
        )


class HotelQueriesMock:

    def create_hotel(self, hotel: HotelIn, trip_id: int) -> HotelOut:
        hotel_dict = hotel.dict()
        return HotelOut(id=23, **hotel_dict)


def test_create_hotel():
    app.dependency_overrides[HotelRepository] = HotelQueriesMock
    app.dependency_overrides[TripRepository] = TripQueriesMock
    app.dependency_overrides[authenticator.get_current_account_data] = get_current_account_data_mock
    hotel_body = {
        'hotel_name': 'Marriot',
        'address': "1234 mary lane",
        'city': 'San Francisco',
        'longitude': '4',
        'latitude': '3',
    }

    res = client.post('/api/trips/1/hotels', json.dumps(hotel_body))

    assert res.status_code == 200
    assert res.json()['id'] == 23

    app.dependency_overrides = {}
