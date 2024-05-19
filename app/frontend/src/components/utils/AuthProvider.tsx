import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, User, sendPasswordResetEmail, onAuthStateChanged, signInWithPopup, sendEmailVerification, getIdToken} from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { LoginFormValues, UserFormValues } from './AuthServices';
import { SignUp as signUpService, SignIn as signInService, SignOut as signOutService } from './AuthServices';
import AuthContext from './AuthContext';
import {FirebaseError} from 'firebase/app';
import axios from 'axios';


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
        if (user) {
            if (user.emailVerified) {
                try {
                    const token = await user.getIdToken();
                    await axios.post('https://beta-simpleprep.com/auth/user/verify-user-email', { uid: user.uid }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                } catch (error) {
                    console.error('Failed to verify user email:', error);
                }
            }
            setCurrentUser(user);
        } else {
            setCurrentUser(null);
        }
        setLoading(false);
    });
    return unsubscribe;
}, []);
  

  const registerUserInBackend = async (user: User, firstName?: string, lastName?: string) => {
    try {
      const token = await user.getIdToken();
      await axios.post('https://beta-simpleprep.com/auth/user/store-temp-user', {
        firebase_uid: user.uid,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('User data sent to backend');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

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
        await registerUserInBackend(user, creds.firstName, creds.lastName);
        setError('Verification email sent. Please verify your email before logging in.');
    } catch (error) {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('This email is already in use.');
                    break;
                case 'auth/too-many-requests':
                    break;
                default:
                    console.log(error)
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
