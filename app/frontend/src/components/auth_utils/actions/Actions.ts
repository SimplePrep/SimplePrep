import { Dispatch } from 'redux';
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
} from 'firebase/auth';
import { signOut as firebaseSignOut } from 'firebase/auth';
import axios from 'axios';
import { AppThunk, LoginFormValues, UserFormValues } from '../types';
import { authLoading, authSuccess, authError, signOut as signOutAction, clearError } from '../reducers/authReducer';

// Error mapping function
const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/user-disabled':
      return 'The user account has been disabled.';
    case 'auth/user-not-found':
      return 'There is no user corresponding to this email.';
    case 'auth/wrong-password':
      return 'The password is invalid.';
    case 'auth/email-already-in-use':
      return 'The email address is already in use by another account.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    case 'auth/too-many-requests':
      return 'Too many requests. Please try again later.';
    case 'auth/network-request-failed':
      return 'A network error has occurred. Please try again.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
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
      dispatch(authSuccess());
      onSuccess();
    }
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = getErrorMessage(error.message);
      dispatch(authError(errorMessage));
    } else {
      dispatch(authError('An unexpected error occurred.'));
    }
  }
};

export const GoogleSignIn = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      const token = await getIdToken(user);
      console.log('Firebase Token:', token);
      const response = await axios.post('https://beta-simpleprep.com/auth/user/check-user', {
        firebase_uid: user.uid,
        email: user.email,
      });

      if (response.data.exists) {
        await axios.put('https://beta-simpleprep.com/auth/user/update-user', {
          firebase_uid: user.uid,
          email: user.email,
          first_name: user.displayName?.split(' ')[0] || 'Default',
          last_name: user.displayName?.split(' ')[1] || 'User',
        });
      } else {
        await axios.post('https://beta-simpleprep.com/auth/user/signup', {
          firebase_uid: user.uid,
          email: user.email,
          first_name: user.displayName?.split(' ')[0] || 'Default',
          last_name: user.displayName?.split(' ')[1] || 'User',
        });
      }

      if (user.emailVerified) {
        dispatch(authSuccess());
      } else {
        dispatch(authError('Please verify your email before logging in.'));
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = getErrorMessage(error.message);
      dispatch(authError(errorMessage));
    } else {
      dispatch(authError('An unexpected error occurred.'));
    }
  }
};

export const SignUp = (creds: UserFormValues) => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, creds.email, creds.password);
    const user = userCredential.user;

    if (user) {
      await sendEmailVerification(user, { url: "https://beta-simpleprep.com" });

      const userData = {
        firebase_uid: user.uid,
        email: user.email,
        first_name: creds.firstName,
        last_name: creds.lastName,
        subscription_type: "free",
      };

      await axios.post('https://beta-simpleprep.com/auth/user/signup', userData);

      dispatch(authSuccess());
    }
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = getErrorMessage(error.message);
      dispatch(authError(errorMessage));
    } else {
      dispatch(authError('An unexpected error occurred.'));
    }
  }
};

export const SignOut = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    await firebaseSignOut(auth);
    dispatch(signOutAction());
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = getErrorMessage(error.message);
      dispatch(authError(errorMessage));
    } else {
      dispatch(authError('An unexpected error occurred.'));
    }
  }
};

export const SendResetPasswordEmail = (email: string) => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    await sendPasswordResetEmail(auth, email);
    dispatch(authSuccess());
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = getErrorMessage(error.message);
      dispatch(authError(errorMessage));
    } else {
      dispatch(authError('An unexpected error occurred.'));
    }
  }
};

export const checkAuthenticated = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        dispatch(authSuccess());
      } else {
        dispatch(signOutAction());
      }
    });
  } catch (error) {
    dispatch(authError('Failed to check authentication status.'));
  }
};

export const loadUser = () => (dispatch: Dispatch) => {
  dispatch(authLoading());

  onAuthStateChanged(auth, user => {
    if (user && user.emailVerified) {
      dispatch(authSuccess());
    } else {
      dispatch(signOutAction());
    }
  });
};

export const clearAuthError = () => (dispatch: Dispatch) => {
  dispatch(clearError());
};
