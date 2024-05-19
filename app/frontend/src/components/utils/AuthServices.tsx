import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from './firebaseConfig';
import axios from 'axios';
setPersistence(auth,  browserLocalPersistence);
export interface LoginFormValues {
    email: string;
    password: string;
  }
  
export  interface UserFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

//Sign in functionality
export const SignIn = async ({ email, password }: LoginFormValues) => {
 try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user && !user.emailVerified) {
            throw new Error('Please verify your email before logging in.');
        }
        return userCredential;
    } catch (error) {
        throw error;  
    }
};

//Sign up functionality
export const SignUp = async ({firstName, lastName,  email, password }: UserFormValues) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user) {
      await sendEmailVerification(user, {
          url: "https://beta-simpleprep.com/verify-email",
      });
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

            return userCredential;
  }
} catch (error) {
    throw error;
}
};

//Sign out functionality
export const  SignOut  =  async () => {
 await  signOut(auth);
};