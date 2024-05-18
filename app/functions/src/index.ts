import { UserRecord } from 'firebase-admin/auth';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

// Listen for new user sign-ups
exports.handleNewUserSignUp = functions.auth.user().onCreate(async (user: UserRecord) => {
  console.log('New user signed up:', user.email);

  // Check if the user's email is verified
  if (user.emailVerified) {
    console.log('Email is already verified');
    await registerUserInBackend(user);
  } else {
    console.log('Email is not verified yet');
  }
});

// Listen for email verification events
exports.handleEmailVerification = functions.auth.user().onEmailVerified(async (user: UserRecord) => {
  console.log('Email verified for user:', user.email);
  await registerUserInBackend(user);
});

// Helper function to register the user in your backend
async function registerUserInBackend(user: UserRecord) {
  const userData = {
    email: user.email,
    first_name: user.displayName?.split(' ')[0],
    last_name: user.displayName?.split(' ')[1] || '',
    firebase_uid: user.uid,
    subscription_type: 'free',
  };

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(userData);
    const response = await axios.post('https://beta-simpleprep.com/auth/user/signup', body, config);
    console.log('Backend registration successful:', response.data);
  } catch (error) {
    console.error('Backend registration failed:', error);
  }
}