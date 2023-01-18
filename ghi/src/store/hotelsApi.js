import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { accountsApi } from './accountsApi';

export const hotelsApi = createApi({
    reducerPath: 'hotels',
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
    tagTypes: ['HotelsList'],
    endpoints: builder => ({
        getHotels: builder.query({
            query: tripId => `/api/trips/${tripId}/hotels`,
            providesTags: ['HotelsList'],
        }),
        createHotel: builder.mutation({
            query: data => ({
                url: '/api/hotels',
                body: data,
                method: 'post',
                // makes Api call and creates new owner

            }),
            invalidatesTags: ['HotelsList'],
        }),
    }),
});

export const {
    useGetHotelsQuery,
    useCreateHotelMutation,
 } = hotelsApi;
