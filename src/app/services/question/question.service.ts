import { Form, Question } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const QUESTION_URL = '/question';

export const questionAPI = {
  getAllByFormId: (formId: string): Promise<Question[]> => {
    return HttpClient.get(`${QUESTION_URL}/all/${formId}`);
  },
};
