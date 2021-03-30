import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "./store/ducks/auth/types";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import "./App.css";

function App() {
  const authState = useSelector((state: { auth: AuthState }) => state.auth);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          {authState.isLogged ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
