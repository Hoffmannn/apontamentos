import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import styles from "./SignUp.module.css";
import api from "../../services/api";
import { AuthState } from "../../store/ducks/auth/types";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

interface UserForm {
  username: String;
  email: String;
  password: String;
}

const SignUp = () => {
  const history = useHistory();

  const authState = useSelector((state: { auth: AuthState }) => state.auth);

  const [inputSignUp, setInputSignUp] = useState<UserForm>({
    username: "",
    email: "",
    password: "",
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSignUp({
      ...inputSignUp,
      username: e.currentTarget.value,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSignUp({
      ...inputSignUp,
      email: e.currentTarget.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSignUp({
      ...inputSignUp,
      password: e.currentTarget.value,
    });
  };
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .post("/auth/local/register", {
        ...inputSignUp,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Usuário cadastrado com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history.push("/");
        }
      })
      .catch((e) => {
        toast.error(e.response.data.message[0].messages[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(e.response.data.message[0].messages[0].message);
      });
  };

  const handleVoltar = (e: React.FormEvent<HTMLButtonElement>) => {
    history.push("/");
  };

  return (
    <div>
      {authState.loading ? (
        <CircularProgress />
      ) : (
        <form className={styles.form} onSubmit={handleSignUp}>
          <Typography variant="h5">Cadastre-se</Typography>
          <TextField
            required
            id="user"
            label="Usuário"
            onChange={handleUserChange}
          />

          <TextField
            required
            id="email"
            label="Email"
            onChange={handleEmailChange}
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
            Cadastrar
          </Button>

          <Button variant="contained" color="primary" onClick={handleVoltar}>
            Voltar
          </Button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
