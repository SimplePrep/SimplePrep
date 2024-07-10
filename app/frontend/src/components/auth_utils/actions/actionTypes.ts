import { createAction } from '@reduxjs/toolkit';

export const setQuestions = createAction('SET_QUESTIONS');
export const setModules = createAction('SET_MODULES');

export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const SIGN_OUT = 'SIGN_OUT';