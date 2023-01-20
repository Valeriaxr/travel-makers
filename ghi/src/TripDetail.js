import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";

function TripDetail() {
    let {tripId} = useParams();
    const [trip, setTrip] = useState('');
    const navigate = useNavigate();

    const getData = async () => {
        const url = `${process.env.REACT_APP_TRAVEL_MAKERS}/api/trips/${tripId}`;
        const response = await fetch(url, {
            method: 'get',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const data=await response.json();
        setTrip(data)
    }

    useEffect(() => {
        getData();
    }, []
    )

    return (
        <div>
            <div>
                <h1>{trip.trip_name}</h1>
                <h2>{trip.destination}</h2>
                <h3>{trip.start_date}-{trip.end_date}</h3>
                <h4>{trip.num_people} people are joining you in this trip</h4>
            </div>
            <button className='button is-primary'onClick={() => {navigate(`/trips/${tripId}/flights/new`)}}>Add a flight</button>
            <button className='button is-primary'onClick={() => {navigate(`/trips/${tripId}/activities/new`)}}>Add an activity</button>
        </div>
    );
};

export default TripDetail;
