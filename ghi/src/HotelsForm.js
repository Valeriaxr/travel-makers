import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BulmaInput from './BulmaInput';
import { useCreateHotelMutation } from './store/hotelsApi';
import ErrorNotification from './ErrorNotification';

function HotelForm() {
    const {tripId} = useParams();
    const navigate= useNavigate();
    const [hotel, setHotel]= useState('');
    const [address, setAddress]= useState('');
    const [city, setCity]= useState('');
    const [longitude, setLongitude]= useState('');
    const [latitude, setLatitude]= useState('');
    const [error, setError]= useState('');
    const [createHotel, result] = useCreateHotelMutation();


    async function handleSubmit(e) {
        e.preventDefault();
        createHotel({data: { hotel_name: hotel, address, city, longitude, latitude}, id: tripId});
    }
    useEffect(() => {
        if (result.isSuccess) {
            navigate(`/trips/${tripId}`);
        }
    }, [result, navigate]);

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
          <ErrorNotification error={error} />
          <form onSubmit={handleSubmit}>
          <BulmaInput
              label="Hotel name"
              id="hotel"
              placeholder="Marriot"
              value={hotel}
              onChange={setHotel} />
            <BulmaInput
              label="Hotel Address"
              id="address"
              placeholder="1234 Lane Street"
              value={address}
              onChange={setAddress} />
            <BulmaInput
              label="City"
              id="city"
              placeholder="New York"
              value={city}
              onChange={setCity} />
            <BulmaInput
              label="Longitude"
              id="longitude"
              placeholder="12.2"
              value={longitude}
              onChange={setLongitude} />
            <BulmaInput
            label="Latitude"
            id="latitude"
            placeholder="12.4"
            value={latitude}
            onChange={setLatitude} />
            <div className="field">
              <button className="button is-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default HotelForm;
