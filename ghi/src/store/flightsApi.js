import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const flightsAPi = createApi({
    reducerPath: 'flights',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVEL_MAKERS,
    }),
    endpoints: builder => ({
        getFlights: builder.query ({
            query: () => '/api/flights'
        }),
        createFlight: builder.mutation({
            query: data => ({
                url: '/api/flights',
                body: data,
                method: 'post',
            }),

        }),
    }),
});

export const {
    useGetFlightsQuery,
    useCreateFlightMutation,
} = flightsAPi;
