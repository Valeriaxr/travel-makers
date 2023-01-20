import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { accountsApi } from "./accountsApi";


export const flightsApi = createApi({
    reducerPath: 'flights',
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
    endpoints: builder => ({
        getFlights: builder.query ({
            query: () => '/api/flights'
        }),
        createFlight: builder.mutation({
            query: (data, id) => ({
                url: `/api/trips/${id}/flights`,
                body: data,
                method: 'post',
                credentials: 'include',
            }),

        }),
    }),
});

export const {
    useGetFlightsQuery,
    useCreateFlightMutation,
} = flightsApi;
