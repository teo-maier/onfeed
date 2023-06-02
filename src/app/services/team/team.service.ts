import { Team } from '@onfeed/models';
import { HttpClient } from '../config/http-client.service';

export const TEAM_URL = '/team';

export const teamAPI = {
  getAll: (): Promise<Team[]> => {
    return HttpClient.get(`${TEAM_URL}/all`);
  },

  getById: (id: number | string): Promise<Team> => {
    return HttpClient.get(`${TEAM_URL}/${id}`);
  },
};
