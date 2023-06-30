import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/authentication.service';

const onResponse = <Response>(
  response: AxiosResponse
): Response | AxiosResponse<Response> => {
  if (response.data.body) {
    return response.data.body;
  }
  return response;
};

const onError = (error: AxiosError<any>): Promise<AxiosError> => {
  console.error(`[response error]`, error.message);
  if (error.response?.status === 401 && error.response.data) {
    const { redirectUrl } = error.response.data;
    if (redirectUrl && window.location.href !== redirectUrl) {
      window.location.href = redirectUrl;
    }
  }
  return Promise.reject(error);
};

export const httpInterceptor = {
  init: (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        request.url = `${environment.apiUrl}${request.url}`;
        // Add auth header with jwt from local/session storage
        const jwt = AuthService.getAuthHeader();

        if (jwt) {
          request.headers.set('authorization', jwt);
        }

        return request;
      },
      onError
    );
    axiosInstance.interceptors.response.use(onResponse, onError);
  },
};
