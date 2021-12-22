import { combineReducers } from 'redux';
import { authReducer as auth } from './auth.reducer';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
