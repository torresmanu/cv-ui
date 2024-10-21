import store from "../redux/store";
import {enqueueSnackbar} from "../redux/actions/snackbarActions";
import {errorMessage} from "./alertMessages";
import {AuthService} from "./AuthService";
import {redirectTo} from "../routes/functions";

export function handleError(error, message) {
    if (error?.response?.data?.message?.includes("Failed in authentication") || error?.response?.data?.message?.includes("Bad permissions")){
      AuthService.logout();
      redirectTo('/auth/sign-in')
      store.dispatch(enqueueSnackbar(errorMessage("Failed in authentication. Please Logout")))
    }
    else if(error?.response?.data?.message?.includes("Access denied")){
      store.dispatch(enqueueSnackbar(errorMessage("Access Denied")))
      return error.response
    }
    else{
      store.dispatch(enqueueSnackbar(errorMessage(message || error?.response?.data?.message)))
    }
}