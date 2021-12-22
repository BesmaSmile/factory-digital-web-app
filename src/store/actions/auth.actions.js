import { LOGIN } from 'store/constants';
import { authService } from 'services';

export function login(dispatch) {
  return (params) => authService.login(params).then((result) => {
    dispatch({ type: LOGIN, playload: result.data });
  });
}
