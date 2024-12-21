import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../components/store';
import { GoogleSignIn, SignIn, clearAuthError } from '../../components/auth_utils/actions/Actions';
import { LoginFormValues } from '../../components/auth_utils/types';
import SimplePrepLogo from '../../components/assets/logo-original.png';
import StylisticBackground from './StylisticBackground'; // adjust the import path as needed
import { Eye, EyeOff } from 'lucide-react';
import FloatingLabelInput from './FloatingLabelInput';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, error: loginError, loading } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pageError, setPageError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? '' : 'Please enter a valid email address');
    return isValid;
  };

  return (
    <StylisticBackground>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-40 h-10 rounded-xl mb-4">
            <img src={SimplePrepLogo} alt="SimplePrep Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl lg:text-4xl font-semibold text-gray-800">Welcome back</h1>
          <p className="text-sm lg:text-base text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Email input */}
            <div className="relative">
              <FloatingLabelInput 
                  id="email" 
                  label="Email" 
                  type="email" 
                  value={email} 
                  setValue={setEmail}
                  validate={true}
                  inputProps={{
                    autoComplete: "email",
                    onBlur: (e) => validateEmail(e.target.value)
                  }}
                />
                {emailError && (
                  <p className="mt-1 text-xs text-red-500">{emailError}</p>
                )}
            </div>

            {/* Password input with show/hide icon */}
            <div className="relative">
            <FloatingLabelInput 
              id="password" 
              label="Password" 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              setValue={setPassword}
              inputProps={{
                autoComplete: "current-password", // Example of extra attribute
              }}
              validate={false}
            />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center pb-2"
                tabIndex={-1}
              >
                {showPassword ? (
                  // Eye icon (Slash) when password is visible
                  <Eye/>
                ) : (
                  // Eye icon (without slash) when password is hidden
                  <EyeOff/>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/reset-password"
              className="text-sm text-green-600 hover:text-green-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {pageError && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {pageError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
              transform transition-all active:scale-[0.98] disabled:opacity-70"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 
                    12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/70 text-gray-500">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg border border-gray-200 
              bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-gray-500 transform transition-all active:scale-[0.98]"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 
                3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 
                1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
                20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
                8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 
                2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 
                2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-green-700 hover:text-green-600 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </StylisticBackground>
  );
};

export default Login;
