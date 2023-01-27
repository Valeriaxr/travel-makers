## Data Models

# Accounts


| name | type | unique |
| --- | ----------- | --- |
|id | primary key | no |
| email | string | yes |
| hashed_password | string | no |
| first_name | string | no |
| last_name | string | no |

The ```accounts``` entity contains the data for a unique user.

# Trips

| name | type | unique |
| --- | ----------- | --- |
| trip_name | string | no |
| destination | string | no |
| start_date | date | no |
| end_date | date | no |
| num_people | int | no |
| user_id | int reference | no |

# Flights

| name | type | unique |
| --- | ----------- | --- |
| number | string | yes |
| departure_locaton | string | no |
| arrival_location | string | no |
| departure_time | timestamp | no |
| arrival_time | timestamp | no |
| trip_id | int reference | no |

# Hotels
| name | type | unique |
| --- | ----------- | --- |
| hotel_name | string | yes |
| address | string | no |
| city | string | no |
| longitude | numeric | no |
| latitude  | numeric | no |
| trip_id | int reference | no |

 # Activities

 | name | type | unique |
| --- | ----------- | --- |
| activity_name | string | yes |
| activity_address | string | no |
| city | string | no |
| longitude | numeric | no |
| latitude  | numeric | no |
| rating | numeric |no |
| picture_url | text | no |
| hotel_distance | numeric | no |
| trip_id | int reference | no |
