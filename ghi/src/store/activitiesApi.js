import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";




export const activitiesApi = createApi({
    reducerPath: 'activities',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVEL_MAKERS,
    }),
    tagTypes: ['ActivityList'],
    endpoints: builder => ({
        getActivities: builder.query({
            query: () => '/api/activities/',
            providesTags: ['ActivityList'],
        }),
        createActivity: builder.mutation({
            query: data => ({
                url: '/api/activities',
                body: data,
                method: 'post',
                // makes Api call and creates new owner

            }),
            invalidatesTags: ['ActivityList'],
        }),
    }),
});

export const {
    useGetActivityQuery,
    useCreateActivityMutation,
 } = activitiesApi;
