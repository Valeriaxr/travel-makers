steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE flights (
            id SERIAL PRIMARY KEY NOT NULL,
            number VARCHAR(25) NOT NULL UNIQUE,
            departure_location VARCHAR(25) NOT NULL,
            arrival_location VARCHAR(25) NOT NULL,
            departure_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            arrival_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            trip_id INTEGER NOT NULL REFERENCES trips("id") ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE flights ;
        """
    ]
]
