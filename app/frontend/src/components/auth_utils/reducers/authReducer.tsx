import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAnswer } from '../../Dashboard/types';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userAnswers: Record<string, UserAnswer[]>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  userAnswers: {},
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
    saveUserAnswers: (state, action: PayloadAction<{ moduleId: string; answers: UserAnswer[] }>) => {
      state.userAnswers[action.payload.moduleId] = action.payload.answers;
    },
  },
});

export const { authLoading, authSuccess, authError, signOut, clearError, saveUserAnswers } = authSlice.actions;
export default authSlice.reducer;