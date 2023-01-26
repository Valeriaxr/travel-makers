import json
from fastapi.testclient import TestClient
from queries.hotels import HotelRepository, HotelIn, HotelOut
from authenticator import authenticator
from main import app

client = TestClient(app=app)

def get_current_account_data_mock():
    return {
        'id': 13,
        'user': "fake",
    }

class HotelRepositoryMock:
    # def get_hotels(self):
    #     return []

    def create_hotel(self, hotel: HotelIn, trip_id: int) -> HotelOut:
        hotel_dict = hotel.dict()
        return HotelOut(id=1, **hotel_dict, trip_id=trip_id)



def test_create_hotel():
    #Arrange
    app.dependency_overrides[HotelRepository]= HotelRepositoryMock
    app.dependency_overrides[authenticator.get_current_account_data]= get_current_account_data_mock
    hotel_body = {
        'hotel_name': 'Marriot',
        'address': "1234 mary lane",
        'city': 'San Francisco',
        'longitude': '4',
        'latitude': '3',
    }

    trip_id = 1

    #Act
    res = client.post('/api/trips/{trip_id}/hotels', json.dumps(hotel_body))

    #Assert
    assert res.status_code == 200
    assert res.json()['id'] == 1


    #Cleanup
    app.dependency_overrides = {}
