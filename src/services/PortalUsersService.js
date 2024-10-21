import API from './api'
import { Urls } from './urls'
import {enqueueSnackbar} from "../redux/actions/snackbarActions"
import store from "../redux/store";
import {successMessage} from "./alertMessages"
import snackbarMessages from "./snackbarMessages"
import GLOBALS from "./GLOBALS";
import axios from "axios";
import {handleError} from "./handleError";


export const PortalUsersService = {

    setInstitution: function (id, user_id, token) {
      return axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        responseType: "json",
        headers: {
          "AuthType": GLOBALS.HEADERS_VALUES.PARTNER,
          "Authorization": user_id + ":" + token,
          "LoginType": 4
        }
      }).post(Urls.ApiSetInst + id).then((response) => {
          sessionStorage.setItem(GLOBALS.SESSION_KEYS.PERMISSIONS, JSON.stringify(response.data.data));
          return response.data
        })
            .catch((error) => {
              handleError(error, snackbarMessages.error.portalUsers.set);
            })
    },
    getMasterList: function () {
      //the identifier should always be set to -1 to get master list
        return API.post(GLOBALS.ENDPOINTS.PORTAL_USER.LIST + '/-1')
          .then((response) => {
            return Object.values(response?.data?.data) || []
          })
        .catch((error) => {
            handleError(error, snackbarMessages.error.portalUsers.get);
          })
   },
    get: function (user_id) {
      return API.post(GLOBALS.ENDPOINTS.PORTAL_USER.GET + '/' + user_id)
        .then((response) => {
          return response.data || []
      })
          .catch((error) => {
            handleError(error, snackbarMessages.error.portalUsers.get);
          })
    },

    search: function (email) {
       return API.post(GLOBALS.ENDPOINTS.PORTAL_USER.SEARCH + '/0',
         {email: email})
         .then((response) => {
           return response.data || []
       })
           .catch((error) => {
             handleError(error, snackbarMessages.error.portalUsers.get);
           })
     },

    link: function (user_id, institution_id, link) {
      const url_params= '/' + user_id + '?institution=' + institution_id + '&link='+ link;
      return API.post(GLOBALS.ENDPOINTS.PORTAL_USER.LINK + url_params )
        .then((response) => {
          link === 1 ? store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.portalUsers.link))) :
          store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.portalUsers.unlink)))
          return response.data || []
      })
          .catch((error) => {
            link === 1 ? handleError(error, snackbarMessages.error.portalUsers.link)
            : handleError(error, snackbarMessages.error.portalUsers.unlink)
          })
    },

    set: function (user_id, data, institution_id, role) {
      const url = user_id ? '/' + user_id : '/0'
      const body = user_id ? {
        name: data.name,
        lastname: data.lastname,
        company: data.company,
        user_role: role,
      } :
      {
        name: data.name,
        lastname: data.lastname,
        passwd: data.password,
        email: data.email,
        company: data.company,
        institution_id: institution_id,
        user_role: role,
        force_enable: true       //In the future it would be editable by front end user
      }
     //the identifier should always be set to 0 when creating a new user
      return API.post(GLOBALS.ENDPOINTS.PORTAL_USER.SET + url, body)
        .then((response) => {
          user_id ? store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.portalUsers.edit)))
          : store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.portalUsers.create)))
          return response.data || []
      })
          .catch((error) => {
             const message = user_id ? snackbarMessages.error.portalUsers.edit : snackbarMessages.error.portalUsers.create
             handleError(error, message);
          })
    },
    enable: function (user_id, enable) {
      return API.post(GLOBALS.ENDPOINTS.PORTAL_USER.SET + '/' + user_id, {enabled: enable})
        .then((response) => {
          store.dispatch(
            enqueueSnackbar(
              successMessage(
                enable ? snackbarMessages.success.portalUsers.enable : snackbarMessages.success.portalUsers.disable
                )))
          return response.data || []
      })
          .catch((error) => {
            handleError(
              error,
              enable ? snackbarMessages.error.portalUsers.enable : snackbarMessages.error.portalUsers.disable);
          })
    },
};

