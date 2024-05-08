import React, { createContext } from 'react';
import { IAuth } from './types';
import { LoginFormValues, UserFormValues } from './AuthServices';

// Ensure that defaultAuth includes all properties defined in the IAuth interface
const defaultAuth: IAuth = {
    user: null,
    loading: false,  // Only one loading state
    isAuthenticated: false,
    error: "", 
    SignIn: async (creds: LoginFormValues, onSuccess: () => void) => {},
    SignUp: async (creds: UserFormValues) => {},
    SignOut: async () => {},
    GoogleSignIn: async () => {},
    SendResetPasswordEmail: async () => {},
    checkAuthenticated: async () => {},
    loadUser: async () => {},
  };
// Create the AuthContext with the updated defaultAuth object
const AuthContext = createContext<IAuth>(defaultAuth);

export default AuthContext;
