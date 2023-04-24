import jwt_decode from 'jwt-decode';
import { HttpClient } from '../config/http-client.service';

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export const AuthService = {
  /**
   * Returns the JWT token from the browsers sessionStorage
   */
  getAuthHeader: (): string | null => {
    return sessionStorage.getItem('token');
  },
  /**
   * Login handler - makes the API call and, if successful, saves the token in sessionStorage
   * @param email User email
   * @param password User password
   */
  login: (email: string, password: string): Promise<any> => {
    return HttpClient.post('/auth/authenticate', {
      email,
      password,
    }).then((response) => {
      console.log(response);
      if (response.headers['authorization']) {
        sessionStorage.setItem('token', response.headers['authorization']);
      }
    });
  },

  /**
   * Logout handler
   */
  logout: (): void => {
    sessionStorage.removeItem('token');
  },

  decodeJWT: (token?: string): Record<string, unknown> | null => {
    try {
      return jwt_decode(token || sessionStorage['token']);
    } catch (error) {
      return null;
    }
  },

  getRoleFromToken: (token?: string): UserRole | null => {
    const jwt = AuthService.decodeJWT(token);
    return (jwt?.['RoleKy'] as UserRole) || null;
  },

  /**
   * Helper function to determine if the user is authenticated
   * @returns {Boolean}
   */
  isAuthenticated: (): boolean => {
    const token = AuthService.decodeJWT();
    if (!token || !token?.['exp']) {
      return false;
    }

    const expirationDate = new Date(0);
    const tokenExpiration: number = token['exp'] as number;
    expirationDate.setUTCSeconds(tokenExpiration || 0);

    return expirationDate.valueOf() > new Date().valueOf();
  },

  checkRolePermission: (roles: Array<UserRole>) => {
    const role = AuthService.getRoleFromToken();
    return !!role && roles.includes(role);
  },
};
