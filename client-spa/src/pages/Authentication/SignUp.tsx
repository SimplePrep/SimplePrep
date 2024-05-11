import React, {useEffect, useState,  useContext} from 'react';
import banner from '../../components/assets/signInPic1.jpg';
import {FcGoogle} from 'react-icons/fc';
import {LiaFastForwardSolid} from 'react-icons/lia';
import { useNavigate} from 'react-router-dom';
import FloatingLabelInput from './FloatingLabelInput';
import Modal from './Modal';
import  AuthContext  from '../../components/utils/AuthContext';

const SignUp = ():  React.ReactElement =>  {
    const {SignUp, GoogleSignIn, error} = useContext(AuthContext);
    const [accountCreated, setAccountCreated] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [pageError, setPageError] = useState('');
    const [modalMessage, setModalMessage] = useState('');


    const backgroundImageStyle = {
        backgroundImage: `url(${banner})`,
    };
    const navigate = useNavigate();


    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignIn();
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
            await SignUp({firstName, lastName, email, password});
            setAccountCreated(true);
        }  catch (err: unknown) {
            if (err instanceof Error) {
                setPageError(err.message);
            } else {
                setPageError('An unexpected error occurred during sign up.');
            }
        }
        
    };
    useEffect(() => {
        if (accountCreated && !error) {
            setModalMessage("Account created successfully! Check your email to follow the link to activate your account. Redirecting you to home page.");
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            navigate('/');
        }, 7000);
        }
    }, [accountCreated, navigate])
    
    useEffect(() => {
        if (error) {
            setPageError(error);
            setAccountCreated(false);
            setShowModal(false);
        }
    }, [error])
    

  return (
    <div className='flex w-full h-screen  bg-slate-200 items-center justify-center'>
        {accountCreated && showModal && <Modal message={modalMessage} />}
        <div className='flex  max-w-[1450px] mx-auto flex-row'>
            <div className='w-[50%]  rounded-l-2xl' style={backgroundImageStyle}>
                <div className= 'px-20 py-40  flex flex-col gap-5 bg-transparent'>
                    <div className='flex flex-row items-center'>
                        <LiaFastForwardSolid size={60} color='white'/>
                        <h1 className='font-bold text-5xl text-white'>Digital</h1>
                    </div>
                    <h1 className='font-bold text-5xl text-white'>platform</h1>
                    <h1 className='font-bold text-5xl text-white'>for SAT</h1>
                    <h1 className='font-bold text-5xl'>learning and practicing.</h1>
                    <h2 className='font-bold text-xl text-white'>You will never know everything.</h2>
                    <h2 className='font-bold text-xl text-white'>But with us, you will learn more.</h2>
                </div>
            </div>
            <div className='bg-white  w-[50%] rounded-r-2xl flex flex-col p-20'>
                <div className='max-w-lg'>
                <h1 className='font-normal text-2xl text-black '>Create your account!</h1>
                    <p className='mt-5 text-xl text-slate-500'>Already have an account? <a className='text-blue-500 font-bold' href="/login">Login</a></p>
                    <form onSubmit={e=> onSubmit(e)}>
                        <div className='flex mt-5 flex-col gap-5'>
                            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                            <div className='flex flex-row gap-10'>
                                <FloatingLabelInput id="firstName" label='First Name' type='firstName' value={firstName} setValue={setFirstName} />
                                <FloatingLabelInput id="lastName" label='Last Name' type='lastName' value={lastName} setValue={setLastName} />
                            </div>
                            <FloatingLabelInput id="email" label='Email' type='email' value={email} setValue={setEmail} />
                            <FloatingLabelInput id="password" label="Password" type='password' value={password} setValue={(value) => { setPassword(value); setPageError(''); }}/>
                            <FloatingLabelInput id="re_password" label="Confirm Password" type='password' value={rePassword} setValue={(value) => { setRePassword(value); setPageError(''); }}/>
                            <div className="relative h-10">
                                    <p
                                        className={`text-red-500 absolute inset-0 ${
                                        pageError ? 'visible' : 'invisible'
                                        }`}
                                    >
                                        {pageError || 'Placeholder'}
                                    </p>
                            </div>                           
                            <button type='submit' className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">Register</button>
                        </div>
                    </form>
                    <div className="flex mt-5 justify-center items-center text-gray-600">
                        <span className="border-t w-1/2 border-2"></span>
                        <span className="px-2 text-slate-500">or</span>
                        <span className="border-t w-1/2 border-2"></span>
                    </div>
                    <button onClick={handleGoogleSignIn} className="w-full mt-5 border-2 font-medium py-3 rounded-md hover:bg-slate-100 flex items-center justify-center">
                        <FcGoogle className="mr-2" size={30}/>
                        <p className="text-center">Continue with Google</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp;