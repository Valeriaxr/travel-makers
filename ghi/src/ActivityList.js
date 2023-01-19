import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import { useGetActivityQuery } from './store/activityApi';


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
                    <Link to="/activity/new" className="button">Add Activity</Link>
                </div>
            </div>
        </div>
    )
}
