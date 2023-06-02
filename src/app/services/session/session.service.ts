import { Session, SessionByEmployee } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const SESSION_URL = '/session';

export const sessionAPI = {
  getAll: (): Promise<Session[]> => {
    return HttpClient.get(`${SESSION_URL}/all`);
  },

  getAllByCreatorId: (creatorId: number | string): Promise<Session[]> => {
    return HttpClient.get(`${SESSION_URL}/all/${creatorId}`);
  },

  getAllCompletedByEmployeeId: (
    employeeId: number | string
  ): Promise<Session[]> => {
    return HttpClient.get(`${SESSION_URL}/all/completed`, {
      params: { employeeId: employeeId },
    });
  },

  getAllNotCompletedByEmployeeId: (
    employeeId: number | string
  ): Promise<Session[]> => {
    return HttpClient.get(`${SESSION_URL}/all/not-completed`, {
      params: { employeeId: employeeId },
    });
  },

  getAllDrafts: (employeeId: number | string): Promise<Session[]> => {
    return HttpClient.get(`${SESSION_URL}/all/draft`, {
      params: { employeeId: employeeId },
    });
  },

  getById: (sessionId: string | number): Promise<Session> => {
    return HttpClient.get(`${SESSION_URL}/${sessionId}`);
  },

  create: (session: Session): Promise<Session> => {
    return HttpClient.post(`${SESSION_URL}`, session);
  },

  edit: (id: number | string, updatedSession: Session): Promise<Session> => {
    return HttpClient.put(`${SESSION_URL}/${id}`, updatedSession);
  },

  delete: (id: number | string): Promise<any> => {
    return HttpClient.delete(`${SESSION_URL}/${id}`);
  },
};
