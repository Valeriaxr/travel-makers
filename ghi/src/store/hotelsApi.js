import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
    tagTypes: ['Hotels'],
    endpoints: builder => ({
        getHotels: builder.query({
            query: (tripId) => `/api/trips/${tripId}/hotels`,
            providesTags: data => {
                const tags = [{type: 'Hotels', id: 'LIST'}];
                if (!data || !data.hotels) return tags;

                const { hotels } = data;
                if (hotels) {
                    tags.concat(...hotels.map(({ id }) => ({type: 'Hotels', id})));
                }
                return tags;
            }
        }),
        createHotel: builder.mutation({
            query: (form, tripId) => {
                const formData = new FormData(form);
                const entries = Array.from(formData.entries());
                const data = entries.reduce((acc, [key, value]) => {acc[key] = Number.parseInt(value) || value; return acc;}, {});
                return {
                    method: 'post',
                    url: `/api/trips/${tripId}/hotels`,
                    credentials: 'include',
                    body: data,
                }
                // makes Api call and creates new owner
            },
            invalidatesTags: ['Hotels'],
        }),
    }),
});

export const {
    useGetHotelsQuery,
    useCreateHotelMutation,
 } = hotelsApi;
