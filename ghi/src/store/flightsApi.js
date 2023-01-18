import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";


export const flightsApi = createApi({
    reducerPath: 'flights',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVEL_MAKERS,
    }),
    tagTypes: ['FlightsList'],
    endpoints: builder => ({
        getFlights: builder.query({
            query: () => '/api/flights/',
            providesTags: ['FlightsList'],
        }),
        createFlight: builder.mutation({
            query: data => ({
                url: '/api/flights',
                body: data,
                method: 'post',
                // makes Api call and creates new owner

            }),
            invalidatesTags: ['FlightsList'],
        }),
    }),
});

export const {
    useGetFlightsQuery,
    useCreateFlightMutation,
 } = flightsApi;
