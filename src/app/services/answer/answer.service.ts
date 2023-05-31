import { Answer } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const ANSWER_URL = '/answer';

export const answerAPI = {
  getByQuestionId: (questionId: string | number): Promise<Answer> => {
    return HttpClient.get(`${ANSWER_URL}/question`, {
      params: { questionId: questionId },
    });
  },

  create: (answers: Answer[]): Promise<Answer[]> => {
    return HttpClient.post(`${ANSWER_URL}`, { answers: answers });
  },
};
