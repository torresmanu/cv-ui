import * as types from '../constants';

export function setSignedIn() {
  return {
    type: types.SET_SIGNED_IN
  }
}

export function setSignedOut() {
  localStorage.removeItem('loginToken');
  localStorage.removeItem('loginUsername');
  return {
    type: types.SET_SIGNED_OUT
  }
}

export function setResetPasswordDone() {
  return {
    type: types.SET_RESET_PASSWORD_DONE
  }
}

export function setNewPasswordDone() {
  return {
    type: types.SET_NEW_PASSWORD_DONE
  }
}

export function setAuthLoading() {
  return {
    type: types.SET_AUTH_LOADING
  }
}

export function setAuthError(error) {
  return {
    type: types.SET_AUTH_ERROR,
    payload: error
  }
}
