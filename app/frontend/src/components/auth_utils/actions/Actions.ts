import { Dispatch } from 'redux';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  getIdToken,
  AuthError,
  User,
} from 'firebase/auth';
import { signOut as firebaseSignOut } from 'firebase/auth';
import axios, { AxiosError } from 'axios';
import { AppThunk, LoginFormValues, UserFormValues } from '../types';
import { 
  authLoading, 
  authSuccess, 
  authError, 
  signOut as signOutAction, 
  clearError 
} from '../reducers/authReducer';


// Define specific error types
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

// Comprehensive error mapping
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

  // Handle Axios/Network Errors
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<NetworkError>;
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

  // Handle unexpected errors
  return {
    type: 'server',
    status: 500,
    message: 'An unexpected error occurred. Please try again or contact support.',
  };
};

// Helper function to validate user state
const validateUserState = (user: User | null): void => {
  if (!user) {
    throw new Error('User state is null after authentication');
  }
  if (!user.email) {
    throw new Error('User email is missing after authentication');
  }
};

// Helper function for API calls
const handleApiCall = async (
  apiCall: () => Promise<any>,
  errorContext: string
): Promise<any> => {
  try {
    return await apiCall();
  } catch (error) {
    console.error(`API Error (${errorContext}):`, error);
    throw error;
  }
};

export const SignIn = (creds: LoginFormValues, onSuccess: () => void) => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );
    
    validateUserState(userCredential.user);

    if (!userCredential.user.emailVerified) {
      await sendEmailVerification(userCredential.user);
      throw new Error('Please verify your email address. A new verification email has been sent.');
    }

    dispatch(authSuccess());
    onSuccess();
  } catch (error) {
    const appError = getErrorMessage(error);
    dispatch(authError(appError.message));
  }
};

export const GoogleSignIn = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const result = await signInWithPopup(auth, provider);
    validateUserState(result.user);

    const token = await getIdToken(result.user);

    // Check if user exists in our backend
    const userCheck = await handleApiCall(
      () => axios.post('https://beta-simpleprep.com/auth/user/check-user', {
        firebase_uid: result.user.uid,
        email: result.user.email,
      }),
      'user-check'
    );

    const userData = {
      firebase_uid: result.user.uid,
      email: result.user.email,
      first_name: result.user.displayName?.split(' ')[0] || 'Default',
      last_name: result.user.displayName?.split(' ')[1] || 'User',
    };

    // Update or create user in backend
    if (userCheck.data.exists) {
      await handleApiCall(
        () => axios.put('https://beta-simpleprep.com/auth/user/update-user', userData),
        'update-user'
      );
    } else {
      await handleApiCall(
        () => axios.post('https://beta-simpleprep.com/auth/user/signup', userData),
        'create-user'
      );
    }

    dispatch(authSuccess());
  } catch (error) {
    const appError = getErrorMessage(error);
    dispatch(authError(appError.message));
  }
};

export const SignUp = (creds: UserFormValues) => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    // Validate password strength
    if (creds.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      creds.email, 
      creds.password
    );
    
    validateUserState(userCredential.user);

    // Send verification email
    await sendEmailVerification(userCredential.user, { 
      url: "https://beta-simpleprep.com/email-verified"
    });

    const userData = {
      firebase_uid: userCredential.user.uid,
      email: userCredential.user.email,
      first_name: creds.firstName,
      last_name: creds.lastName,
      subscription_type: "free",
    };

    // Create user in backend
    await handleApiCall(
      () => axios.post('https://beta-simpleprep.com/auth/user/signup', userData),
      'create-user'
    );

    dispatch(authSuccess());
    dispatch(authError('Please check your email to verify your account before signing in.'));
  } catch (error) {
    const appError = getErrorMessage(error);
    dispatch(authError(appError.message));
  }
};

export const SignOut = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    await firebaseSignOut(auth);
    
    // Clear any local storage or session data
    localStorage.removeItem('user-preferences');
    sessionStorage.clear();
    
    dispatch(signOutAction());
  } catch (error) {
    const appError = getErrorMessage(error);
    dispatch(authError(appError.message));
    
    // Even if there's an error, we should still clear the local state
    dispatch(signOutAction());
  }
};

export const SendResetPasswordEmail = (email: string) => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    await sendPasswordResetEmail(auth, email, {
      url: 'https://beta-simpleprep.com/login',
      handleCodeInApp: true,
    });
    
    dispatch(authSuccess());
    dispatch(authError('Password reset email sent. Please check your inbox.'));
  } catch (error) {
    const appError = getErrorMessage(error);
    dispatch(authError(appError.message));
  }
};

export const checkAuthenticated = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    let unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!user.emailVerified) {
          dispatch(signOutAction());
          dispatch(authError('Please verify your email address before signing in.'));
          return;
        }

        try {
          // Verify user exists in backend
          await handleApiCall(
            () => axios.post('https://beta-simpleprep.com/auth/user/check-user', {
              firebase_uid: user.uid,
              email: user.email,
            }),
            'verify-user'
          );

          dispatch(authSuccess());
        } catch (error) {
          const appError = getErrorMessage(error);
          dispatch(authError(appError.message));
          dispatch(signOutAction());
        }
      } else {
        dispatch(signOutAction());
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  } catch (error) {
    const appError = getErrorMessage(error);
    dispatch(authError(appError.message));
    dispatch(signOutAction());
  }
};

export const loadUser = () => (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!user.emailVerified) {
          dispatch(signOutAction());
          dispatch(authError('Please verify your email address before signing in.'));
          return;
        }

        // Get fresh ID token
        const token = await getIdToken(user, true);
        
        try {
          // Verify token with backend
          await handleApiCall(
            () => axios.post('https://beta-simpleprep.com/auth/verify-token', { token }),
            'verify-token'
          );
          
          dispatch(authSuccess());
        } catch (error) {
          const appError = getErrorMessage(error);
          dispatch(authError(appError.message));
          dispatch(signOutAction());
        }
      } else {
        dispatch(signOutAction());
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  } catch (error) {
    const appError = getErrorMessage(error);
    dispatch(authError(appError.message));
    dispatch(signOutAction());
  }
};

export const clearAuthError = () => (dispatch: Dispatch) => {
  dispatch(clearError());
};