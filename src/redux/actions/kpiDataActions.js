// actions/kpiDataActions.js
import { FETCH_KPI_DATA_REQUEST, FETCH_KPI_DATA_SUCCESS, FETCH_KPI_DATA_FAILURE } from '../constants';
import { KPIService } from '../../services/KPIService';

export const fetchKpiData = (startDate, endDate, institutionId) => async (dispatch) => {
  dispatch({ type: FETCH_KPI_DATA_REQUEST });

  try {
    const data = await KPIService.getFailureStats(startDate, endDate, institutionId);
    dispatch({ type: FETCH_KPI_DATA_SUCCESS, data });
  } catch (error) {
    dispatch({ type: FETCH_KPI_DATA_FAILURE, error });
  }
};