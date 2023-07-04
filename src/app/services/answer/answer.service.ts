import { Answer, Session } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const ANSWER_URL = '/answer';

export const answerAPI = {
  getBySessionIdAndEmployeeId: (
    sessionId: string | number,
    employeeId: string | number,
    questionId: string | number
  ): Promise<Answer> => {
    return HttpClient.get(`${ANSWER_URL}/question`, {
      params: { sessionId: sessionId, employeeId: employeeId, questionId: questionId },
    });
  },

  create: (answers: Answer[], session: Session): Promise<Answer[]> => {
    return HttpClient.post(`${ANSWER_URL}`, {
      answers: answers,
      session: session,
    });
  },
};
