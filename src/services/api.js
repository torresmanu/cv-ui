import axios from 'axios';
import GLOBALS from "./GLOBALS";

let auth_value = sessionStorage.getItem(GLOBALS.SESSION_KEYS.USER_ID)
                + ":" + sessionStorage.getItem(GLOBALS.SESSION_KEYS.TOKEN);

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
  headers: {
    "AuthType": GLOBALS.HEADERS_VALUES.PARTNER,
    "Authorization": auth_value,
    "LoginType": 4
  }
});
// dev api: 'https://devapi.viewmind.net/'
// prod api: 'https://eu-api.viewmind.ai/'
export default API;
