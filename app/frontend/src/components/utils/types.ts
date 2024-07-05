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

export interface Section {
  id: number;
  slug: string;
  title: string;
  description?: string;
  content?: string;
}

export interface Chapter {
  id: number;
  title: string;
  order: number;
  sections: Section[];
}

export interface Tutorial {
  id: number;
  title: string;
  chapters: Chapter[];
  sections: Section[]; // Add this line to include sections directly under Tutorial if needed
}

export interface Module {
    id: number;
    test: number;
    title: string;
    description: string;
    num_questions: number;
    created_at: string;
    updated_at: string;
};