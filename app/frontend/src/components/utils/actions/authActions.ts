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
} from 'firebase/auth';
import {signOut as firebaseSignOut} from 'firebase/auth'
import axios from 'axios';
import { LoginFormValues, UserFormValues } from '../types';
import { authLoading, authSuccess, authError, signOut as signOutAction, clearError } from '../reducers/authReducer';

export const SignIn = (creds: LoginFormValues, onSuccess: () => void) => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    const userCredential = await signInWithEmailAndPassword(auth, creds.email, creds.password);
    const user = userCredential.user;

    if (user && !user.emailVerified) {
      throw new Error('Please verify your email address before logging in.');
    }

    if (user) {
      dispatch(authSuccess(user));
      onSuccess();
    }
  } catch (error) {
    if (error instanceof Error) {
      dispatch(authError(error.message));
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
        dispatch(authSuccess(user));
      } else {
        dispatch(authError('Please verify your email before logging in.'));
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      dispatch(authError(error.message));
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

      dispatch(authSuccess(user));
    }
  } catch (error) {
    dispatch(authError((error as Error).message));
  }
};

export const SignOut = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    await firebaseSignOut(auth);
    dispatch(signOutAction());
  } catch (error) {
    dispatch(authError((error as Error).message));
  }
};

export const SendResetPasswordEmail = (email: string) => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    await sendPasswordResetEmail(auth, email);
    dispatch(authSuccess(null));
  } catch (error) {
    dispatch(authError((error as Error).message));
  }
};

export const checkAuthenticated = () => async (dispatch: Dispatch) => {
  dispatch(authLoading());

  try {
    const user = auth.currentUser;

    if (user && user.emailVerified) {
      dispatch(authSuccess(user));
    } else {
      dispatch(signOutAction());
    }
  } catch (error) {
    dispatch(authError((error as Error).message));
  }
};

export const loadUser = () => (dispatch: Dispatch) => {
  dispatch(authLoading());

  onAuthStateChanged(auth, user => {
    if (user && user.emailVerified) {
      dispatch(authSuccess(user));
    } else {
      dispatch(signOutAction());
    }
  });
};

export const clearAuthError = () => (dispatch: Dispatch) => {
  dispatch(clearError());
};
