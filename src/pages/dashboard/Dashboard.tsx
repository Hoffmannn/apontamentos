import React from "react";
import { AppBar, Tabs, Tab, Button, Typography, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/ducks/auth/actions";
import { Redirect } from "react-router-dom";
import { AuthState } from "../../store/ducks/auth/types";
import styles from "./Dashboard.module.css";
import RegistrarHorarios from "./tabs/registrarHorarios/RegistrarHorarios";
import HistoricoHorarios from "./tabs/historicoHorarios/HistoricoHorarios";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  const authState = useSelector((state: { auth: AuthState }) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    return <Redirect to="/" />;
  };

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <>
      {!authState.isLogged ? (
        <Redirect to="/"></Redirect>
      ) : (
        <div>
          <AppBar position="static" className={styles.nav}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Registrar horários" />
              <Tab label="Histórico" />
            </Tabs>
            <div className={styles.areaSair}>
              <div>
                {" "}
                Olá, <strong>{authState.user.user.username}</strong>
              </div>
              <Button
                onClick={handleLogout}
                variant="outlined"
                className={styles.botaoSair}
              >
                Sair
              </Button>
            </div>
          </AppBar>
          <TabPanel value={value} index={0}>
            <RegistrarHorarios />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HistoricoHorarios />
          </TabPanel>
        </div>
      )}
    </>
  );
};

export default Dashboard;
