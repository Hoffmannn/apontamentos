import { action } from "typesafe-actions";
import { LoginTypes, User } from "./types";

export const loginRequest = () => action(LoginTypes.LOGIN_REQUEST);

export const loginSuccess = (data: User) =>
  action(LoginTypes.LOGIN_SUCCCES, { data });

export const loginFailure = () => action(LoginTypes.LOGIN_FAILURE);

export const logout = () => action(LoginTypes.LOGOUT);
