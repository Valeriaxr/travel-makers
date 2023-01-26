import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { accountsApi } from './accountsApi';

export const tripsApi = createApi({
    reducerPath: 'trips',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVEL_MAKERS,
        prepareHeaders: (headers, { getState }) => {
            const selector = accountsApi.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Trips'],
    endpoints: builder => ({
        addTrip: builder.mutation({
            query: data => {
                return {
                    method: 'post',
                    url: '/api/trips',
                    credentials: 'include',
                    body: data,
                }
            },
            invalidatesTags: [{type: 'Trips', id: 'LIST'}],
        }),
        getTrips: builder.query({
            query: trips => {
                return {
                    url: `/api/trips`,
                    credentials: 'include',
                    body: trips,
                }
            },
            providesTags: data => {
                const tags = [{type: 'Trips', id: 'LIST'}];
                if (!data || !data.trips) return tags;

                const { trips } = data;
                if (trips) {
                    tags.concat(...trips.map(({ id }) => ({type: 'Trips', id})));
                }
                return tags;
            }
        }),
        getTrip: builder.query({
            query: tripId => ({
                url: `/api/trips/${tripId}`,
                credentials: 'include',
            }),
            providesTags: ['Trips'],
        }),
    }),
});

export const {
    useGetTripsQuery,
    useAddTripMutation,
    useGetTripQuery,
} = tripsApi;
