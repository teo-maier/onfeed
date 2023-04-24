import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig, AxiosResponseHeaders } from 'axios';
import { HttpClient } from '../../services/config/http-client.service';

const axiosBaseQuery: () => BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
    responseType?: AxiosRequestConfig['responseType'];
  },
  unknown,
  SerializedError,
  unknown,
  { headers: AxiosResponseHeaders; request: AxiosRequestConfig }
> =
  () =>
  async ({
    url,
    method,
    data,
    params,
    headers: requestHeaders,
    responseType,
  }) => {
    return new Promise((resolve, reject) => {
      HttpClient({
        url,
        method,
        data,
        params,
        headers: requestHeaders,
        responseType,
      })
        .then(({ data, headers: responseHeaders, request }) =>
          resolve({
            data,
            meta: { headers: responseHeaders as AxiosResponseHeaders, request },
          })
        )
        .catch((error: AxiosError) =>
          reject({
            error: {
              status: error.response?.status,
              data: error.response?.data || error.message,
            },
          })
        );
    });
  };

// Define our single API slice object
export const apiSlice = createApi({
  tagTypes: [
    // 'EmployeeDetails',
    // 'EmployeeDetailsById',
    // 'Employee',
  ],
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
