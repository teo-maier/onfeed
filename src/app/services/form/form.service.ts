import { Form } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const FORM_URL = '/form';

export const formAPI = {
  getAll: (): Promise<Form[]> => {
    return HttpClient.get(`${FORM_URL}/all`);
  },

  getById: (id: number | string): Promise<Form> => {
    return HttpClient.get(`${FORM_URL}/${id}`);
  },

  getByRecipientId: (recipientId: string | number): Promise<Form> => {
    return HttpClient.get(`${FORM_URL}/recipient`, {
      params: { recipientId: recipientId },
    });
  },

  create: (form: Form): Promise<Form> => {
    return HttpClient.post(`${FORM_URL}`, form);
  },

  edit: (id: number | string, updatedForm: Form): Promise<Form> => {
    return HttpClient.put(`${FORM_URL}/${id}`, updatedForm);
  },

  delete: (id: number | string): Promise<any> => {
    return HttpClient.delete(`${FORM_URL}/${id}`);
  },
};
