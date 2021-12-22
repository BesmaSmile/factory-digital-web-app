import { LOGIN } from 'store/constants';

export function authReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.playload.user,
        token: action.playload.token,
      };
    default:
      return state;
  }
}
