import GLOBALS from './GLOBALS'
import {Token} from "./common";
import store from "../redux/store";
import {setAuthError, setAuthLoading, setSignedIn} from "../redux/actions/authActions";
import {redirectTo} from "../routes/functions";
import {Urls} from "./urls";
import API from "./api";
import {enqueueSnackbar} from "../redux/actions/snackbarActions";
import {errorMessage, successMessage} from "./alertMessages";
import snackbarMessages from "./snackbarMessages";
import {PortalUsersService} from "./PortalUsersService";

// Function to safely encode a string containing non-ASCII characters
function safeBase64Encode(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const base64 = btoa(String.fromCharCode.apply(null, data));
  return base64;
}

export const AuthService = {

  attemptLogin: function () {
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    AuthService.login(username,password);
  },

  login: function (username,password) {
    store.dispatch(setAuthLoading())
    let xhr = new XMLHttpRequest();
    xhr.open('POST', Urls.api, true);

    xhr.setRequestHeader(GLOBALS.HEADERS_NAMES.AUTH_TYPE,
                         GLOBALS.HEADERS_VALUES.LOGIN);

    xhr.setRequestHeader(GLOBALS.HEADERS_NAMES.AUTHORIZATION,
                         GLOBALS.HEADERS_VALUES.BASIC + " " + safeBase64Encode(`${username}:${password}`));

    xhr.setRequestHeader(GLOBALS.HEADERS_NAMES.LOGIN_TYPE,
                         "4");

    xhr.responseType = "json";

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
           if (this.response?.message === "OK"){
              Token.setToken(this.response.data["token"]);
              sessionStorage.setItem(GLOBALS.SESSION_KEYS.USER,username);
              sessionStorage.setItem(GLOBALS.SESSION_KEYS.USER_ID,this.response.data["id"]);
              sessionStorage.setItem(GLOBALS.SESSION_KEYS.USER_FNAME,this.response.data["fname"]);
              sessionStorage.setItem(GLOBALS.SESSION_KEYS.USER_LNAME,this.response.data["lname"]);

             PortalUsersService.setInstitution(
               0,
               this.response.data["id"],
               this.response.data["token"]
             ).then((r)=>{
                 store.dispatch(setSignedIn())
                 redirectTo('/')
             })
           }
           else{
              store.dispatch(setAuthError(this.response))
              throw this.response
           }
        }
    };

    xhr.send(null);

  },
  logout: function () {
    sessionStorage.clear();
    let endpoint = GLOBALS.ENDPOINTS.PORTAL_USER.LOGOUT + "/0" // the identifier here, is ignored.
    return API.post(endpoint).then((response) => {
      return response
    })
        .catch((error) => {
            store.dispatch(enqueueSnackbar(errorMessage(snackbarMessages.error.auth.logout)))
        })
    },
  receivedInstitutionInfo: function(data){

    //console.log(JSON.stringify(data));

    if (data.message !== "OK"){
        document.getElementById("error_message").innerHTML = data.message;
       // WaitDialog.close();
        return;
    }

    let ilist = data.data;
    let inst_list = [];
    for (let i = 0; i < ilist.length; i++){
        let inst = {};
        inst[GLOBALS.INST_LIST.NAME] =  ilist[i]["institution_name"];
        inst[GLOBALS.INST_LIST.ID]   =  ilist[i]["keyid"];
        inst_list.push(inst);
    }

    sessionStorage.setItem(GLOBALS.SESSION_KEYS.USER_INSTITUTIONS,JSON.stringify(inst_list));

    // Making sure we are home.
   // WaitDialog.close();
    window.location.href = "index.html"

  },
  modifyAccount: function(params){
    let endpoint = GLOBALS.ENDPOINTS.PORTAL_USER.MODIFY_OWN + "/0" ;

    //filtering params to send only updated ones
    const filtered = Object.fromEntries(Object.entries(params).filter(([k,v]) => v!==null));

    return API.post(endpoint, filtered).then((response) => {
      store.dispatch(enqueueSnackbar(successMessage(snackbarMessages.success.account.post)));
      if(filtered['name']){
        sessionStorage.setItem(GLOBALS.SESSION_KEYS.USER_FNAME,filtered['name']);
      }
      if(filtered['lastname']){
        sessionStorage.setItem(GLOBALS.SESSION_KEYS.USER_LNAME,filtered['lastname']);
      }
      redirectTo("/")
      return response
    }).catch((error) => {
        store.dispatch(enqueueSnackbar(errorMessage(snackbarMessages.error.account.post)))
      })
  },
  sendResetPasswordEmail: function(email){
    let endpoint = GLOBALS.ENDPOINTS.PORTAL_USER.RESET_PASSWORD + "/" + email;
    return API.post(endpoint).then((response) => {
      return response.data.message
    }).catch((error) => {
      return error.response.data.message
    })
  },
  resetPassword: function(id,token,password){
    let endpoint = GLOBALS.ENDPOINTS.PORTAL_USER.RESET_PASSWORD + "/" + id + "?key=" + token;
    return API.post(endpoint, {password: password}).then((response) => {
      return response.data.message
    }).catch((error) => {
        store.dispatch(enqueueSnackbar(errorMessage(snackbarMessages.error.account.resetPassword)))
        return error.response.data.message
      })
  },
}

