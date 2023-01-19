import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountsApi } from './accountsApi';
import { tripsApi } from './tripsApi';
import { flightsAPi } from './flightsApi';

import { hotelsApi } from './hotelsApi';
// import { activitiesApi } from './activitiesApi';

export const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
    [flightsAPi.reducerPath]: flightsAPi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [hotelsApi.reducerPath]: hotelsApi.reducer,
    // [activitiesApi.reducerPath]: activitiesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
    .concat(flightsAPi.middleware)
    //   .concat(activitiesApi.middleware)
    .concat(hotelsApi.middleware)
      .concat(tripsApi.middleware)
      .concat(accountsApi.middleware),
});

setupListeners(store.dispatch);
