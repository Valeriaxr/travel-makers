import json
from fastapi.testclient import TestClient
from queries.activities import ActivityRepository, ActivityIn, ActivityOut
from queries.trips import TripRepository, TripOut
from authenticator import authenticator
from main import app


client = TestClient(app=app)


def get_current_account_data_mock():
    return {
        'id': 1234,
        'email': "ando@aim.com",
        'first_name': "ando",
        "last_name": "ngo"
    }


class TripQueriesMock:
    def get_trip(self, id: int, user_id: int):
        return TripOut(
            id=1,
            trip_name='Couples Trip',
            destination="Milana",
            start_date='2023-07-07',
            end_date='2024-07-07',
            num_people=2
        )


class ActivityRepositoryMock:

    def create_activity(
        self,
        activity: ActivityIn,
        trip_id: TripOut
    ) -> ActivityOut:
        activity_dict = activity.dict()
        return ActivityOut(id=1, **activity_dict)


def test_create_activity():
    app.dependency_overrides[ActivityRepository] = ActivityRepositoryMock
    app.dependency_overrides[TripRepository] = TripQueriesMock
    app.dependency_overrides[authenticator.get_current_account_data] = get_current_account_data_mock
    activity_body = {
        'activity_name': 'Bowling',
        'activity_address': '321 lane st',
        'longitude': 44.4,
        'latitude': 42.0,
        'rating': 5,
        'picture_url': 'Null',
        'hotel_distance': 5
    }

    res = client.post("/api/trips/1/activities", json.dumps(activity_body))

    assert res.status_code == 200
    assert res.json()['id'] == 1

    app.dependency_overrides = {}
