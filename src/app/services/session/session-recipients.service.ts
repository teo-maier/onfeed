import { SessionRecipients, SessionResults } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const SESSION_RECIPIENTS_URL = '/session-recipients';

export const sessionRecipientsAPI = {
  getAllBySessionId: (sessionId: string): Promise<SessionRecipients[]> => {
    return HttpClient.get(`${SESSION_RECIPIENTS_URL}`, {
      params: { sessionId: sessionId },
    });
  },

  getAllByEmployeeId: (employeeId: string): Promise<SessionRecipients[]> => {
    return HttpClient.get(`${SESSION_RECIPIENTS_URL}/all-by-employee`, {
      params: { employeeId: employeeId },
    });
  },

  getSessionResultBySessionId: (
    sessionId: string | number
  ): Promise<SessionResults> => {
    return HttpClient.get(`${SESSION_RECIPIENTS_URL}/results`, {
      params: { sessionId: sessionId },
    });
  },
};