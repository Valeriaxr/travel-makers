steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(200) NOT NULL UNIQUE,
            hashed_password VARCHAR(200) NOT NULL,
            first_name VARCHAR(20) NOT NULL,
            last_name VARCHAR(20) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ],
     [
        # "Up" SQL statement
        """
        CREATE TABLE hotels (
            id SERIAL PRIMARY KEY NOT NULL,
            hotel_name VARCHAR(20) NOT NULL UNIQUE,
            address VARCHAR(100) NOT NULL,
            city VARCHAR(20) NOT NULL,
            longitude NUMERIC(15) NOT NULL,
            latitude NUMERIC(15) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE hotels;
        """
    ],
     [
        # "Up" SQL statement
        """
        CREATE TABLE flights (
            id SERIAL PRIMARY KEY NOT NULL,
            number VARCHAR(25) NOT NULL UNIQUE,
            departure_location VARCHAR(25) NOT NULL,
            arrival_location VARCHAR(25) NOT NULL,
            departure_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            arrival_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE flights ;
        """
    ],
     [
        # "Up" SQL statement
        """
        CREATE TABLE activities (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            activity_name VARCHAR(40) NOT NULL,
            activity_address VARCHAR(100) NOT NULL,
            longitude NUMERIC(15) NOT NULL,
            latitude NUMERIC(15) NOT NULL,
            rating NUMERIC(2) NOT NULL,
            picture_url TEXT,
            hotel_distance NUMERIC(16)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE activities;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE trips (
            id SERIAL PRIMARY KEY NOT NULL,
            trip_name VARCHAR(50) NOT NULL,
            destination VARCHAR(20) NOT NULL,
            start_date DATE,
            end_date DATE,
            outgoing_flight INTEGER REFERENCES flights("id") ON DELETE SET NULL,
            returning_flight INTEGER REFERENCES flights("id") ON DELETE SET NULL,
            num_people INTEGER,
            user_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE NOT NULL,
            hotel_id INTEGER REFERENCES hotels("id") ON DELETE SET NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE trips;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE trips_activities (
            trip_id INTEGER NOT NULL,
            activity_id INTEGER NOT NULL,
            PRIMARY KEY (trip_id, activity_id),
            FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
            FOREIGN KEY (activity_id) REFERENCES activities(id) ON UPDATE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE trips_activities;
        """
    ]
]
