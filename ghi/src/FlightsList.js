import { Link } from 'react-router-dom';
import { useGetFlightsQuery } from './store/flightsApi';
import ErrorNotification from './ErrorNotification';

function FlightList() {
    const { data, error, isLoading } = useGetFlightsQuery();
    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }
    return (
        <div>
            <div>
                <ErrorNotification error={error} />
                <div>
                    <Link to="/flights/new" className="button">Add Flight</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Departure City</th>
                            <th>Arrival City</th>
                            <th>Depature Time</th>
                            <th>Arrival Time</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}
