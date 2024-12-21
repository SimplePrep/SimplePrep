import { Dispatch } from 'redux';
import { auth } from '../firebaseConfig';
import { FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  getIdToken,
} from 'firebase/auth';
import { signOut as firebaseSignOut } from 'firebase/auth';
import axios, {AxiosError} from 'axios';
import { AppThunk, LoginFormValues, UserFormValues } from '../types';
import { authLoading, authSuccess, authError, signOut as signOutAction, clearError } from '../reducers/authReducer';

interface ServerErrorResponse {
  message: string;
}

type NetworkError = {
  type: 'network';
  message: string;
};

type ValidationError = {
  type: 'validation';
  field: string;
  message: string;
};

type AuthenticationError = {
  type: 'authentication';
  code: string;
  message: string;
};

type ServerError = {
  type: 'server';
  status: number;
  message: string;
};

type AppError = NetworkError | ValidationError | AuthenticationError | ServerError;


// Error mapping function
const getErrorMessage = (error: unknown): AppError => {
  // Handle Firebase Authentication Errors
  if (error instanceof FirebaseError) {
    switch (error.code) {
      // Authentication errors
      case 'auth/invalid-email':
        return {
          type: 'validation',
          field: 'email',
          message: 'Please enter a valid email address.',
        };
      case 'auth/user-disabled':
        return {
          type: 'authentication',
          code: error.code,
          message: 'This account has been disabled. Please contact support.',
        };
      case 'auth/user-not-found':
        return {
          type: 'authentication',
          code: error.code,
          message: 'No account found with this email. Please check your email or sign up.',
        };
      case 'auth/wrong-password':
        return {
          type: 'validation',
          field: 'password',
          message: 'Incorrect password. Please try again or reset your password.',
        };
      case 'auth/email-already-in-use':
        return {
          type: 'validation',
          field: 'email',
          message: 'An account already exists with this email. Please sign in instead.',
        };
      case 'auth/weak-password':
        return {
          type: 'validation',
          field: 'password',
          message: 'Password must be at least 6 characters long and contain a mix of letters and numbers.',
        };
      case 'auth/too-many-requests':
        return {
          type: 'authentication',
          code: error.code,
          message: 'Too many failed attempts. Please try again later or reset your password.',
        };
      case 'auth/popup-closed-by-user':
        return {
          type: 'authentication',
          code: error.code,
          message: 'Sign-in popup was closed. Please try again.',
        };
      case 'auth/operation-not-allowed':
        return {
          type: 'authentication',
          code: error.code,
          message: 'This sign-in method is not enabled. Please contact support.',
        };
      case 'auth/network-request-failed':
        return {
          type: 'network',
          message: 'Unable to connect to authentication service. Please check your internet connection.',
        };
      case 'auth/invalid-verification-code':
        return {
          type: 'validation',
          field: 'verificationCode',
          message: 'The verification code is invalid. Please try again.',
        };
      case 'auth/invalid-verification-id':
        return {
          type: 'validation',
          field: 'verificationId',
          message: 'The verification session has expired. Please request a new code.',
        };
      default:
        return {
          type: 'authentication',
          code: error.code,
          message: `Authentication error: ${error.message}`,
        };
    }
  }

  // Handle other error types (e.g., Axios/Network Errors)
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ServerErrorResponse>;
    if (!axiosError.response) {
      return {
        type: 'network',
        message: 'Unable to connect to the server. Please check your internet connection.',
      };
    }
    return {
      type: 'server',
      status: axiosError.response.status,
      message: axiosError.response.data?.message || 'Server error occurred. Please try again.',
    };
  }

  // Default case: Unexpected errors
  return {
    type: 'server',
    status: 500,
    message: 'An unexpected error occurred. Please try again or contact support.',
  };
};


export const SignIn = (creds: LoginFormValues, onSuccess: () => void) => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    const userCredential = await signInWithEmailAndPassword(auth, creds.email, creds.password);
    const user = userCredential.user;

    if (user && !user.emailVerified) {
      throw new Error('Please verify your email address before logging in.');
    }

    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token); // Save token for future API calls
      dispatch(authSuccess());
      onSuccess();
    }
  } catch (error) {
    const appError = getErrorMessage(error); // Returns AppError
    const errorMessage = appError.message; // Extract the error message string
    dispatch(authError(errorMessage)); // Pass the message string to authError
  }
};


