import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import { useGetHotelsQuery } from './store/hotelsApi';


function HotelList() {
    const { data, error, isLoading } = useGetHotelsQuery();

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
                    <Link to="/hotels/new" className="button">Add Hotel</Link>
                </div>
            </div>
        </div>
    )
}

export default HotelList;
