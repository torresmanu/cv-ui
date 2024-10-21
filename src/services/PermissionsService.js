import API from './api'
import snackbarMessages from "./snackbarMessages"
import GLOBALS from "./GLOBALS";
import {handleError} from "./handleError";
import {enqueueSnackbar} from "../redux/actions/snackbarActions"
import store from "../redux/store";
import {successMessage} from "./alertMessages"

export const PermissionsService = {

   get: function (user_id, institution_id) {
     //the identifier should always be set to 0 as it will not be used
      return API.post(GLOBALS.ENDPOINTS.PORTAL_USER.GET_PERMISSIONS + '/' + user_id + '?institution=' + institution_id)
        .then((response) => {
          return response.data || []
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.permissions.get);
          })
   },
   set: function (user_id, institution_id, data) {
    //the identifier should always be set to 0 as it will not be used
     return API.post(GLOBALS.ENDPOINTS.PORTAL_USER.SET_PERMISSIONS + '/' + user_id + '?institution=' + institution_id, data)
       .then((response) => {
        store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.permissions.set)))
        return response || []
     })
         .catch((error) => {
           handleError(error, snackbarMessages.error.permissions.set);
         })
  },
   list: function (institution_id) {
     //the identifier should always be set to 0 as it will not be used
      return API.post(GLOBALS.ENDPOINTS.PORTAL_USER.LIST_PERMISSIONS + '/' + institution_id)
        .then((response) => {
          return response.data || []
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.permissions.get);
          })
   },
};

