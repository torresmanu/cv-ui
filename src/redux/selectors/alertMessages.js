import { createSelector } from 'reselect'

export const setSnackbarSelector = createSelector(
  state => state.alertMessages.snackbar
); 