import React from 'react'
import QuoteImg from '../../../assets/quoteImg.png';

const WelcomeCard = () => {
  return (
    <div className='bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-lg text-white'>
        <div className='flex justify-between items-center'>
            <div>
                <h1 className='text-3xl font-bold mb-4'>Welcome Back, Alijon!</h1>
                <div className='bg-white/20 p-4 rounded-xl backdrop-blur-sm'>
                    <h2 className='font-bold text-xl mb-2'>Quote of the day</h2>
                    <p className='text-sm italic'>
                        "Success is not final; Failure is not fatal: It is the Courage to continue that counts" - Winston S. Churchill
                    </p>
                </div>
            </div>
            <img src={QuoteImg} alt="Quote Image" className='w-40 h-40 object-cover rounded-xl' />
        </div>
    </div>
  )
}

export default WelcomeCard