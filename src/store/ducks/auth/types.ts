/**
 * Action types
 */
export enum LoginTypes {
  LOGIN_REQUEST = "@auth/LOGIN_REQUEST",
  LOGIN_SUCCCES = "@auth/LOGIN_SUCCCES",
  LOGIN_FAILURE = "@auth/LOGIN_FAILURE",
  LOGOUT = "@auth/LOGOUT",
}

/**
 * Data types
 */
export interface User {
  jwt: string;
  user: any;
}

/**
 * State type
 */
export interface AuthState {
  readonly user: User;
  readonly loading: boolean;
  readonly error: boolean;
  readonly isLogged: boolean;
}
