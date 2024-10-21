// reducers/dateFilterReducer.js
import { SET_START_DATE, SET_END_DATE } from '../constants';

const initialState = {
  startDate: null,
  endDate: null,
};

export default function dateFilterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_START_DATE:
      return { ...state, startDate: action.date };
    case SET_END_DATE:
      return { ...state, endDate: action.date };
    default:
      return state;
  }
}