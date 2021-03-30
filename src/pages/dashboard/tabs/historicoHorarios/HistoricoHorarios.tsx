/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { DataGrid, GridColumns, GridRowsProp } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";
import api from "../../../../services/api";
import { AuthState } from "../../../../store/ducks/auth/types";
import styles from "./HistoricoHorarios.module.css";
import { HorariosState } from "../../../../store/ducks/horarios/types";
import {
  carregarHorariosRequest,
  carregarHorariosSuccess,
} from "../../../../store/ducks/horarios/actions";

const HistoricoHorarios = () => {
  const authState = useSelector((state: { auth: AuthState }) => state.auth);
  const appointments = useSelector(
    (state: { horarios: HorariosState }) => state.horarios.horarios
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(carregarHorariosRequest());
    api
      .get(`/appointments?idUser=${authState.user.user.id}`, {
        headers: {
          Authorization: "Bearer " + authState.user.jwt,
        },
      })
      .then((res) => {
        dispatch(carregarHorariosSuccess([...res.data]));
      });
  }, []);

  const rows: GridRowsProp = appointments.map((appointment: any) => ({
    id: appointment.id,
    data: new Date(appointment.horaChegada),
    horaChegada: format(new Date(appointment.horaChegada), "HH:mm"),
    horaInicioAlmoco: format(new Date(appointment.horaInicioAlmoco), "HH:mm"),
    horaChegadaAlmoco: format(new Date(appointment.horaChegadaAlmoco), "HH:mm"),
    horaSaida: format(new Date(appointment.horaSaida), "HH:mm"),
  }));

  const columns: GridColumns = [
    { field: "id", headerName: "ID", width: 0, hide: true },
    { field: "data", headerName: "Data", type: "date", width: 150 },
    { field: "horaChegada", headerName: "Hora Chegada", width: 150 },
    { field: "horaInicioAlmoco", headerName: "Hora Início Almoço", width: 150 },
    {
      field: "horaChegadaAlmoco",
      headerName: "Hora Chegada Almoço",
      width: 150,
    },
    { field: "horaSaida", headerName: "Hora Saída", width: 150 },
  ];

  return (
    <>
      <Typography variant="h5">Histórico de Apontamentos</Typography>
      <div className={styles.table}>
        <DataGrid
          rows={rows}
          columns={columns}
          sortModel={[
            {
              field: "data",
              sort: "desc",
            },
          ]}
        />
      </div>
    </>
  );
};

export default HistoricoHorarios;
