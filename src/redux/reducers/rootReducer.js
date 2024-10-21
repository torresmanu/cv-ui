// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import dbFilterReducer from './dbFilterSlice';  // Now we're using filterSlice

const rootReducer = combineReducers({
  filters: dbFilterReducer,
  // other reducers can be added here
});

export default rootReducer;