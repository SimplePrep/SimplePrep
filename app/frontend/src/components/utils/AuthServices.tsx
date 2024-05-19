import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from './firebaseConfig';
import axios from 'axios';

setPersistence(auth, browserLocalPersistence);

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

// Sign-in functionality
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

// Sign-up functionality
export const SignUp = async ({ firstName, lastName, email, password }: UserFormValues) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
            console.log('sending email')
            await sendEmailVerification(user, {
                url: "https://beta-simpleprep.com",
            });
            console.log('email sent')

            // Store temporary user data in the backend
            const token = await user.getIdToken();
            const userData = {
              email: user.email,
              first_name: firstName,
              last_name: lastName,
              firebase_uid: user.uid,
              subscription_type: "free",
            }
            const body = JSON.stringify(userData);
            const config = {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }}

            const response = await axios.post('https://beta-simpleprep.com/auth/user/signup', 
              body, 
              config
            );

            return userCredential;
        }
    } catch (error) {
        throw error;
    }
};

// Sign-out functionality
export const SignOut = async () => {
    await signOut(auth);
};
