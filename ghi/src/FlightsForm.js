import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateFlightMutation } from './store/flightsApi';
import BulmaInput from './BulmaInput';

function FlightForm() {
    const {tripId} = useParams();
    const navigate = useNavigate();
    const [number, setNumber]= useState('');
    const [departure, setDeparture]= useState('');
    const [arrival, setArrival]= useState('');
    const [departureTime, setDepartureTime]= useState('');
    const [arrivalTime, setArrivalTime]= useState('');
    const [createFlight, result] = useCreateFlightMutation();

    async function handleSubmit(e) {
        e.preventDefault();
        createFlight({data: {number, departure_location: departure, arrival_location: arrival, departure_time: departureTime, arrival_time: arrivalTime}, id: tripId});
    }
    useEffect(() => {
        if (result.isSuccess) {
            navigate(`/trips/${tripId}`);
        }
    }, [result, navigate, tripId]);

return (
    <div className="container" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -40%)",
            backgroundColor: "#d3c6a3",
            border: "1.75px solid black",
            width: "17%",
            height: "27%",

        }}>
      <div className="columns is-centered">
        <div className="column is-one-third">
          <form onSubmit={handleSubmit}>
          <BulmaInput
              label="Flight number"
              id="number"
              placeholder="1234"
              value={number}
              onChange={setNumber} />
            <BulmaInput
              label="Departure Location"
              id="departure"
              placeholder="Washington DC"
              value={departure}
              onChange={setDeparture} />
            <BulmaInput
              label="Arrival Location"
              id="arrival"
              placeholder="Hawaii"
              value={arrival}
              onChange={setArrival} />
            <BulmaInput
              label="Departure Time"
              id="departureTime"
              placeholder="1212"
              value={departureTime}
              onChange={setDepartureTime} />
            <BulmaInput
              label="Arrival Time"
              id="arrivalTime"
              placeholder="121212"
              value={arrivalTime}
              onChange={setArrivalTime} />
            <div className="field">
              <button className="button is-primary">create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default FlightForm;
