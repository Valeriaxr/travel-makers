import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';
import { useCreateFlightMutation } from './store/flightsApi';
import BulmaInput from './BulmaInput';

function FlightsForm() {
    const navigate = useNavigate();
    const [number, setNumber]= useState('');
    const [departure, setDeparture]= useState('');
    const [arrival, setArrival]= useState('');
    const [depaturet, setDeparturet]= useState('');
    const [arrivalt, setArrivalt]= useState('');
    const [error, setError]= useState('');
    const [createFlight, result] = useCreateFlightMutation();

    async function handleSubmit(e) {
        e.preventDefault();
        createFlight({ number, departure_location: departure, arrival_location: arrival, depature_time: depaturet, arrival_time: arrivalt});
    }
    useEffect(() => {
        if (result.isSuccess) {
            navigate("/flights");
        }
    }, [result, navigate]);

return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-one-third">
          <ErrorNotification error={error} />
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
              id="departuret"
              placeholder="1212"
              value={depaturet}
              onChange={setDeparturet} />
            <BulmaInput
            label="Arrival Time"
            id="arrivalt"
            placeholder="121212"
            value={arrivalt}
            onChange={setArrivalt} />
            <div className="field">
              <button className="button is-primary">create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default FlightsForm;
