import store from "../redux/store";
import {enqueueSnackbar} from "../redux/actions/snackbarActions";
import { successMessage, errorMessage } from "../services/alertMessages";

export const copyJSONToClipboard = (jsonObject) => {
    const jsonString = JSON.stringify(jsonObject, null, 2); // Convert JSON object to a formatted string
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        // Text successfully copied to clipboard
        console.log('JSON object copied to clipboard:', jsonString);
        store.dispatch(enqueueSnackbar(successMessage('JSON object copied to clipboard')))
      })
      .catch((error) => {
        // Unable to copy text to clipboard
        console.error('Failed to copy JSON object to clipboard:', error);
        store.dispatch(enqueueSnackbar(errorMessage('Failed to copy JSON object to clipboard')))
      });
  };

  