import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { LiaFastForwardSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import FloatingLabelInput from './FloatingLabelInput';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../components/store';
import { SignUp, GoogleSignIn, clearAuthError } from '../../components/auth_utils/actions/Actions';
import Logo from '../../components/assets/logo-icon.png';
import StylisticBackground from './StylisticBackground';
import SimplePrepLogo from '../../components/assets/logo-original.png';

const SignUpComponent = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const [accountCreated, setAccountCreated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pageError, setPageError] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      dispatch(GoogleSignIn());
      setModalMessage('Account created successfully! Redirecting you to Demo page.');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/demo');
      }, 5000);
    } catch (err) {
      console.error('Error during Google Sign-In:', err);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== rePassword) {
      setPageError('Passwords do not match.');
      return;
    }
    setPageError('');
    setAccountCreated(false);
    setShowModal(false);

    try {
      const creds = { firstName, lastName, email, password };
      await dispatch(SignUp(creds));
      setAccountCreated(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setPageError(err.message);
      } else {
        setPageError('An unexpected error occurred during sign up.');
      }
    }
  };

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (accountCreated && !error) {
      setModalMessage('Account created successfully! Check your email to follow the link to activate your account. Redirecting you to home page.');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 7000);
    }
  }, [accountCreated, navigate, error]);

  useEffect(() => {
    if (error) {
      setPageError(error);
      setAccountCreated(false);
      setShowModal(false);
    }
  }, [error]);

  return (
    <StylisticBackground>
    {accountCreated && showModal && <Modal message={modalMessage} />}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-40 h-10 rounded-xl mb-4">
            <img src={SimplePrepLogo} alt="SimplePrep Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-500 hover:text-green-700">
              Login
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-col gap-3 rounded-md shadow-sm -space-y-px">
            <div className="flex flex-row gap-5">
              <FloatingLabelInput id="firstName" label="First Name" type="text" value={firstName} setValue={setFirstName} />
              <FloatingLabelInput id="lastName" label="Last Name" type="text" value={lastName} setValue={setLastName} />
            </div>
            <FloatingLabelInput id="email" label="Email" type="email" value={email} setValue={setEmail} />
            <FloatingLabelInput id="password" label="Password" type="password" value={password} setValue={(value) => { setPassword(value); setPageError(''); }} />
            <FloatingLabelInput id="re_password" label="Confirm Password" type="password" value={rePassword} setValue={(value) => { setRePassword(value); setPageError(''); }} />
          </div>

          {pageError && <div className="text-red-500 text-sm text-center">{pageError}</div>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FcGoogle className="mr-2" size={20} />
                Continue with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </StylisticBackground>
  );
};

export default SignUpComponent;
