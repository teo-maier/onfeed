import { Form, Response } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const FORM_URL = '/form';

export const formAPI = {
  getAll: (): Promise<Form[]> => {
    return HttpClient.get(`${FORM_URL}/all`);
  },

  getById: (id: number | string): Promise<Form> => {
    return HttpClient.get(`${FORM_URL}/${id}`);
  },

  create: (form: Form): Promise<Form> => {
    return HttpClient.post(`${FORM_URL}`, form);
  },

  edit: (id: number | string, updatedForm: Form): Promise<Form> => {
    return HttpClient.put(`${FORM_URL}/${id}`, updatedForm);
  },
};
