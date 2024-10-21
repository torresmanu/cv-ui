// actions/dateFilterActions.js
import { SET_START_DATE, SET_END_DATE } from '../constants';

export const setStartDate = (date) => ({
  type: SET_START_DATE,
  date,
});

export const setEndDate = (date) => ({
  type: SET_END_DATE,
  date,
});