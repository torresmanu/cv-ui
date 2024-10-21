import * as types from '../constants';

export function setFormStatus({model, dirty}) {
  return {
    type: types.SET_FORM_STATUS,
    payload: {
      model,
      dirty
    }
  }
}
