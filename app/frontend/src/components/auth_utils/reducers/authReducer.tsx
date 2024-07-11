import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  theme: 'dark' | 'light';
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  theme: (localStorage.getItem('theme') as 'dark' | 'light') || 'light',
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
      state.theme = 'light';
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
    setTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { authLoading, authSuccess, authError, signOut, clearError, setTheme} = authSlice.actions;
export default authSlice.reducer;