import { User } from 'firebase/auth';

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SafeUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
}

export interface IAuth {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
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
