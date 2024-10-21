// reducers/kpiDataReducer.js
import { FETCH_KPI_DATA_REQUEST, FETCH_KPI_DATA_SUCCESS, FETCH_KPI_DATA_FAILURE } from '../constants';

const initialState = {
  isKPILoading: false,
  calibrationData: [],
  trustworthyData: [],
  processingFailsData: [],
  discardedData: [],
  completedEvaluations: [],
  successfulTasks: [],
  error: null,
};

const kpiDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KPI_DATA_REQUEST:
      return {
        ...state,
        isKPILoading: true,
        error: null,
      };
    case FETCH_KPI_DATA_SUCCESS:
      return {
        ...state,
        isKPILoading: false,
        calibrationData: action.data.calibrations,
        trustworthyData: action.data.trustworthy_task,
        processingFailsData: action.data.processing_fails,
        discardedData: action.data.discarded,
        completedEvaluations: action.data.completed_evaluations,
        successfulTasks: action.data.successful_tasks,
      };
    case FETCH_KPI_DATA_FAILURE:
      return {
        ...state,
        isKPILoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default kpiDataReducer;