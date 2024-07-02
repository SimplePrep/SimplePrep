import React, { useState, useEffect } from 'react';
import banner from '../../components/assets/signInPic1.jpg';
import { FcGoogle } from 'react-icons/fc';
import { LiaFastForwardSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import FloatingLabelInput from './FloatingLabelInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../components/store';
import { GoogleSignIn, SignIn, clearAuthError } from '../../components/utils/actions/authActions';
import { LoginFormValues } from '../../components/utils/types';

const Login = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, error: loginError, loading } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pageError, setPageError] = useState('');
  const navigate = useNavigate();

  const backgroundImageStyle = {
    backgroundImage: `url(${banner})`,
  };

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

  return (
    <div className='flex w-full h-screen bg-gray-300 p-5'>
      <div className='flex h-full max-w-[1450px] mx-auto flex-row p-5 rounded-2xl border-4 border-white' style={backgroundImageStyle}>
        <div className='w-[50%]'>
          <div className='p-9 flex flex-col gap-5 bg-transparent'>
            <div className='flex flex-row items-center'>
              <LiaFastForwardSolid size={60} color='white' />
              <h1 className='font-bold text-5xl text-white'>Digital</h1>
            </div>
            <h1 className='font-bold text-5xl text-white'>platform</h1>
            <h1 className='font-bold text-5xl text-white'>for SAT</h1>
            <h1 className='font-bold text-5xl'>learning and practicing.</h1>
            <h2 className='font-bold text-xl text-white'>You will never know everything.</h2>
            <h2 className='font-bold text-xl text-white'>But with us, you will learn more.</h2>
          </div>
        </div>
        <div className='bg-white shadow-lg w-[50%] rounded-2xl flex flex-col p-12 bg-transparent border-4 border-slate-100'>
          <div className='max-w-lg'>
            <h1 className='font-bold text-3xl text-black'>Hello, Welcome back</h1>
            <p className='text-slate-500 mt-5'>Enter your login credentials</p>
            <p className='mt-3 text-xl text-slate-500'>Don't you have an account? <Link className='text-blue-500 font-bold' to="/signup">Sign up</Link></p>
            <form onSubmit={onSubmit}>
              <div className='flex mt-10 flex-col gap-4'>
                <h1 className="text-2xl font-bold ">Login</h1>
                <FloatingLabelInput id="email" label='Email' type='email' value={email} setValue={setEmail} validate={false} />
                <FloatingLabelInput id="password" label="Password" type='password' value={password} setValue={setPassword} validate={false} />
                <div className="relative h-10 mb-4">
                  <p className={`text-red-500 absolute inset-0 ${pageError ? 'visible' : 'invisible'}`}>
                    {pageError || 'Placeholder'}
                  </p>
                </div>
                <button type='submit' className="w-full bg-blue-500 text-white py-3 rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-600">
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
            <p className='mt-5'>
              <Link to='/reset-password'>Forgot your Password?</Link>
            </p>
            <div className="flex mt-5 justify-center items-center text-gray-600">
              <span className="border-t w-1/2 border-2"></span>
              <span className="px-2 text-slate-500">or</span>
              <span className="border-t w-1/2 border-2"></span>
            </div>
            <button onClick={handleGoogleSignIn} className="w-full bg-gray-100 mt-2 border-2 font-medium py-2 rounded-2xl hover:bg-gray-300 flex items-center justify-center hover:border-green-800">
              <FcGoogle className="mr-2" size={30} />
              <p className="text-center">Sign in with Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
