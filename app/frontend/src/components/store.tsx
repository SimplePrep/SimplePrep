import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth_utils/reducers/authReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import dataReducer from './auth_utils/reducers/dataReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'data'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
