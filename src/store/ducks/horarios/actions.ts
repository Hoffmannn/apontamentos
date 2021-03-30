import { action } from "typesafe-actions";
import { HorariosTypes } from "./types";

export const addHorariosRequest = () =>
  action(HorariosTypes.ADD_HORARIOS_REQUEST);

export const addHorariosSuccess = (horarios: any) =>
  action(HorariosTypes.ADD_HORARIOS_SUCCESS, horarios);

export const carregarHorariosRequest = () =>
  action(HorariosTypes.RECEBER_HORARIOS_REQUEST);

export const carregarHorariosSuccess = (horarios: any) =>
  action(HorariosTypes.RECEBER_HORARIOS_SUCCESS, horarios);
