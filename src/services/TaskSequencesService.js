import API from './api'
import {enqueueSnackbar} from "../redux/actions/snackbarActions"
import store from "../redux/store";
import snackbarMessages from "./snackbarMessages"
import GLOBALS from "./GLOBALS";
import {handleError} from "./handleError";
import {successMessage} from "./alertMessages"

export const TaskSequencesService = {

   list: function () {
     //the identifier should always be set to 0 as it will not be used
       return API.post(GLOBALS.ENDPOINTS.TASK_SEQUENCE.LIST + '/0')
         .then((response) => {
           return response.data.data || []
         })
       .catch((error) => {
           handleError(error, snackbarMessages.error.task_sequences.get);
         })
   },
   set: function (id, data) {
       return API.post(GLOBALS.ENDPOINTS.TASK_SEQUENCE.SET + '/' + id, data)
         .then((response) => {
           data.hide === 1 ? store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.task_sequences.delete))) :
                             store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.task_sequences.set)))
           return response.data || []
         })
       .catch((error) => {
         const msg = data.hide === 1 ? snackbarMessages.error.task_sequences.delete : snackbarMessages.error.task_sequences.set
         handleError(error, msg);
         })
   },
   
};

