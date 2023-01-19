import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { clearForm } from './accountSlice';

export const accountsApi = createApi({
    reducerPath: 'accounts',
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
    tagTypes: ['Account', 'Token'],
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
                console.log(info)
                if (info instanceof HTMLElement) {
                    formData = new FormData(info);
                } else {
                    formData = new FormData();
                    formData.append('username', info.email);
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
    }),
});

export const {
    useGetTokenQuery,
    useLogInMutation,
    useLogOutMutation,
    useSignUpMutation,
} = accountsApi;
