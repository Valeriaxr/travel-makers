import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BulmaInput from './BulmaInput';
import { useCreateActivityMutation } from './store/activitiesApi';
import ErrorNotification from './ErrorNotification';


function ActivityForm() {
    const {tripId} = useParams();
    const navigate=useNavigate();
    const[activity, setActivity] =useState();
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
        createActivity({data: {activity_name: activity, activity_address: address, longitude, latitude, rating, picture_url: picture, hotel_distance: distance}, id: tripId});
    }
    if (result.isSuccess) {
        navigate(`/trips/${tripId}`);
    } else if (result.isError) {
        setError(result.error);
    }

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
            width: "18%",
            height: "35%",

        }}>
      <div className="columns is-centered">
        <div className="column is-one-third">
          <ErrorNotification error={error} />
          <form onSubmit={handleSubmit}>
          <BulmaInput
              label="Activity"
              id="activity"
              placeholder="diving"
              value={activity}
              onChange={setActivity} />
            <BulmaInput
              label="Address"
              id="address"
              placeholder="1234 Lane Street"
              value={address}
              onChange={setAddress} />
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
