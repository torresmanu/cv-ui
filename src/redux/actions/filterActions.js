import { DBService } from '../../services/DBService';

// Action types
export const FETCH_FILTERS_REQUEST = 'FETCH_FILTERS_REQUEST';
export const FETCH_FILTERS_SUCCESS = 'FETCH_FILTERS_SUCCESS';
export const FETCH_FILTERS_FAILURE = 'FETCH_FILTERS_FAILURE';
export const SET_SELECTED_FILTER = 'SET_SELECTED_FILTER';
export const APPLY_FILTERS = 'APPLY_FILTERS';

// Fetch filters from the DB
export const fetchFilters = () => async (dispatch) => {
  dispatch({ type: FETCH_FILTERS_REQUEST });
  try {
    const data = await DBService.getFilterValues();
    if (data?.http_code === 200) {
      const institutionMap = data?.data?.institutions || {};
      const portalUserMap = data?.data?.portal_users || {};
      dispatch({
        type: FETCH_FILTERS_SUCCESS,
        payload: { filters: data?.data, institutionMap, portalUserMap },
      });
    } else {
      dispatch({ type: FETCH_FILTERS_FAILURE });
    }
  } catch (error) {
    dispatch({ type: FETCH_FILTERS_FAILURE });
  }
};

// Set selected filter
export const setSelectedFilter = (filter) => ({
  type: SET_SELECTED_FILTER,
  payload: filter,
});

// Apply filters
export const applyFilters = (filter) => ({
  type: APPLY_FILTERS,
  payload: filter,
});