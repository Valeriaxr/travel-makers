## API

## Product
* **Method:** ```POST```, ```GET```, ```PUT```, ```DELETE```\
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
    "activity_name": string,
    "activity_address": string,
    "longitude": float,
    "rating": float
    "picture_url": str
    "hotel_distance": float

}
Creating a new activity will be added to our TripsDetails page.


```
## FLights
input
```
{
    "number": str
    "departure_location": str
    "arrival_location": str
    "departure_time": datetime
    "arrival_time": datetime

    }

output

{
    "number": str
    "departure_location": str
    "arrival_location": str
    "departure_time": datetime
    "arrival_time": datetime
}
```

## Hotels
```
input
{
    "hotel_name": str
    "address": str
    "city": str
    "longitude": float
    "latitude": float
}

output
{
    "hotel_name": str
    "address": str
    "city": str
    "longitude": float
    "latitude": float
}

}





```
![alt text](https://github.com/vickivic08/Travel-Makers/blob/victoria_branch/Main-Page.png?raw=true)
