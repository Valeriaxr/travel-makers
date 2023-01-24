import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useGetFlightsQuery } from "./store/flightsApi";
// import './vids/Fly.mp4';
import vid1 from './vids/Hiking.mp4';
// import vid2 from './vids/Couple.mp4';




function TripDetail() {
    let {tripId} = useParams();
    const [trip, setTrip] = useState('');
    const [flights, setFlights] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [currentVid, setCurrentVid] = useState(0);
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();


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
        setFlights(data)
    }
    

    const getHotelData = async () => {
        const url = `${process.env.REACT_APP_TRAVEL_MAKERS}/api/trips/${tripId}/hotels/`;
        const response = await fetch(url, {
            method: 'get',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const data=await response.json();
        setHotels(data)
    }

    const getActivityData = async () => {
        const url = `${process.env.REACT_APP_TRAVEL_MAKERS}/api/trips/${tripId}/activities`;
        const response = await fetch(url, {
            method: 'get',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const data=await response.json();
        setActivities(data)
    }

    useEffect(() => {
        getTripData();
        getFlightData();
        getHotelData();
        getActivityData();
    }, []
    )



    return (
        <div>
            <div className="box">
            <div className="trip-deets" style={{ background: 'white', padding: '20px', opacity: '1.0'}}>
                <div className="trip-name">Trip name: {trip.trip_name}</div>
                <div className="destination">Destination: {trip.destination}</div>
                <div className="date">Starting: {trip.start_date}- ending: {trip.end_date}</div>
                <div className="people-joining">{trip.num_people} people are joining you in this trip</div>
            </div>
            </div>

            {/* <div className="back-vid">
                <video src={vid1} autoPlay loop muted
                className="vid-cover"> </video>
            </div> */}


            <div>
                <div className="box-two">
                <h2>Flight info</h2>
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
                        {flights?.map(flight => {
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
            </div>
            <div>
                <div className="box-three">
                <h2>Hotel info</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels?.map(hotel => {
                            return (
                                <tr key={hotel.hotel_name}>
                                    <td>{hotel.hotel_name}</td>
                                    <td>{hotel.address}</td>
                                    <td>{hotel.city}</td>
                                    <td>{hotel.longitude}</td>
                                    <td>{hotel.latitude}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                 </table>
                <button className='button is-primary'onClick={() => {navigate(`/trips/${tripId}/hotels/new`)}}>Add a hotel</button>
            </div>
            <div>
                <div className="box-four">
                <h2>Activity info</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                            <th>Rating</th>
                            <th>Picture</th>
                            <th> Distance from hotel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities?.map(activity => {
                            return (
                                <tr key={activity.activity_name}>
                                    <td>{activity.activity_name}</td>
                                    <td>{activity.activity_address}</td>
                                    <td>{activity.longitude}</td>
                                    <td>{activity.latitude}</td>
                                    <td>{activity.rating}</td>
                                    <td><img src={activity.picture_url} width="200" height="150"/></td>
                                    <td>{activity.hotel_distance}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                 </table>
                <button className='button is-primary'onClick={() => {navigate(`/trips/${tripId}/activities/new`)}}>Add an activity</button>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default TripDetail;
