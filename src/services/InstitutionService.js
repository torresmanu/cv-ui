import API from './api'
import {enqueueSnackbar} from "../redux/actions/snackbarActions"
import store from "../redux/store";
import {successMessage} from "./alertMessages"
import snackbarMessages from "./snackbarMessages"
import GLOBALS from "./GLOBALS";
import {handleError} from "./handleError";

export const InstitutionService = {

   list: function () {
     //the identifier should always be set to 0 as it will not be used
       return API.post(GLOBALS.ENDPOINTS.INSTITUTION.LIST + '/0')
         .then((response) => {
           return response.data.data || []
         })
       .catch((error) => {
           handleError(error, snackbarMessages.error.institutions.get);
         })
   },
   getRegionList: function () {
     //the identifier should always be set to 0 as it will not be used
       return API.post(GLOBALS.ENDPOINTS.INSTITUTION.GET_REGION + '/0')
         .then((response) => {
           return response.data|| []
         })
       .catch((error) => {
         handleError(error, snackbarMessages.error.institutions.get);
         })
   },
   getUsersForInstitution: function (id) {
     //the identifier should always be set to 0 as it will not be used
      return API.post(GLOBALS.ENDPOINTS.PORTAL_USER.LIST + '/' + id)
        .then((response) => {
          return response?.data?.data || []
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.portalUsers.get);
          })
   },
   get: function (institution_id) {
     //the identifier should always be set to 0 as it will not be used
      return API.post(GLOBALS.ENDPOINTS.INSTITUTION.GET + '/' + institution_id)
        .then((response) => {
          return response.data || []
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.institutions.get);
          })
   },
  set: function (institution_id, data, institution_evaluations) {
    const url = institution_id ? GLOBALS.ENDPOINTS.INSTITUTION.SET + '/' + institution_id 
    : GLOBALS.ENDPOINTS.INSTITUTION.SET + '/0'
    const body = institution_id ? {
        id: institution_id,
        institution_name: data.institution_name,
        address: data.address,
        country: data.country,
        email: data.email,
        state_or_province: data.state_or_province,
        postal_code: data.postal_code,
        phone_number: data.phone_number,
        enabled: data.enabled ? 1: 0,
        available_evaluations: institution_evaluations,
      } :
      {
        institution_name: data.institution_name,
        address: data.address,
        country: data.country,
        email: data.email,
        state_or_province: data.state_or_province,
        postal_code: data.postal_code,
        phone_number: data.phone_number,
        region: data.region,
        enabled: data.enabled ? 1: 0,
        distribution_site: data.distribution_site ? 1: 0,
        available_evaluations: institution_evaluations,
      }
     //the identifier should always be set to 0 as it will not be used
      return API.post(url, body)
        .then((response) => {
          store.dispatch(enqueueSnackbar(successMessage(institution_id ? snackbarMessages.success.institutions.edit : snackbarMessages.success.institutions.add)))
          return response.data || []
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.institutions.set);
          })
   },
   setEvaluations: function (institution_id, available_evaluations) {
    const url = GLOBALS.ENDPOINTS.INSTITUTION.SET + '/' + institution_id 
    const body =  {available_evaluations: available_evaluations}
     //the identifier should always be set to 0 as it will not be used
      return API.post(url, body)
        .then((response) => {
          store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.institutions.edit)))
          return response.data || []
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.institutions.set);
          })
   },
};

