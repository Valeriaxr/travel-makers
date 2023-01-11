steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE hotels (
            id SERIAL PRIMARY KEY NOT NULL,
            hotel_name VARCHAR(20) NOT NULL UNIQUE,
            address VARCHAR(100) NOT NULL,
            city VARCHAR(20) NOT NULL,
            longitude NUMERIC(15) NOT NULL,
            latitude NUMERIC(15) NOT NULL,
            trip_id INTEGER NOT NULL REFERENCES trips("id") ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE hotels;
        """
    ]
]
