import { FeedbackStatusEnum } from '@onfeed/helpers';
import { Employee } from '../employee/employee';
import { Form } from '../form/form';
import { TeamMember } from '../team/team';

export interface Session {
  id?: string;
  title: string | null;
  description: string | null;
  form: Form | null;
  creator: Employee | null;
  sessionRecipients: SessionRecipients[] | null;
  anonymous: boolean;
  suggestion: boolean;
  draft: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SessionRecipients {
  id?: string;
  sessionId?: string;
  employee: SessionRecipientEmployee;
  completed: boolean;
}

export type SessionRecipientEmployee = Pick<
  TeamMember | Employee,
  'id' | 'firstName' | 'lastName'
>;

export interface SessionByEmployee extends Session {
  completed: boolean;
}

export interface SessionResults {
  answered: number;
  notAnswered: number;
  total: number;
}

export interface SessionStatus {
  sessionId?: string | number;
  status: FeedbackStatusEnum;
}
