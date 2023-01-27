## API

## Activities
* **Method:** ```POST```, ```GET```, ```PUT```, ```DELETE```
* **Path:** ```/api/trips/{trip_id}/activities```, ```/api/trips/{trip_id}/activities/{activity.id}```

input (ActivityIn)
```
{
    "activity_name": string,
    "activity_address": string,
    "longitude": float,
    "rating": float
    "picture_url": str
    "hotel_distance": float

}

output (ActivityOut)
{
    "id": int
    "activity_name": string,
    "activity_address": string,
    "longitude": float,
    "rating": float
    "picture_url": str
    "hotel_distance": float

}
```
Creating a new activity will be added to our TripsDetails page.


## Flights
* **Method:** ```POST```, ```GET```, ```PUT```, ```DELETE```
* **Path:** ```/api/trips/{trip_id}/flights```, ```/api/trips/{trip_id}/flights/{flight.id}```
input
```
{
    "number": str
    "departure_location": str
    "arrival_location": str
    "departure_time": datetime
    "arrival_time": datetime

    }
```

output

```

{
    "id": int
    "number": str
    "departure_location": str
    "arrival_location": str
    "departure_time": datetime
    "arrival_time": datetime
}
```
Creating a flight will be added to our TripsDetails page.

## Hotels
* **Method:** ```POST```, ```GET```, ```PUT```, ```DELETE```
* **Path:** ```/api/trips/{trip_id}/hotels```, ```/api/trips/{trip_id}/hotels/{hotel.id}```
input
```
{
    "hotel_name": str
    "address": str
    "city": str
    "longitude": float
    "latitude": float
}
```

output
```
{
    "id": int
    "hotel_name": str
    "address": str
    "city": str
    "longitude": float
    "latitude": float
}
```
Creating a hotel will be added to our TripsDetails page.

# Trips
* **Method:** ```POST```, ```GET```, ```PUT```, ```DELETE```
* **Path:** ```/api/trips```, ```/api/trips/{trip_id}/```
input
```
{
    "trip_name": str
    "destination": str
    "start_date": date
    "end_date": date
    "num_people": int
}
```

output
```
{
    "id": int
    "trip_name": str
    "destination": str
    "start_date": date
    "end_date": date
    "num_people": int
```
Creating a trip we be added to our TripsList page.

# Accounts
* **Method** ```POST```
* **Path** ```/api/accounts```

input
```
{
    "email": str
    "hashed_password": str
    "first_name": str
    "last_name": str
}

```
output
```
{
    "id": int
    "email": str
    "first_name": str
    "last_name": str
}
