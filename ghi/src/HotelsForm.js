import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BulmaInput from './BulmaInput';
import { useCreateHotelMutation } from './store/hotelsApi';
import ErrorNotification from './ErrorNotification';

function HotelForm() {
    const navigate= useNavigate();
    const [hotel, setHotel]= useState('');
    const [address, setAddress]= useState('');
    const [city, setCity]= useState('');
    const [longitude, setLongitude]= useState('');
    const [latitude, setLatitude]= useState('');
    const [error, setError]= useState('');
    const [createHotel, result] = useCreateHotelMutation();
}

    async function handleSubmit(e) {
        e.preventDefault();
        createHotel({ hotel, address, city, longitude, latitude});
    }
    if (result.isSuccess) {
        navigate("/hotels");
    } else if (result.isError) {
        setError(result.error);
    }

return (
    <div className="container">
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
              placeholder="example@example.com"
              value={city}
              onChange={setCityl} />
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

export default HotelForm;
