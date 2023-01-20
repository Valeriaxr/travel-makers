import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useGetFlightsQuery } from "./store/flightsApi";

function TripDetail() {
    let {tripId} = useParams();
    const [trip, setTrip] = useState('');
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetFlightsQuery();

    const getTripData = async () => {
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
    const getFlightData = async () => {
        const url = `${process.env.REACT_APP_TRAVEL_MAKERS}/api/trips/${tripId}/flights`;
        const response = await fetch(url, {
            method: 'get',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const data=await response.json();
        console.log("line 34", data)
        setFlights({flights: data, id: tripId})
    }

    useEffect(() => {
        getTripData();
        getFlightData();
    }, []
    )

    return (
        <div>
            <div>
                <h1>Trip name: {trip.trip_name}</h1>
                <h2>Destination: {trip.destination}</h2>
                <h3>Starting: {trip.start_date}- ending: {trip.end_date}</h3>
                <h4>{trip.num_people} people are joining you in this trip</h4>
            </div>
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Departure City</th>
                            <th>Arrival City</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map(flight => {
                            return (
                                <tr key={flight.number}>
                                    <td>{flight.number}</td>
                                    <td>{flight.departure_location}</td>
                                    <td>{flight.arrival_location}</td>
                                    <td>{flight.departure_time}</td>
                                    <td>{flight.arrival_time}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                 </table>
            <button className='button is-primary'onClick={() => {navigate(`/trips/${tripId}/flights/new`)}}>Add a flight</button>
            <button className='button is-primary'onClick={() => {navigate(`/trips/${tripId}/activities/new`)}}>Add an activity</button>
            <button className='button is-primary'onClick={() => {navigate(`/trips/${tripId}/hotels/new`)}}>Add a hotel</button>
        </div>
    );
};

export default TripDetail;
