import { User } from 'firebase/auth';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../store';

// Define ThunkAction type
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export interface UserDetails {
  id: number;
  email: string;
  first_name: string;
  last_name:string;
  subscription_type: string;
  firebase_uid: string;
  created_at: string;
  updated_at: string;
}

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
  order: number;
  title: string;
  description: string;
  content: string;
  chapter: number; // References the Chapter ID that this section belongs to
}

export interface Tutorial {
  id: number;
  title: string;
  description: string;
  duration: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface Chapter {
  id: number;
  title: string;
  order: number;
  tutorial: number;
  description: string;
  lessons: number;
  practices: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image_path: string;
  requiredSubscription: 'free' | 'nova+' | 'nova pro';
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


// types.ts
export interface Question {
  id: number;
  test: number;
  model: string;
  section: string;
  title: string;
  context: string;
  query: string;
  graph_img: string;
  option_A: string;
  option_B: string;
  option_C: string;
  option_D: string;
  explanation: string;
  correct_answer: string;
  likes: number;
  dislikes: number;
  created_at: string;
}

export interface TestResult {
  id: number;
  score: number;
  created_at: string;
  updated_at: string;
  test_model: {
    id: number;
    title: string;
  };
}



export interface UserAnswer {
  id: number;
  test_result: number;
  question: number;
  selected_option: string;
}

export interface SectionData {
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
}

export interface ModuleData {
  sections: Record<string, SectionData>;
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
}



export interface TestReportData {
modules: {
  [key: string]: {
    sections: {
      [key: string]: {
        total_questions: number;
        correct_answers: number;
        incorrect_answers: number;
      };
    };
    total_questions: number;
    correct_answers: number;
    incorrect_answers: number;
  };
};
suggestions: string[];
correct_answers: number;
total_questions: number;
incorrect_answers: number;
}

export interface TestReport {
id: number;
test_result: number;
report_data: TestReportData;
created_at: string;
updated_at: string;
}

export interface DetailedTestResult extends TestResult {
questions?: Question[];
user_answers?: UserAnswer[];
report?: TestReport;
}

export interface Reply {
id: number;
author: string;
author_uid: string;
content: string;
updated_at: string;
}

export interface Post {
id: number;
title: string;
content: string;
author: string;
author_uid: string;
views: number;
likes: number;
created_at: string;
updated_at: string;
replies: Reply[];
}

export interface SupportFormData {
  name: string;
  email: string;
  message: string;
  files?: FileList | null;
}