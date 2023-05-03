export const NEW_ENTITY_ROUTE = 'new';

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
	VIEW_ROUTE: (id: number | string) => `${id}/view`,
	EDIT_ROUTE: (id: number | string) => `${id}/edit`,
	CHANGE_PASSWORD_BY_ID: (id: number | string) => `${id}/password`,
};
