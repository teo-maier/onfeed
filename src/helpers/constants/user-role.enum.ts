export enum UserRole {
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	EMPLOYEE = 'EMPLOYEE',
}

export const UserRoleLabel: Record<UserRole, string> = {
	[UserRole.ADMIN]: 'Admin',
	[UserRole.MANAGER]: 'Manager',
	[UserRole.EMPLOYEE]: 'Employee',
};
