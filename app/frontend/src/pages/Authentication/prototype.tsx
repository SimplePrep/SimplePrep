import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { LiaFastForwardSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import FloatingLabelInput from './FloatingLabelInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../components/store';
import { GoogleSignIn, SignIn, clearAuthError } from '../../components/auth_utils/actions/Actions';
import { LoginFormValues } from '../../components/auth_utils/types';

const Login = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, error: loginError, loading } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pageError, setPageError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/demo');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (loginError) {
      setPageError(loginError);
    }
  }, [loginError]);

  const handleGoogleSignIn = () => {
    dispatch(GoogleSignIn());
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const creds: LoginFormValues = { email, password };
    dispatch(SignIn(creds, () => navigate('/demo', { replace: true })));
  };

  const DesktopView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <LiaFastForwardSolid className="mx-auto h-16 w-16 text-indigo-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
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
              validate={true}
            />
            <FloatingLabelInput
              id="password"
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
              validate={true}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/reset-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {pageError && <div className="text-red-500 text-sm text-center">{pageError}</div>}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FcGoogle className="mr-2" size={20} />
                Sign in with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  const MobileView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-2xl">
        <div className="text-center">
          <LiaFastForwardSolid className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-col gap-3 rounded-md shadow-sm -space-y-px">
            <FloatingLabelInput
              id="email-mobile"
              label="Email address"
              type="email"
              value={email}
              setValue={setEmail}
              validate={true}
            />
            <FloatingLabelInput
              id="password-mobile"
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
              validate={true}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/reset-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {pageError && <div className="text-red-500 text-sm text-center">{pageError}</div>}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FcGoogle className="mr-2" size={20} />
                Sign in with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <div className="sm:hidden">
        <MobileView />
      </div>
      <div className="hidden sm:block">
        <DesktopView />
      </div>
    </>
  );
};

export default Login;
