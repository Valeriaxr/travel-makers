import json
from fastapi.testclient import TestClient
from queries.trips import TripRepository, TripIn, TripOut
from authenticator import authenticator
from main import app

client = TestClient(app=app)


def get_current_account_data_mock():
    return {
        'id': 8675309,
        'email': "fake",
        'first_name': "fake",
        "last_name": "fake"
    }


class TripRepositoryMock:

    def create_trip(self, trip: TripIn, user_id: int) -> TripOut:
        trip_dict = trip.dict()
        return TripOut(id=1, **trip_dict)


def test_create_trip():
    app.dependency_overrides[TripRepository] = TripRepositoryMock
    app.dependency_overrides[authenticator.get_current_account_data] = get_current_account_data_mock
    trip_body = {
        'trip_name': 'Anniversary Trip',
        'destination': "Paris",
        'start_date': '2023-07-07',
        'end_date': '2023-07-07',
        'num_people': 2
    }

    res = client.post('/api/trips', json.dumps(trip_body))

    assert res.status_code == 200
    assert res.json()['id'] == 1

    app.dependency_overrides = {}
