import { Employee } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const EMPLOYEE_URL = '/employee';

export const employeeAPI = {
  getLoggedInUser: (): Promise<Employee> => {
    return HttpClient.get(`${EMPLOYEE_URL}/me`);
  },
};
