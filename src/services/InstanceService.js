import API from './api'
import {enqueueSnackbar} from "../redux/actions/snackbarActions"
import store from "../redux/store";
import {errorMessage, successMessage} from "./alertMessages"
import snackbarMessages from "./snackbarMessages"
import GLOBALS from "./GLOBALS";
import {handleError} from "./handleError";

export const InstanceService = {

   get: function (institution_id) {
      return API.post(GLOBALS.ENDPOINTS.INSTANCE.LIST+ '/' + institution_id)
        .then((response) => {
          return Object.values(response.data.data) || []
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.get);
          })
   },
  list: function () {
      return API.post(GLOBALS.ENDPOINTS.INSTANCE.LIST+ '/0')
        .then((response) => {
          return Object.values(response?.data?.data) || []
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.get);
          })
   },
  get_version_list: function () {
     return API.post(GLOBALS.ENDPOINTS.INSTANCE.GET_VERSION_LIST+ '/0')
        .then((response) => {
          return response?.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.get_version_list);
          })
  },

  get_product: function (institution_id, instance_id) {
      return API.post(GLOBALS.ENDPOINTS.INSTANCE.GET_PRODUCT+ '/' + institution_id + '.' + instance_id)
        .then((response) => {
          return response?.data?.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.get_product);
          })
   },

  set_product: function (institution_id, instance_id, data) {
      return API.post(GLOBALS.ENDPOINTS.INSTANCE.SET_PRODUCT+ '/' + institution_id + '.' + instance_id, data)
        .then((response) => {
          store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.instances.edit)))
          return response?.data?.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.update);
          })
   },

  update: function (data) {
    //the identifier should always be set to 0 as it will not be used
      return API.post(GLOBALS.ENDPOINTS.INSTANCE.SET_VERSION+ '/0', data)
        .then((response) => {
          store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.instances.update)))
          return response?.data?.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.update);
          })
   },

  create: function (institution_id) {
      return API.post(GLOBALS.ENDPOINTS.INSTANCE.CREATE_PRODUCT + '/' + institution_id + '?et-key=varjo')
        .then((response) => {
          response?.data?.data?.mail_notification_failed !== '' ?
            store.dispatch(enqueueSnackbar(errorMessage(response.data.mail_notification_failed)))
            :
            store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.instances.create)))
          return response?.data?.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.create);
            return error?.response?.data
          })
   },

  liberate_product: function (institution_id, instance_id) {
      return API.post(GLOBALS.ENDPOINTS.INSTANCE.LIBERATE_PRODUCT+ '/' + institution_id + '.' + instance_id)
        .then((response) => {
          store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.instances.liberate)))
          return response?.data?.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.liberate);
          })
   },

  get_all_std_string: function () {
    //the identifier should always be set to 0 as it will not be used
    return API.post(GLOBALS.ENDPOINTS.INSTANCE.GET_ALL_STD + '/0')
      .then((response) => {
        return response.data.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.get_product);
          })
  },
  set_std_string: function (type, value) {
    //the identifier should always be set to 0 as it will not be used
    return API.post(GLOBALS.ENDPOINTS.INSTANCE.SET_STD_STRING + '/0', {
      type: type, value: value})
      .then((response) => {
        return response.data.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.get);
          })
  },
  password_recovery: function (institution_id, instance_id) {
    return API.post(GLOBALS.ENDPOINTS.INSTANCE.PASSWORD_RECOVERY + `/${institution_id}?instance=${instance_id}`)
      .then((response) => {
        return response.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.get);
          })
  },
  set_hmd_sn: function (institution_id, instance_id, hmd_sn) { 
    return API.post(GLOBALS.ENDPOINTS.INSTANCE.SET_HMD_SN + `/${institution_id}.${instance_id}?sn=${hmd_sn}`)
      .then((response) => {
        store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.instances.edit)))
        return response.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.get);
          })
  },
  get_hidden_studies: function (institution_id, instance_id) {
    return API.post(GLOBALS.ENDPOINTS.INSTANCE.GET_HIDDEN_STUDIES + `/${instance_id}?institution=${institution_id}`)
      .then((response) => {
        return response.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.get);
          })
  },
  set_hidden_studies: function (institution_id, instance_id, list) {
    return API.post(GLOBALS.ENDPOINTS.INSTANCE.SET_HIDDEN_STUDIES + `/${instance_id}?institution=${institution_id}`,
     {hide_studies: list})
      .then((response) => {
        store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.instances.edit)))
        return response.data
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.instances.get);
          })
  }
};

