// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_PATH } from '../config';

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_PATH , 
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
          headers.set("accessToken", token);
        }
        return headers;
      },
    }), // Adjust the base URL accordingly
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    getJobDetails: builder.query({
      query: ({page}) => `getJobDetails?page=${page}`,
      providesTags: ['Job'],
    }),
  }),
});

export const { useGetJobDetailsQuery } = jobApi;



