import { Link } from 'react-router-dom';
import ErrorNotification from "./ErrorNotification";
import { useGetActivityQuery } from './store/activitiesApi';


function ActivityList() {
    const { data, error, isLoading } = useGetActivityQuery();

    if (isLoading){
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }

    return (
        <div className="columns is-centered">
            <div className="column is-narrow">
                <ErrorNotification error={error} />
                <div className="field has-text-right">
                    <Link to="/activities/new" className="button">Add Activity</Link>
                </div>
            </div>
        </div>
    )
}



export default ActivityList;
