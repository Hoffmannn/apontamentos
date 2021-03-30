import { createStore, Store } from "redux";
import { AuthState } from "./ducks/auth/types";

import rootReducer from "./ducks/rootReducer";

export interface ApplicationState {
  auth: AuthState;
}

const store: Store<ApplicationState> = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
