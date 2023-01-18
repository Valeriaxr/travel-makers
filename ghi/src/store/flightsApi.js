import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";


export const flightsApi = createApi({
    reducerPath: 'flights',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVEL_MAKERS,
    }),
    tagTypes: ['Flights'],
    endpoints: builder => ({
        getFlights: builder.query({
            query: () => '/api/flights/',
            providesTags: ['Flights'],
        }),
        createFlight: builder.mutation({
            query: data => ({
                url: '/api/flights',
                body: data,
                method: 'post',
                // makes Api call and creates new owner

            }),
            invalidatesTags: ['Flights'],
        }),
    }),
});

export const {
    useGetFlightsQuery,
    useCreateFlightMutation,
 } = flightsApi;
