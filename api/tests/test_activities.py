import json
from fastapi.testclient import TestClient
from queries.activities import ActivityRepository, ActivityIn, ActivityOut
from queries.trips import TripRepository, TripIn, TripOut
from queries.trips import TripOut
from authenticator import authenticator 
from main import app 


client = TestClient(app=app)

def get_current_account_data_mock():
    return {
        'id':8675308,
        'email': "fake",
        'first_name': "fake",
        "last_name": "fake"
    }


class ActivityRepositoryMock:

    def create_activity(self, activity: ActivityIn, trip: TripOut) -> ActivityOut:
        activity_dict = activity.dict()
        return ActivityOut(id=1, **activity_dict)
    

def test_create_activity():
    #Arrange
    app.dependency_overrides[ActivityRepository] = ActivityRepositoryMock
    app.dependency_overrides[authenticator.get_current_account_data]= get_current_account_data_mock
    activity_body = {
        'activity_name': 'Bowling',
        'activity_address': '321 lane st',
        'longitude': 44.4,
        'latitude': 42.0,
        'rating': 5,
        'picture_url': 'Null',
        'hotel_distance': 5
    }

    #Act
    res = client.post("/api/trips/{trip_id}/activities", json.dumps(activity_body))

    #Assert
    assert res.status_code == 200   
    assert res.json()['id'] == 1

    #A clean up
    app.dependency_overrides = {}