// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_PATH } from '../config';

export const jobDetailsByIdApi = createApi({
  reducerPath: 'jobDetailsByIdApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_PATH , 
    prepareHeaders: (headers, { getState }) => {
        const state = getState();
        const token = localStorage.getItem('accessToken')
        if (token) {
          headers.set("accessToken", token);
        }
        return headers;
      },
    }), // Adjust the base URL accordingly
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    getJobDetailsById: builder.query({
      query: ({jobId}) => `getJobDetails?jobId=${jobId}`,
      providesTags: ['Job'],
    }),
  }),
});

export const { useGetJobDetailsByIdQuery } = jobDetailsByIdApi;



