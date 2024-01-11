import React, {useEffect, useState} from 'react'
import banner from '../../components/assets/signInPic1.jpg'
import {LiaFastForwardSolid} from 'react-icons/lia'
import { Link,  useNavigate, useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import { reset_password_confirm} from '../../components/actions/auth'

interface ResetPasswordConfirmProps {
    reset_password_confirm: (uid: string, token:string, new_password:string, re_new_password:string) => void;
}

const ResetPasswordConfirm: React.FC<ResetPasswordConfirmProps> = ({reset_password_confirm}): React.ReactElement =>  {
    const [new_password, setNew_password] = useState('');
    const [re_new_password, setRe_new_password] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    const backgroundImageStyle = {
        backgroundImage: `url(${banner})`,
    };
    const { uid, token } = useParams();
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (uid && token){
          reset_password_confirm(uid, token, new_password, re_new_password);
          setRequestSent(true);
        } else {
          console.error('uid or token is undefined')
        }
    };
    
    
    useEffect(()=> {
        if (requestSent){
            navigate('/sign-in')
            console.log('success')
        } else {
            console.log('Login Failed')
        }
    }, [requestSent])
    


  return (
    <div className='flex w-full h-screen bg-slate-200 items-center justify-center'>
        <div className='flex lg:max-h-[80%] h-full  max-w-[1600px] mx-auto flex-row  p-10'>
            <div className='w-[50%]  rounded-l-2xl' style={backgroundImageStyle}>
                <div className= 'p-40 md:p-40 lg:p-40 flex flex-col gap-5 bg-transparent'>
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
                    <p className='mt-5 text-xl text-slate-500'>Don't you have an account?<a className='text-blue-500 font-bold' href="/sign-up">Sign up</a></p>
                    <form onSubmit={e=> onSubmit(e)}>
                        <div className='flex mt-10 flex-col gap-5'>
                            <h1 className="text-2xl font-bold mb-4">Renew Your Password</h1>
                              <div className="mb-4 relative">
                                <input
                                    type="password"
                                    placeholder=" "
                                    className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition 
                                    disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={new_password}
                                    onChange={(e) => setNew_password(e.target.value)}
                                    />
                                    <label className='absolute text-md duration-150 transform -translate-y-3 top-5 z-5 origin-[0] left-4 peer-placeholder-shown:scale-200 peer-placeholder-shown:translate-y-0
                                    peer-focus:scale-75 peer-focus:-translate-y-4'>New Password</label>
                              </div>
                              <div className="mb-4 relative">
                                <input
                                    type="password"
                                    placeholder=" "
                                    className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition 
                                    disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={re_new_password}
                                    onChange={(e) => setRe_new_password(e.target.value)}
                                    />
                                    <label className='absolute text-md duration-150 transform -translate-y-3 top-5 z-5 origin-[0] left-4 peer-placeholder-shown:scale-200 peer-placeholder-shown:translate-y-0
                                    peer-focus:scale-75 peer-focus:-translate-y-4'>Confirm New Password</label>
                              </div>
                            <button type='submit' className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}


export default connect(null,{reset_password_confirm})(ResetPasswordConfirm);