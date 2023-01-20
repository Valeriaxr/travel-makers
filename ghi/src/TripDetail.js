import { useParams } from "react-router-dom"

async function TripDetail() {

    let {tripId} = useParams();

    const url = `${process.env.REACT_APP_TRAVEL_MAKERS}/api/trips/${tripId}`;
    const response = await fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    if (response.ok) {
        let data=await response.json();
        // console.log("data", data)
        return (
            <div>
                <div>
                    <h1>{data.trip_name}</h1>
                    <h2>{data.destination}</h2>
                    <h3>{data.start_date}-{data.end_date}</h3>
                    <h4>{data.num_people} "people are joining you in this trip"</h4>
                </div>

                <button className='button is-primary'>Add a flight</button>
            </div>
        );
    };
};

export default TripDetail;
