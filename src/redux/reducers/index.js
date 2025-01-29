import { combineReducers } from 'redux';

import auth from "./auth";
import themeReducer from './themeReducers';
import alertMessages from "./alertMessages";

import dateFilterReducer from './dateFilterReducer';
import kpiDataReducer from './kpiDataReducer';

import dbFilterReducer from '../store/dbFilterSlice';
import tokenReducer from '../store/tokenSlice';
import sentimentReducer from '../store/sentimentSlice';
import topGainersReducer from '../store/topGainersSlice';
import newsReducer from '../store/newsSlice';
import binanceNewsReducer from '../store/binanceNewsSlice';	

export default combineReducers({
	dateFilter: dateFilterReducer,
	kpiData: kpiDataReducer,
	filters: dbFilterReducer,
	tokens: tokenReducer,
	sentiment: sentimentReducer,
	topGainers: topGainersReducer,
	cryptoNews: binanceNewsReducer,
	news: newsReducer,
	alertMessages,
	themeReducer,
	auth
});