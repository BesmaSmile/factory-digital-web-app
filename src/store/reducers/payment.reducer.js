import { LOAD_PAYMENTS, REIMBURSE } from 'store/constants';

export function paymentReducer(state = { }, action) {
  switch (action.type) {
    case LOAD_PAYMENTS:
      return {
        ...state,
        payments: action.playload,
      };
    case REIMBURSE:
      return {
        ...state,
        payments: state.payments.map(
          (payment) => (payment._id === action.playload._id ? action.playload : payment),
        ),
      };
    default:
      return state;
  }
}
