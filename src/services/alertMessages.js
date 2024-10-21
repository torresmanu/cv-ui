import {closeSnackbar} from "../redux/actions/snackbarActions";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import store from "../redux/store";


export const deleteSuccessMessage = { open: true, variant: 'success', message: 'Eliminado/s con éxito'}
//export const passwordMismatchMessage = { open: true, variant: 'warning', message: 'Verifique que la contraseña y la confirmación coincidan'}
export const sentEmailMessage = { open: true, variant: 'success', message: 'Se envió un mail a la dirección indicada'}


export function successMessage(item_message) {
    return{
        open: true,
        message: `${item_message}`,
        options:{
            variant: 'success',
            autoHideDuration: 12000,
            key: new Date().getTime(),
            action: key => (
                <IconButton key="close" aria-label="close" color="inherit" onClick={() => store.dispatch(closeSnackbar(key))}>
                  <CloseIcon />
                </IconButton>
            ),
        }
    }
}

export function errorMessage(item_message) {
    return{
        open: true,
        message: `${item_message}`,
        options:{
            variant: 'error',
            autoHideDuration: 12000,
            key: new Date().getTime(),
            action: key => (
                <IconButton key="close" aria-label="close" color="inherit" onClick={() => store.dispatch(closeSnackbar(key))}>
                  <CloseIcon />
                </IconButton>
            ),
        }
    }
}

export function warningMessage(item_message) {
        return{
        open: true,
        message: `${item_message}`,
        options:{
            variant: 'warning',
            autoHideDuration: 12000,
            key: new Date().getTime(),
            action: key => (
                <IconButton key="close" aria-label="close" color="inherit" onClick={() => store.dispatch(closeSnackbar(key))}>
                  <CloseIcon />
                </IconButton>
            ),
        }
    }
}
