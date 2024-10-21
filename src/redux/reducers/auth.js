import * as types from '../constants';
import {Token} from "../../services/common";

const isSignedIn = () => (
   Token.getToken() &&
   new Date() < new Date(sessionStorage.getItem('expiration_date'))
)

const initial = { loading: false,
                  signedIn: isSignedIn(),
                  // In case of being signed out, clears login data so that Authorization Header, with old token, is not sent in sign-in request
                  error: null,
                  successMessage: null
              };

export default function reducer(state=initial, actions) {
  switch (actions.type) {

    case types.SET_SIGNED_IN:
      return {
        ...state,
        signedIn: true,
        loading: false,
        error: null,
        successMessage: null
      }

    case types.SET_SIGNED_OUT:
      return {
        ...state,
        signedIn: false
      }

    case types.SET_RESET_PASSWORD_DONE:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: 'Se envió un mail con instrucciones para reestablecer la contraseña.'
      }

    case types.SET_NEW_PASSWORD_DONE:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: 'La contraseña se cambió exitosamente.'
      }

    case types.SET_AUTH_LOADING:
      return {
        ...state,
        loading: true
      }

    case types.SET_AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: actions.payload,
        successMessage: null
      }

    default:
      return state
  }
}
