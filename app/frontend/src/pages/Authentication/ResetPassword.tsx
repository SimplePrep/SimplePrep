import React, { useEffect, useState } from 'react';
import { LiaFastForwardSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from './FloatingLabelInput';
import Loader from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../components/store';
import { SendResetPasswordEmail, clearAuthError } from '../../components/auth_utils/actions/Actions';
import Logo from '../../components/assets/logo-icon.png';
import StylisticBackground from './StylisticBackground';

const ResetPassword = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(SendResetPasswordEmail(email));
    if (!error) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 5000);
    }
  };

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Reset password error:', error);
    }
  }, [error]);

  return (
      <StylisticBackground>
      {showModal && <Loader message="If your email is registered with us, you will receive a password reset link to your email shortly." />}
      <div className="space-y-8 ">
        <div className="text-center">
          <div className="mx-auto h-12 md:h-16 w-12 md:w-16 text-indigo-600">
            <img src={Logo} alt="Logo Icon" />
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">Request Password Reset</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-green-600 hover:text-green-500">
              Sign up
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-col gap-3 rounded-md shadow-sm -space-y-px">
            <FloatingLabelInput
              id="email"
              label="Email address"
              type="email"
              value={email}
              setValue={setEmail}
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Sending...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </StylisticBackground>
  );
};

export default ResetPassword;
