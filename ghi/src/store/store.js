import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountsApi } from './accountsApi';
import { tripsApi } from './tripsApi';
import { flightsApi } from './flightsApi';
import { hotelsApi } from './hotelsApi';
// import { activitiesApi } from './activitiesApi';

export const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [flightsApi.reducerPath]: flightsApi.reducer,
    [hotelsApi.reducerPath]: hotelsApi.reducer,
    // [activitiesApi.reducerPath]: activitiesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
    //   .concat(activitiesApi.middleware)
    .concat(hotelsApi.middleware)
    .concat(flightsApi.middleware)
      .concat(tripsApi.middleware)
      .concat(accountsApi.middleware),
});

setupListeners(store.dispatch);
