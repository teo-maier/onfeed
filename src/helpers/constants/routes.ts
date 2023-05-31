import { SLUG_KEY } from './globals';

export const ONFEED_ROUTES = {
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  UNAUTHORIZED: `/unauthorized`,
  NOT_FOUND: `/not-found`,
  DASHBOARD: `/dashboard`,
  SETTINGS: '/settings',
  PROFILE: 'profile',
  SECURITY: 'security',
  CHANGE_PASSWORD: '/password',
  FORM: '/form',
  FEEDBACK: '/feedback',
  SESSION: '/session',
  SLUG: `:${SLUG_KEY}`,
  NEW: 'new',
  VIEW: 'view',
  EDIT: 'edit',
  CHANGE_PASSWORD_BY_ID: (id: number | string) => `${id}/password`,
};
