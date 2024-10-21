import API from './api';
import GLOBALS from "./GLOBALS";

const logout_url = '/auth/logout';
const change_password_url = '/auth/';
const reset_password_url = '/auth/password';
const register_url = '/auth/register';



export const buildUrlFor = model => `${API.defaults.baseURL}/${model}/`;

export const Urls = {
    api: API.defaults.baseURL,

    ApiLogIn: API.defaults.baseURL,
    ApiLogOut: API.defaults.baseURL + logout_url,
    ApiChangePassword: API.defaults.baseURL + change_password_url,
    ApiResetPassword: API.defaults.baseURL + reset_password_url,
    ApiRegister: API.defaults.baseURL + register_url,

    ApiInstitution: GLOBALS.ENDPOINTS.INSTITUTION.LIST + "/" + sessionStorage.getItem(GLOBALS.SESSION_KEYS.USER_ID),
    ApiSetInst: GLOBALS.ENDPOINTS.PORTAL_USER.SET_INST + "/"
}

API.interceptors.response.use(
  function (response) {
    // Any 2xx status code
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);


// dev api: ' https://devapi.viewmind.net/'
// prod api: 'https://eu-api.viewmind.ai/'
