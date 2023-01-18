import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";


export const hotelsApi = createApi({
    reducerPath: 'hotels',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVEL_MAKERS,
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
