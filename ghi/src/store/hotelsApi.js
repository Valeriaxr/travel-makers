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
    endpoints: builder => ({
        getHotels: builder.query ({
            query: ({hotels, id}) => {
                return {
                    url: `/api/trips/${id}/hotels`,
                    credentials: 'include',
                    body: hotels,
                }
            }
        }),
        createHotel: builder.mutation({
            query: ({data, id}) => ({
                url: `/api/trips/${id}/hotels`,
                body: data,
                method: 'post',
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useGetHotelsQuery,
    useCreateHotelMutation,
 } = hotelsApi;
