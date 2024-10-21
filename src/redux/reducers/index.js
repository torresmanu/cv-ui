import { combineReducers } from 'redux';

import auth from "./auth";
import themeReducer from './themeReducers';
import alertMessages from "./alertMessages";

import dateFilterReducer from './dateFilterReducer';
import kpiDataReducer from './kpiDataReducer';

import dbFilterReducer from '../store/dbFilterSlice';


export default combineReducers({
	dateFilter: dateFilterReducer,
	kpiData: kpiDataReducer,
	filters: dbFilterReducer,
	alertMessages,
	themeReducer,
	auth
});