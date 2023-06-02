import { Answer } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const ANSWER_URL = '/answer';

export const answerAPI = {
  getByQuestionIdAndEmployeeId: (
    questionId: string | number,
    employeeId: string | number
  ): Promise<Answer> => {
    return HttpClient.get(`${ANSWER_URL}/question`, {
      params: { questionId: questionId, employeeId: employeeId },
    });
  },

  create: (answers: Answer[]): Promise<Answer[]> => {
    return HttpClient.post(`${ANSWER_URL}`, { answers: answers });
  },
};
