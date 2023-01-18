import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './apiSlice';
// import { tripsApi } from './tripsApi';
// import { flightsApi } from './flightsApi';
import { hotelsApi } from './hotelsApi';
// import { activitiesApi } from './activitiesApi';

export const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    // [tripsApi.reducerPath]: tripsApi.reducer,
    // [flightsApi.reducerPath]: flightsApi.reducer,
    [hotelsApi.reducerPath]: hotelsApi.reducer,
    // [activitiesApi.reducerPath]: activitiesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
    //   .concat(activitiesApi.middleware)
    .concat(hotelsApi.middleware)
    //   .concat(flightsApi.middleware)
    //   .concat(tripsApi.middleware)
      .concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
