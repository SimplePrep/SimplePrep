import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Module, Question, UserAnswer } from '../types';

interface DataState {
  questions: Record<string, {
    data: Question[];
    timestamp: number;
    version: number;
  }>;
  modules: Record<string, {
    data: Module[];
    timestamp: number;
    version: number;
  }>;
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
      const { moduleId, questions } = action.payload;
      
      // Increment version if new data is different
      const currentData = state.questions[moduleId]?.data || [];
      const isNewData = JSON.stringify(currentData) !== JSON.stringify(questions);
      
      state.questions[moduleId] = {
        data: questions,
        timestamp: Date.now(),
        version: isNewData 
          ? (state.questions[moduleId]?.version || 0) + 1 
          : (state.questions[moduleId]?.version || 0)
      };
    },
    setModules: (state, action: PayloadAction<{ testId: string; modules: Module[] }>) => {
      const { testId, modules } = action.payload;
      
      // Increment version if new data is different
      const currentData = state.modules[testId]?.data || [];
      const isNewData = JSON.stringify(currentData) !== JSON.stringify(modules);
      
      state.modules[testId] = {
        data: modules,
        timestamp: Date.now(),
        version: isNewData 
          ? (state.modules[testId]?.version || 0) + 1 
          : (state.modules[testId]?.version || 0)
      };
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
    clearUserAnswers: (state, action: PayloadAction<string>) => {
      delete state.userAnswers[action.payload];
    },
    // New action to force a complete refresh
    forceRefreshData: (state) => {
      state.questions = {};
      state.modules = {};
      state.userAnswers = {};
    }
  },
});

export const { 
  setQuestions, 
  setModules, 
  saveUserAnswers, 
  clearQuestions, 
  clearModules, 
  clearUserAnswers,
  forceRefreshData  // New action
} = dataSlice.actions;
export default dataSlice.reducer;