import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { SafeUser } from '../types';

  interface AuthState {
    user: SafeUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
  }

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLoading(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(state, action: PayloadAction<User | null>) {
        if (action.payload) {
          state.user = {
            uid: action.payload.uid,
            email: action.payload.email,
            displayName: action.payload.displayName,
            emailVerified: action.payload.emailVerified,
            // Add other non-sensitive fields as needed
          };
        } else {
          state.user = null;
        }
        state.isAuthenticated = !!action.payload;
        state.loading = false;
        state.error = null;
      },
    authError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { authLoading, authSuccess, authError, signOut, clearError } = authSlice.actions;

export default authSlice.reducer;
