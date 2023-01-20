import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { accountsApi } from "./accountsApi";




export const activitiesApi = createApi({
    reducerPath: 'activities',
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
        getActivities: builder.query({
            query: () => '/api/activities/',
        }),
        createActivity: builder.mutation({
            query: ({data, id}) => ({
                url: `/api/trips/${id}/activities`,
                body: data,
                method: 'post',
                credentials: 'include'
                // makes Api call and creates new owner

            }),
        }),
    }),
});

export const {
    useGetActivitiesQuery,
    useCreateActivityMutation,
 } = activitiesApi;
