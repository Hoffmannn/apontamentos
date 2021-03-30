import DateFnsUtils from "@date-io/date-fns";
import pt from "date-fns/locale/pt-BR";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useState } from "react";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import styles from "./RegistrarHorarios.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AuthState } from "../../../../store/ducks/auth/types";
import api from "../../../../services/api";
import {
  addHorariosRequest,
  addHorariosSuccess,
} from "../../../../store/ducks/horarios/actions";
import { HorariosState } from "../../../../store/ducks/horarios/types";

const RegistrarHorarios = () => {
  const authState = useSelector((state: { auth: AuthState }) => state.auth);
  const appointments = useSelector(
    (state: { horarios: HorariosState }) => state.horarios
  );

  const dispatch = useDispatch();

  const [dataChegada, setDataChegada] = useState(new Date());
  const [dataSaidaAlmoco, setDataSaidaAlmoco] = useState(new Date());
  const [dataChegadaAlmoco, setDataChegadaAlmoco] = useState(new Date());
  const [dataSaida, setDataSaida] = useState(new Date());

  const handleDateChange = (e: any, setDate: any) => {
    setDate(e);
  };

  const handleAdicionar = () => {
    dispatch(addHorariosRequest());
    api
      .post(
        "/appointments",
        {
          horaChegada: dataChegada,
          horaInicioAlmoco: dataSaidaAlmoco,
          horaChegadaAlmoco: dataChegadaAlmoco,
          horaSaida: dataSaida,
          idUser: authState.user.user.id,
        },
        {
          headers: {
            Authorization: "Bearer " + authState.user.jwt,
          },
        }
      )
      .then((res) => {
        dispatch(addHorariosSuccess(res.data));
        toast.success("Horários cadastrados com sucesso!", {
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

  return (
    <>
      {appointments.loading ? (
        <CircularProgress />
      ) : (
        <div className={styles.container}>
          <Typography variant="h5">Registrar Horários</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt}>
            <DateTimePicker
              variant="inline"
              value={dataChegada}
              label="Chegada"
              onChange={(e) => handleDateChange(e, setDataChegada)}
            />
            <DateTimePicker
              variant="inline"
              value={dataSaidaAlmoco}
              label="Início do Almoço"
              onChange={(e) => handleDateChange(e, setDataSaidaAlmoco)}
            />
            <DateTimePicker
              variant="inline"
              value={dataChegadaAlmoco}
              label="Saída do Almoço"
              onChange={(e) => handleDateChange(e, setDataChegadaAlmoco)}
            />
            <DateTimePicker
              variant="inline"
              value={dataSaida}
              label="Saída"
              onChange={(e) => handleDateChange(e, setDataSaida)}
            />
          </MuiPickersUtilsProvider>
          <Button variant="contained" color="primary" onClick={handleAdicionar}>
            Adicionar horários
          </Button>
        </div>
      )}
    </>
  );
};

export default RegistrarHorarios;
