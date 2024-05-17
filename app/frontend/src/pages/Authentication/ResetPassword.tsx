import React, {useContext, useEffect, useState} from 'react'
import banner from '../../components/assets/signInPic1.jpg'
import {LiaFastForwardSolid} from 'react-icons/lia'
import { useNavigate} from 'react-router-dom'
import FloatingLabelInput from './FloatingLabelInput'
import Loader from './Modal'
import AuthContext from '../../components/utils/AuthContext'

const ResetPassword = (): React.ReactElement =>  {
    const {SendResetPasswordEmail, error}  = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const backgroundImageStyle = {
        backgroundImage: `url(${banner})`,
    };
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await SendResetPasswordEmail(email);
        if (!error) {
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/');
            }, 5000); 
        }
    };
    
    
    useEffect(()=> {
        if (error) {
            console.error('Reset password error:', error);
        } 
    }, [error])
    


  return (
    <div className='flex w-full h-screen bg-slate-200 items-center justify-center'>
        {showModal && <Loader message="If your email is registered with us, you will receive a password reset link to your email shortly." />}
        <div className='flex h-full  max-w-[1400px] mx-auto flex-row  p-10'>
            <div className='w-[50%]  rounded-l-2xl' style={backgroundImageStyle}>
                <div className= 'px-20 py-40 flex flex-col gap-5 bg-transparent'>
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
            <div className='bg-white  w-[50%] rounded-r-2xl flex flex-col p-40 gap-5'>
                <div className='max-w-lg'>
                    <h1 className='font-bold text-3xl text-black'>Hello, Welcome back</h1>
                    <p className='mt-5 text-xl text-slate-500'>Don't you have an account? <a className='text-blue-500 font-bold' href="/signup">Sign up</a></p>
                    <form onSubmit={e=> onSubmit(e)}>
                        <div className='flex mt-10 flex-col gap-5'>
                            <h1 className="text-2xl font-bold">Request Password Reset</h1>
                            <p className='text-slate-600'>If your email is registered with us, you will receive a password reset link to your email.</p>
                                <FloatingLabelInput id="email" label='Email' type='email' value={email} setValue={setEmail} />
                            {error && (
                                <p className="mt-2 text-red-500">
                                    {error}
                                </p>
                            )}
                            <button type='submit' className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword;