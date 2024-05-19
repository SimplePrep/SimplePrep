import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const EmailVerification: React.FC = () => {
  const [message, setMessage] = useState<string>('Verifying...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const uid = queryParams.get('uid');
      console.log('user info transfer started')
      if (uid) {
        const user = auth.currentUser;
        if (user) {
          await user.reload();
          if (user.emailVerified) {
            try {
              const token = await user.getIdToken();
              await axios.post('https://beta-simpleprep.com/auth/user/verify-user-email', {
                firebase_uid: user.uid
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              setMessage('Email verified successfully! Redirecting...');
              setTimeout(() => navigate('/login'), 3000);  // Redirect after 3 seconds
            } catch (error) {
              console.error('Error verifying email:', error);
              setMessage('Verification failed. Please try again.');
            }
          } else {
            setMessage('Email not verified. Please verify your email.');
          }
        } else {
          setMessage('Unable to verify email. Please log in again.');
        }
      } else {
        setMessage('Invalid verification link.');
      }
    };

    verifyEmail();
  }, [navigate, location]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default EmailVerification;
