import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
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
    authSuccess(state) {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    authError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    signOut(state) {
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