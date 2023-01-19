import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BulmaInput from './BulmaInput';
import { useCreateActivityMutation } from './store/activitiesApi';
import ErrorNotification from './ErrorNotification';


function ActivityForm() {
    const navigate=useNavigate();
    const[activity, setActivity] =useNavigate();
    const [address, setAddress]= useState('');
    const [longitude, setLongitude]= useState('');
    const [latitude, setLatitude]= useState('');
    const [rating, setRating]= useState('');
    const [picture, setPicture]= useState('');
    const [distance, setDistance]= useState('');
    const [error, setError]= useState('');
    const [createActivity, result] = useCreateActivityMutation();



    async function handleSubmit(e) {
        e.preventDefault();
        createActivity({ activity, address, rating, longitude, latitude, picture, distance});
    }
    if (result.isSuccess) {
        navigate("/activities");
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
              label="Activity name"
              id="activity"
              placeholder="diving"
              value={activity}
              onChange={setActivity} />
            <BulmaInput
              label="Activity Address"
              id="address"
              placeholder="1234 Lane Street"
              value={address}
              onChange={setAddress} />
            <BulmaInput
              label="Activity Rating"
              id="rating"
              placeholder="5 stars!"
              value={rating}
              onChange={setRating} />
            <BulmaInput
              label="Activity Picture"
              id="picture"
              placeholder="picture"
              value={picture}
              onChange={setPicture} />
            <BulmaInput
              label="Distance from"
              id="distance"
              placeholder="3 miles"
              value={distance}
              onChange={setDistance} />
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
export default ActivityForm;
