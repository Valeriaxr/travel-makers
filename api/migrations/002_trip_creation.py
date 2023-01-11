steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE trips (
            id SERIAL PRIMARY KEY NOT NULL,
            trip_name VARCHAR(50) NOT NULL,
            destination VARCHAR(20) NOT NULL,
            start_date DATE,
            end_date DATE,
            num_people INTEGER,
            activities INTEGER REFERENCES activities("id") ON DELETE SET NULL,
            user_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE NOT NULL,
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE trips;
        """
    ]
]
