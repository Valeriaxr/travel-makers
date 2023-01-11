steps = [
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
            hotel_distance NUMERIC(16),
            trip_id INTEGER NOT NULL REFERENCES trips("id") ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE activities;
        """
    ]
]
