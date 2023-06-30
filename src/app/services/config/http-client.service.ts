import axios, { AxiosInstance } from 'axios';
import { httpInterceptor } from './http-interceptor.service';

let axiosInstance: AxiosInstance | null = null;

const httpClient = (): AxiosInstance => {
  if (axiosInstance === null) {
    axiosInstance = axios.create({
      paramsSerializer: (params) => {
        if (params) {
          const cleanedParams = Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (!value) {
                return acc;
              }
              return { ...acc, [key]: value };
            },
            {}
          );
          return new URLSearchParams(cleanedParams).toString();
        }
        return params;
      },
      withCredentials: true,
    });
  }

  httpInterceptor.init(axiosInstance);

  return axiosInstance;
};

export const HttpClient = httpClient();
