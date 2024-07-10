import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth_utils/reducers/authReducer';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import dataReducer from './auth_utils/reducers/dataReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'data'], // Add the reducers you want to persist here
  };

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check for redux-persist
      }),
  });
  

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