export const GoogleSignIn = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' }); // Ensures Google prompts account selection.

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user) {
      throw new Error('Google sign-in failed. No user information received.');
    }

    const token = await getIdToken(user); // Fetch Firebase ID token
    console.log('Firebase Token:', token);

    // Check if the user exists in your backend
    const response = await axios.post('https://beta-simpleprep.com/auth/user/check-user', {
      firebase_uid: user.uid,
      email: user.email,
    });

    const userData = {
      firebase_uid: user.uid,
      email: user.email,
      first_name: user.displayName?.split(' ')[0] || 'Default',
      last_name: user.displayName?.split(' ')[1] || 'User',
    };

    // Update or create user based on backend response
    if (response.data.exists) {
      await axios.put('https://beta-simpleprep.com/auth/user/update-user', userData);
    } else {
      await axios.post('https://beta-simpleprep.com/auth/user/signup', {
        ...userData,
        subscription_type: 'free', // Default subscription type for new users
      });
    }

    // Check if the user's email is verified
    if (user.emailVerified) {
      dispatch(authSuccess()); // Pass token if needed in your reducer
    } else {
      dispatch(authError('Please verify your email before logging in.'));
    }
  } catch (error) {
    const appError = getErrorMessage(error); // Process the error into AppError
    dispatch(authError(appError.message)); // Pass only the message string to authError
  }
};

export const SignUp = (creds: UserFormValues) => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, creds.email, creds.password);
    const user = userCredential.user;

    if (user) {
      // Send email verification
      await sendEmailVerification(user, { url: 'https://beta-simpleprep.com' });

      // Prepare user data for backend
      const userData = {
        firebase_uid: user.uid,
        email: user.email,
        first_name: creds.firstName,
        last_name: creds.lastName,
        subscription_type: 'free', // Default subscription type
      };

      // Create user in backend
      await axios.post('https://beta-simpleprep.com/auth/user/signup', userData);

      dispatch(authSuccess());
    }
  } catch (error) {
    // Process error into AppError object
    const appError = getErrorMessage(error); 
    const errorMessage = appError.message; // Extract the message string
    dispatch(authError(errorMessage)); // Pass only the message string to authError
  }
};


export const SignOut = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    await firebaseSignOut(auth);
    dispatch(signOutAction());
  } catch (error) {
    const appError = getErrorMessage(error); // Process the error
    const errorMessage = appError.message; // Extract the message string
    dispatch(authError(errorMessage)); // Pass the message string to authError
  }
};

export const SendResetPasswordEmail = (email: string) => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    await sendPasswordResetEmail(auth, email);
    dispatch(authSuccess());
  } catch (error) {
    const appError = getErrorMessage(error); // Process the error
    const errorMessage = appError.message; // Extract the message string
    dispatch(authError(errorMessage)); // Pass the message string to authError
  }
};


export const checkAuthenticated = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        dispatch(authSuccess());
      } else {
        dispatch(signOutAction());
      }
    });

    // Ensure the listener is unsubscribed when no longer needed
    return () => unsubscribe();
  } catch (error) {
    const appError = getErrorMessage(error); // Optional: Process the error
    dispatch(authError(appError.message || 'Failed to check authentication status.'));
  }
};


export const loadUser = () => (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        // Optional: Get Firebase token or user data if needed
        const token = await user.getIdToken(true); // Force token refresh
        localStorage.setItem('authToken', token);

        dispatch(authSuccess());
      } else {
        dispatch(signOutAction());
      }
    });

    // Cleanup listener
    return () => unsubscribe();
  } catch (error) {
    const appError = getErrorMessage(error); // Optional: Process the error
    dispatch(authError(appError.message || 'Failed to load user.'));
  }
};


export const clearAuthError = () => (dispatch: Dispatch) => {
  dispatch(clearError());
};