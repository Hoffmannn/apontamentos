/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import styles from "./Login.module.css";
import api from "../../services/api";
import { AuthState } from "../../store/ducks/auth/types";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../store/ducks/auth/actions";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

interface UserForm {
  identifier: String;
  password: String;
}

const Login = () => {
  const authState = useSelector((state: { auth: AuthState }) => state.auth);
  const dispatch = useDispatch();

  const [inputLogin, setInputLogin] = useState<UserForm>({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) dispatch(loginSuccess(JSON.parse(user)));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest());
    api
      .post("/auth/local", inputLogin)
      .then((res) => {
        if (res.status === 200) {
          dispatch(loginSuccess(res.data));
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      })
      .catch((e) => {
        dispatch(loginFailure());
        toast.error(e.response.data.message[0].messages[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLogin({
      ...inputLogin,
      identifier: e.currentTarget.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLogin({
      ...inputLogin,
      password: e.currentTarget.value,
    });
  };

  const history = useHistory();

  const handleSignUp = (e: React.FormEvent<HTMLButtonElement>) => {
    history.push("/signup");
  };

  return (
    <div>
      {authState.loading ? (
        <CircularProgress />
      ) : (
        <form className={styles.form} onSubmit={handleLogin}>
          <Typography variant="h5">Apontamentos</Typography>
          <TextField
            required
            id="user"
            label="Usuário"
            onChange={handleUserChange}
          />
          <TextField
            required
            id="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />

          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>

          <Button variant="contained" color="primary" onClick={handleSignUp}>
            Cadastrar
          </Button>
        </form>
      )}
    </div>
  );
};

export default Login;
