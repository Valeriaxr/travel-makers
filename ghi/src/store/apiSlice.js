import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { clearForm } from './accountSlice';

export const apiSlice = createApi({
    reducerPath: 'trips',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVEL_MAKERS,
        prepareHeaders: (headers, { getState }) => {
            const selector = apiSlice.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Account', 'Trips', 'Token'],
    endpoints: builder => ({
        signUp: builder.mutation({
            query: data => ({
                url: '/api/accounts',
                method: 'post',
                body: data,
                credentials: 'include',
            }),
            providesTags: ['Account'],
            invalidatesTags: result => {
                return (result && ['Token']) || [];
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearForm());
                } catch (err) {}
            },
        }),
        logIn: builder.mutation({
            query: info => {
                let formData = null;
                if (info instanceof HTMLElement) {
                    formData = new FormData(info);
                } else {
                    formData = new FormData();
                    formData.append('email', info.email);
                    formData.append('password', info.password);
                }
                return {
                    url: '/token',
                    method: 'post',
                    body: formData,
                    credentials: 'include',
                };
            },
            providesTags: ['Account'],
            invalidatesTags: result => {
                return (result && ['Token']) || [];
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearForm());
                } catch (err) {}
            },
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'delete',
                credentials: 'include',
            }),
            invalidatesTags: ['Account', 'Token'],
        }),
        getToken: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include',
            }),
            providesTags: ['Token'],
        }),
        addTrip: builder.mutation({
            query: form => {
                const formData = new FormData(form);
                const entries = Array.from(formData.entries());
                const data = entries.reduce((acc, [key, value]) => {acc[key] = Number.parseInt(value) || value; return acc;}, {});
                return {
                    method: 'post',
                    url: '/api/trips',
                    credentials: 'include',
                    body: data,
                }
            },
            invalidatesTags: [{type: 'Trips', id: 'LIST'}],
        }),
        getTrips: builder.query({
            query: () => `/api/trips`,
            providesTags: data => {
                const tags = [{type: 'Trips', id: 'LIST'}];
                if (!data || !data.trips) return tags;

                const { trips } = data;
                if (trips) {
                    tags.concat(...trips.map(({ id }) => ({type: 'Trips', id})));
                }
                return tags;
            }
        }),
        getTrip: builder.query({
            query: tripId => ({
                url: `/api/trips/${tripId}`,
                credentials: 'include',
            }),
            providesTags: ['Trips'],
        }),
        // getTrip: builder.query({
        //     query: tripId => ({
        //         method: 'get',
        //         url: `/api/trips/${tripId}/`,
        //         credentials: 'include',
        //     }),
        //     providesTags: data => {
        //         const tags = [{type: 'Trips', id: 'GET'}];
        //         if (!data || !data.trips) return tags;

        //         const { trips } = data;
        //         if (trips) {
        //             tags.concat(...trips.map(({ id }) => ({type: 'Trips', id})));
        //         }
        //         return tags;
        //     }
        // }),
    }),
});

export const {
    useGetTripsQuery,
    useGetTokenQuery,
    useLogInMutation,
    useLogOutMutation,
    useSignUpMutation,
    useAddTripMutation,
    useGetTripQuery,
} = apiSlice;
