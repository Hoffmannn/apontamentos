import { combineReducers } from "redux";

import auth from "./auth";
import horarios from "./horarios";

export default combineReducers({
  auth,
  horarios,
});
