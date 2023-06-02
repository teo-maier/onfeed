import { Employee, Password } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const EMPLOYEE_URL = '/employee';

export const employeeAPI = {
  getLoggedInUser: (): Promise<Employee> => {
    return HttpClient.get(`${EMPLOYEE_URL}/me`);
  },

  changePassword: (password: Password): Promise<any> => {
    return HttpClient.put(`${EMPLOYEE_URL}/password`, password);
  },

  edit: (updatedEmployee: Employee): Promise<Employee> => {
    return HttpClient.put(`${EMPLOYEE_URL}`, updatedEmployee);
  },
};
