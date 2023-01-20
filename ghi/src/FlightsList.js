import React from 'react';
import { Link} from 'react-router-dom';

function FlightColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        // const trip = data;
        return (
          <div key={data.href} className="card mb-3 shadow">
            <Link className='' to={`/flights/${data.id}`}>
            {/* <img src={conference.location.picture_url} className="card-img-top" /> */}
            <div className="card-body">
              <h5 className="card-title">{data.number}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {data.departure}
              </h6>
            </div>
            <div className="card-footer">
              {new Date(data.arrival).toLocaleDateString()}
            </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

class FlightsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = `${process.env.REACT_APP_TRAVEL_MAKERS}/api/flights/`;

    try {
      const response = await fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // Get the list of conferences
        const data = await response.json();
        console.log('data', data)
        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let trip of data) {
          const detailUrl = `${process.env.REACT_APP_TRAVEL_MAKERS}/api/flights/${trip.id}`;
          requests.push(fetch(detailUrl, {
            method: 'get',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }));
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the conference
        // information into
        const flightColumns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const flightResponse of responses) {
          if (tripResponse.ok) {
            const details = await flightResponse.json();
            flightColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(tripResponse);
          }
        }

        // Set the state to the new list of three lists of
        // conferences
        this.setState({flightColumns: flightColumns});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
          <h1 className="display-5 fw-bold">Travel Makers</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Unravel your travel!
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/trips/new" className="btn btn-primary btn-lg px-4 gap-3">Create a trip</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Upcoming trips</h2>
          <div className="row">
            {this.state.tripColumns.map((tripList, index) => {
              return (
                <TripColumn key={index} list={tripList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default FlightsList;




























// import { Link } from 'react-router-dom';
// import { useGetFlightsQuery } from './store/flightsApi';
// import ErrorNotification from './ErrorNotification';

// function FlightList() {
//     const { data, error, isLoading } = useGetFlightsQuery();
//     if (isLoading) {
//         return (
//             <progress className="progress is-primary" max="100"></progress>
//         );
//     }
//     return (
//         <div>
//             <div>
//                 <ErrorNotification error={error} />
//                 <div>
//                     <Link to="/flights/new" className="button">Add Flight</Link>
//                 </div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Number</th>
//                             <th>Departure City</th>
//                             <th>Arrival City</th>
//                             <th>Depature Time</th>
//                             <th>Arrival Time</th>
//                         </tr>
//                     </thead>
//                     <tbody>

//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }
