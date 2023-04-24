import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/authentication.service';

export const httpInterceptor = {
  init: (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        request.url = `${environment.apiUrl}${request.url}`;
        console.log(request.url)
        // Add auth header with jwt from local/session storage
        const jwt = AuthService.getAuthHeader();

        if (jwt) {
          request.headers.set('authorization', jwt);
        }
        console.log(jwt);

        return request;
      }
    );
  },
};
