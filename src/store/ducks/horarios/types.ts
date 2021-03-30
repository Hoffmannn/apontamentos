/**
 * Action types
 */
export enum HorariosTypes {
  RECEBER_HORARIOS_REQUEST = "@horarios/RECEBER_HORARIOS_REQUEST",
  RECEBER_HORARIOS_SUCCESS = "@horarios/RECEBER_HORARIOS_SUCCESS",
  ADD_HORARIOS_REQUEST = "@horarios/ADD_HORARIOS_REQUEST",
  ADD_HORARIOS_SUCCESS = "@horarios/ADD_HORARIOS_SUCCESS",
}

/**
 * State type
 */
export interface HorariosState {
  readonly horarios: any[];
  readonly loading: boolean;
}
