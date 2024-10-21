import API from './api'
import {enqueueSnackbar} from "../redux/actions/snackbarActions"
import store from "../redux/store";
import {successMessage} from "./alertMessages"
import snackbarMessages from "./snackbarMessages"
import GLOBALS from "./GLOBALS";
import {handleError} from "./handleError";


export const KPIService = {

    getMasterEvaluations: function (date) {
      let param;
      date === "undefined" ? param = '/0' : param = '/0?from=' + date;
        return API.post(GLOBALS.ENDPOINTS.REPORTS.LIST + param).then((response) => {
          store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.report.get_master_evals)))
          return response.data.data
        })
          .catch((error) => {
            handleError(error, snackbarMessages.error.report.get_master_evals);
          })
    },
    getFailureStats: function (startDate, endDate, institutionId) { 
      const fromDate = startDate?.toISOString().split('T')[0];
      const toDate = endDate?.toISOString().split('T')[0];

      const date_param = (fromDate === undefined || toDate === undefined) ? '?' : '?from=' + fromDate + '&to=' + toDate + '&';
      const institution_param = institutionId === undefined || institutionId === -1 ? '' : 'institution=' + institutionId;

      return API.post(GLOBALS.ENDPOINTS.STATS.GET_FAILURES + '/0' + date_param + institution_param).then((response) => {
        store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.report.get_master_evals)))
        return response.data.data
      })
        .catch((error) => {
          handleError(error, snackbarMessages.error.report.get_master_evals);
        })
    },
    getUserKPI: function () {
        return API.post(GLOBALS.ENDPOINTS.STATS.GET_USER_KPI + "/0").then((response) => {
          return response.data.data
        })
          .catch((error) => {
            handleError(error, snackbarMessages.error.KPI.get_user_kpi);
          })
    },
    getFilterValues: function (id) {
      let param;
      id === undefined ? param = '/0' : param = '/' + id;
        return API.post(GLOBALS.ENDPOINTS.STATS.GET_FILTER_VALUES + param).then((response) => {
          return response.data.data
        })
          .catch((error) => {
            handleError(error, snackbarMessages.error.KPI.get_filter_values);
          })
    },
    buildKPI: function (data, timeFrame, date) {
      const requestData = date !== undefined ?
        {time_frame: timeFrame, from_date: date, dataset_series: data} :
        {time_frame: timeFrame, dataset_series: data};
      return API.post(GLOBALS.ENDPOINTS.STATS.BUILD_KPI + '/0', requestData).then((response) => {
        return response.data.data
      })
        .catch((error) => {
          handleError(error, snackbarMessages.error.KPI.build_kpi);
        })
    },
    storeUserKPI: function (name, data) {
      return API.post(GLOBALS.ENDPOINTS.STATS.STORE_USER_KPI + '/0',
        {dataset_series: data, filter_set_name: name}).then((response) => {
          store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.KPI.store_user_kpi)))
          return response.data.data
      })
        .catch((error) => {
          handleError(error, snackbarMessages.error.KPI.store_user_kpi);
        })
    },
    getEvaluators: function () {
      return API.post(GLOBALS.ENDPOINTS.REPORTS.GET_EVALUATORS + '/0').then((response) => {
        return Object.values(response?.data?.data) || []
      })
        .catch((error) => {
          handleError(error, snackbarMessages.error.KPI.get_evaluators);
        })
    },
};