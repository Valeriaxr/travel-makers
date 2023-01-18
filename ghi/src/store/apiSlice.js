import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'accounts',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVEL_MAKERS,
    }),
    tagTypes: ['AccountList'],
    endpoints: builder => ({
        getAccounts: builder.query({
            query: () => '/api/accounts',
            providesTags: ['AccountList'],
        }),
        createAccount: builder.mutation({
            query: data => ({
                url: '/api/accounts',
                body: data,
                method: 'post',
            }),
            invalidatesTags: ['AccountList'],
        }),
    }),
});

export const {
    useGetAccountsQuery,
    useCreateAccountMutation,
} = accountsApi;
