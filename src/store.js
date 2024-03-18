// store.js
import { configureStore } from '@reduxjs/toolkit';
import { jobApi } from './api/jobApi';
import { jobDetailsByIdApi } from './api/getJobDetailById';

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
    [jobDetailsByIdApi.reducerPath]:jobDetailsByIdApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware, jobDetailsByIdApi.middleware),
   
});
