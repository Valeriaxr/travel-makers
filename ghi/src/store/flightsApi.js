import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const accountsApi = createApi({
    reducerPath: 'flights',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVEL_MAKERS,
        prepareHeaders: (headers, { getState }) => {
            const selector = fligtsApi.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`);
            }
            return headers;
        }
    }),

tagTypes: ['Flights', 'Token'],
    endpoints: builder => ({
        createFlight: builder.mutation({
            query: data => ({
                url: '/api/flights',
                method: 'post',
                body: data,
                credentials: 'include',
            }),
            providesTags: ['Flights'],
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
    }),
});


export const {
   useCreateFlightMutation,
} = flightsApi;















// export const flightsApi = createApi({
//     reducerPath: 'flights',
//     baseQuery: fetchBaseQuery({
//         baseUrl: process.env.REACT_APP_TRAVEL_MAKERS,
//     }),
//     tagTypes: ['Flights'],
//     endpoints: builder => ({
//         getFlights: builder.query({
//             query: () => '/api/flights/',
//             providesTags: ['Flights'],
//         }),
//         createFlight: builder.mutation({
//             query: data => ({
//                 url: '/api/flights',
//                 body: data,
//                 method: 'post',
//                 // makes Api call and creates new owner

//             }),
//             invalidatesTags: ['Flights'],
//         }),
//     }),
// });

// console.log(flightsApi)
// export const {
//     useGetFlightsQuery,
//     useCreateFlightMutation,
//  } = flightsApi;
//  console.log(useCreateFlightMutation)
// debugger
