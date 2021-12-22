import { LOAD_PAYMENTS, REIMBURSE } from 'store/constants';
import { paymentService } from 'services';

export function loadPayments(dispatch) {
  return (token) => paymentService.loadPayments(token).then((result) => {
    dispatch({ type: LOAD_PAYMENTS, playload: result.data });
  });
}

export function reimburse(dispatch) {
  return (token, data) => paymentService.reimburse(token, data).then((result) => {
    console.log(result);
    dispatch({ type: REIMBURSE, playload: result.data });
  });
}
