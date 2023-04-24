export const NEW_ENTITY_ROUTE = 'new';

export const ONFEED_ROUTES = {
	LOGIN: `/login`,
	UNAUTHORIZED: `/unauthorized`,
	NOT_FOUND: `/not-found`,
	DASHBOARD: `/dashboard`,
	NEW_EMPLOYEE: `${NEW_ENTITY_ROUTE}`,
	COMPONENTS: '/components',
	SETTINGS: '/settings',
	PROFILE: 'profile',
	SECURITY: 'security',
	CHANGE_PASSWORD: '/password',
	OVERVIEW: 'overview',
	EMPLOYEES: 'employees',
	VIEW_ROUTE: (id: number | string) => `${id}/view`,
	EDIT_ROUTE: (id: number | string) => `${id}/edit`,
	CHANGE_PASSWORD_BY_ID: (id: number | string) => `${id}/password`,
};
