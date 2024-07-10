import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Module, Question, UserAnswer } from '../types';



interface DataState {
  questions: Record<string, Question[]>;
  modules: Record<string, Module[]>;
  userAnswers: Record<string, UserAnswer[]>;
}

const initialState: DataState = {
  questions: {},
  modules: {},
  userAnswers: {},
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<{ moduleId: string; questions: Question[] }>) => {
      state.questions[action.payload.moduleId] = action.payload.questions;
    },
    setModules: (state, action: PayloadAction<{ testId: string; modules: Module[] }>) => {
      state.modules[action.payload.testId] = action.payload.modules;
    },
    saveUserAnswers: (state, action: PayloadAction<{ moduleId: string; answers: UserAnswer[] }>) => {
      state.userAnswers[action.payload.moduleId] = action.payload.answers;
    },
    clearQuestions: (state, action: PayloadAction<string>) => {
      delete state.questions[action.payload];
    },
    clearModules: (state, action: PayloadAction<string>) => {
      delete state.modules[action.payload];
    },
  },
});

export const { setQuestions, setModules, saveUserAnswers, clearQuestions, clearModules } = dataSlice.actions;
export default dataSlice.reducer;
