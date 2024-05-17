import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, User, sendPasswordResetEmail, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { LoginFormValues, UserFormValues } from './AuthServices';
import { SignUp as signUpService, SignIn as signInService, SignOut as signOutService } from './AuthServices';
import AuthContext from './AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import {FirebaseError} from 'firebase/app';
import axios from 'axios';
import {doc, setDoc, updateDoc} from 'firebase/firestore';


interface AuthProviderProps {
  children: React.ReactNode;
}


const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        setCurrentUser(user);

      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);


  const checkAuthenticated = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.emailVerified) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      setError('Failed to authenticate.');
      console.error('Authentication check error:', error);
    }
  };

  const loadUser = async () => {
    if (currentUser) {
      console.log("Load detailed user data here if needed");
    }
  };

  const SignUp = async (creds: UserFormValues) => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await signUpService(creds);

      if (!userCredential) {
        throw new Error("Failed to create user credentials.");
      }
      const { user } = userCredential;

      const userData = {
        firebase_uid: user.uid,
        firstName: creds.firstName,
        lastName: creds.lastName,
        email: user.email,
        createdAt: new Date().toISOString(),
        emailVerified: false
      };
      try {
        await setDoc(doc(db, "users", user.uid), userData);
      } catch(error) {
        console.log('Error in Firestore')
        throw Error('Firestore Error Happened');
      }
        
      await sendEmailVerification(user, { url: 'http://localhost:3000' });
      

    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('This email is already in use.');
            break;
          case 'auth/too-many-requests':
            break;
          default:
            setError('Failed to sign up. Please try again.');
            break;
        }
      } else {
        setError('An unexpected error occurred during sign up.'); 
      }
    }
    finally {
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
        setCurrentUser(user);
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
      if (user && user.emailVerified) {
        setCurrentUser(user);
      } else {
        setError('Please verify your email before logging in.')
      }
    } catch(error) {
      if (error instanceof FirebaseError){
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
        setError('An unexpected error occurred during Google sign in.')
      }
    } finally {
      setLoading(false);
    }
  }

  const SignOut = async () => {
    setLoading(true);
    try {
      await signOutService();
      setCurrentUser(null);
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

  const isAuthenticated = !!currentUser && currentUser.emailVerified;

  const authValues = useMemo(() => ({
    user: currentUser,
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
  }), [currentUser, loading, error]);

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
