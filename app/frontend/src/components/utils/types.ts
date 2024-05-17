import { User } from 'firebase/auth';
import { LoginFormValues, UserFormValues } from './AuthServices';

export interface IAuth {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;  // Allow `null` for the error property
  SignIn: (creds: LoginFormValues, onSuccess: () => void) => Promise<void>;
  SignUp: (creds: UserFormValues) => Promise<void>;
  SignOut: () => Promise<void>;
  GoogleSignIn: () => Promise<void>;
  SendResetPasswordEmail: (email: string) => Promise<void>; 
  checkAuthenticated: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export interface UserDetails {
  email: string;
  first_name: string;
  last_name: string;
  firebase_uid: string;
}