import * as types from '../constants';

const initial  = {
    notifications: [{ open:false, dismissed: true, variant: 'success', key: '0' }],
 }

export default function reducer(state=initial, action) {
      switch (action.type) {
        case types.ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification,
                    },
                ],
            };

        case types.CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map(notification => (
                    (action.dismissAll || notification.key === action.key)
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                )),
            };

        case types.REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };

    default:
      return state
  }
}
