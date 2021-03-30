import { Reducer } from "redux";
import { LoginTypes, AuthState } from "./types";

const INITIAL_STATE: AuthState = {
  user: {
    jwt: "",
    user: {},
  },
  error: false,
  loading: false,
  isLogged: false,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoginTypes.LOGIN_REQUEST:
      return { ...state, loading: true };
    case LoginTypes.LOGIN_SUCCCES:
      return {
        user: action.payload.data,
        loading: false,
        error: false,
        isLogged: true,
      };
    case LoginTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        data: {},
        isLogged: false,
      };
    case LoginTypes.LOGOUT:
      return {
        ...state,
        loading: false,
        error: false,
        data: {},
        isLogged: false,
      };
    default:
      return state;
  }
};

export default reducer;
