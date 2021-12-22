import { combineReducers } from 'redux';
import { authReducer as auth } from './auth.reducer';
import { paymentReducer as payment } from './payment.reducer';

const rootReducer = combineReducers({
  auth,
  payment,
});

export default rootReducer;
