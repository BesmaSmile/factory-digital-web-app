import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from 'store/reducers';

const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persisteReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persisteReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

export const persistor = persistStore(store);
