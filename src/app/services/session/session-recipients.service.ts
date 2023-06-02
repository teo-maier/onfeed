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

  getById: (recipientId: string | number): Promise<SessionRecipients> => {
    return HttpClient.get(`${SESSION_RECIPIENTS_URL}/${recipientId}`);
  },

  getSessionResultBySessionId: (
    sessionId: string | number
  ): Promise<SessionResults> => {
    return HttpClient.get(`${SESSION_RECIPIENTS_URL}/results`, {
      params: { sessionId: sessionId },
    });
  },

  edit: (
    recipientId: string | number,
    updatedRecipient: SessionRecipients
  ): Promise<SessionRecipients> => {
    return HttpClient.put(
      `${SESSION_RECIPIENTS_URL}/${recipientId}`,
      updatedRecipient
    );
  },
};
