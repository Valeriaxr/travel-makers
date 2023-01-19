import React from 'react';
import { Link } from 'react-router-dom';

function TripColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const trip = data.trip;
        return (
          <div key={trip.href} className="card mb-3 shadow">
            {/* <img src={conference.location.picture_url} className="card-img-top" /> */}
            <div className="card-body">
              <h5 className="card-title">{trip.trip_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {trip.destination}
              </h6>
            </div>
            <div className="card-footer">
              {new Date(trip.start_date).toLocaleDateString()}
              -
              {new Date(trip.end_date).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

class TripList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/trips/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of conferences
        const data = await response.json();

        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let trip of data.trips) {
          const detailUrl = `http://localhost:8000${trip.href}`;
          requests.push(fetch(detailUrl));
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the conference
        // information into
        const tripColumns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const tripResponse of responses) {
          if (tripResponse.ok) {
            const details = await tripResponse.json();
            tripColumns[i].push(details);
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
        this.setState({tripColumns: tripColumns});
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

export default TripList;
