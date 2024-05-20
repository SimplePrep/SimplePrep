import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, User, sendPasswordResetEmail, onAuthStateChanged, signInWithPopup, sendEmailVerification, getIdToken} from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { LoginFormValues, UserFormValues } from './AuthServices';
import { SignUp as signUpService, SignIn as signInService, SignOut as signOutService } from './AuthServices';
import {FirebaseError} from 'firebase/app';
import axios from 'axios';


interface AuthProviderProps {
  children: React.ReactNode;
}
interface IAuth {
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

const defaultAuth: IAuth = {
  user: null,
  loading: true,
  isAuthenticated: false,
  error: null,
  SignIn: async () => {},
  SignUp: async () => {},
  SignOut: async () => {},
  GoogleSignIn: async () => {},
  SendResetPasswordEmail: async () => {},
  checkAuthenticated: async () => {},
  loadUser: async () => {},
};

const AuthContext = createContext<IAuth>(defaultAuth);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  
  const checkAuthenticated = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setError('Failed to authenticate.');
      console.error('Authentication check error:', error);
    }
  };

  const loadUser = async () => {
    if (user) {
    }
  };

  const SignUp = async (creds: UserFormValues) => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await signUpService(creds);
      
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('This email is already in use.');
            break;
          case 'auth/too-many-requests':
            break;
          default:
            console.log(error);
            setError('Failed to sign up. Please try again.');
            break;
        }
      } else {
        setError('An unexpected error occurred during sign up.');
      }
    } finally {
      setLoading(false);
    }
  };

  const SignIn = async (creds: LoginFormValues, onSuccess: () => void) => {
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInService(creds);
      const { user } = userCredential;

      if (user && !user.emailVerified) {
        throw new Error('Please verify your email address before logging in.'); // Throwing to catch block
      }
      if (user) {
        setUser(user);
        onSuccess();
      }
    } catch (error: unknown) {
      console.error('Sign in error:', error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/invalid-credential':
            setError('Either email or password is incorrect.');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password. Please try again.');
            break;
          default:
            setError('Login failed. Please try again.');
            break;
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
};
  
const GoogleSignIn = async () => {
  setLoading(true);
  setError('');
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      const { displayName, email, uid } = user;
      const [firstName, lastName] = displayName ? displayName.split(' ') : ['Default', 'User'];

      // Check if user exists in the backend
      const response = await axios.post('https://beta-simpleprep.com/auth/user/check-user', {
        firebase_uid: uid,
        email: email,
      });

      if (response.data.exists) {
        // Update user info if needed
        await axios.put('https://beta-simpleprep.com/auth/user/update-user', {
          firebase_uid: uid,
          email: email,
          first_name: firstName || 'Default',
          last_name: lastName || 'User',
        });
      } else {
        // Create a new user
        await axios.post('https://beta-simpleprep.com/auth/user/signup', {
          firebase_uid: uid,
          email: email,
          first_name: firstName || 'Default',
          last_name: lastName || 'User',
        });
      }

      if (user.emailVerified) {
        setUser(user);
      } else {
        setError('Please verify your email before logging in.');
      }
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('The sign-in popup was closed before completing the sign in.');
          break;
        case 'auth/cancelled-popup-request':
          setError('Too many popups were opened simultaneously.');
          break;
        default:
          setError('Failed to sign in with Google.');
          break;
      }
    } else {
      setError('An unexpected error occurred during Google sign in.');
    }
  } finally {
    setLoading(false);
  }
};

  const SignOut = async () => {
    setLoading(true);
    try {
      await signOutService();
      setUser(null);
      navigate('/')
    } catch (error) {
      setError('Failed to sign out.');
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const SendResetPasswordEmail =async (email:string) => {
      setLoading(true);
      try{
        await sendPasswordResetEmail(auth, email);
        setError('');
      } catch(error) {
        if(error instanceof FirebaseError) {
          setError(error.message);
        } else {
          setError('Failed to send reset email. Please try again.');
        }
      } finally {
        setLoading(false);
      }
  };

  const isAuthenticated = !!user && user.emailVerified;

  const authValues = useMemo(() => ({
    user,
    loading,
    isAuthenticated,
    SignIn,
    SignUp,
    SignOut,
    GoogleSignIn,
    SendResetPasswordEmail,
    checkAuthenticated,
    loadUser,
    error
  }), [user, loading, error]);

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
