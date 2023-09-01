import React, {useState} from 'react'
import banner from '../components/assets/signInPic1.jpg'
import {FcGoogle} from 'react-icons/fc'
import {LiaFastForwardSolid} from 'react-icons/lia'
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const backgroundImageStyle = {
        backgroundImage: `url(${banner})`,
    };


  return (
    <div className='w-full h-screen  bg-slate-200'>
        <div className='flex h-full max-w-[1600px] mx-auto flex-row  p-28'>
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
                    <p className='text-slate-500'>Enter your login credentials</p>
                    <div className='flex mt-10 flex-col gap-5'>
                            <h1 className="text-2xl font-bold mb-4">Login</h1>
                            <div className="mb-4 relative">
                                <input
                                type="email"
                                placeholder=" "
                                className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none 
                                transition disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className='absolute text-md duration-150 transform -translate-y-3 top-5 z-5 origin-[0] left-4 peer-placeholder-shown:scale-200 peer-placeholder-shown:translate-y-0
                                peer-focus:scale-75 peer-focus:-translate-y-4'>Email</label>
                            </div>
                            <div className="mb-4 relative">
                            <input
                                type="password"
                                placeholder=" "
                                className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition 
                                disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                                <label className='absolute text-md duration-150 transform -translate-y-3 top-5 z-5 origin-[0] left-4 peer-placeholder-shown:scale-200 peer-placeholder-shown:translate-y-0
                                peer-focus:scale-75 peer-focus:-translate-y-4'>Password</label>
                            </div>

                            <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">Login</button>

                            <div className="flex mt-5 justify-center items-center text-gray-600">
                                <span className="border-t w-1/2 border-2"></span>
                                <span className="px-2 text-slate-500">or</span>
                                <span className="border-t w-1/2 border-2"></span>
                            </div>
                            <button className="w-full mt-5 border-2 font-medium py-3 rounded-md hover:bg-slate-100 flex items-center justify-center">
                                <FcGoogle className="mr-2" />
                                <p className="text-center">Sign in with Google</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SignIn