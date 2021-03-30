import { Reducer } from "redux";
import { HorariosTypes, HorariosState } from "./types";

const INITIAL_STATE: HorariosState = {
  horarios: [],
  loading: false,
};

const reducer: Reducer<HorariosState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HorariosTypes.RECEBER_HORARIOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HorariosTypes.RECEBER_HORARIOS_SUCCESS:
      return {
        ...state,
        loading: false,
        horarios: action.payload,
      };
    case HorariosTypes.ADD_HORARIOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HorariosTypes.ADD_HORARIOS_SUCCESS:
      return {
        ...state,
        loading: false,
        horarios: [...state.horarios, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
