import React from 'react'
import pic1 from '../../assets/exam.jpg'
import pic2 from '../../assets/topic_based_questions.png'
import pic4 from '../../assets/Mathematics-bro.png'
const APT = () => {
  return (
    <div className='h-full w-full'>
        <div className='max-w-[1450px] mx-auto'>
        <p className='p-5 text-4xl font-bold text-center text-[#00df9a]'>Authentic Practice Tests</p>
            <div className='my-24 grid lg:grid-cols-3 gap-10'>
                <div className=' bg-white border-dashed border-cyan-100 rounded-2xl items-center shadow-lg hover:scale-105 duration-300'>
                    <p className='text-center p-4 text-xl font-bold'>Test 1</p>
                    <hr />
                    <img className='w-full' src={pic1} alt="" />
                    <p className='text-center mx-24 p-3 font-medium rounded-xl bg-green-500'>Get Started</p>
                </div>
                <div className=' bg-slate-50 border-dashed border-cyan-100 rounded-2xl items-center shadow-lg hover:scale-105 duration-300' >
                    <p className='text-center p-4 text-xl font-bold'>Test 2</p>
                    <hr />
                    <img className='w-full' src={pic2} alt="" />
                    <p className='text-center mx-24 p-3 font-medium rounded-xl bg-green-500'>Get Started</p>
                </div>
                <div className=' bg-slate-50 border-dashed border-cyan-100 rounded-2xl items-center shadow-lg hover:scale-105 duration-300'>
                    <p className='text-center p-4 text-xl font-bold'>Test 3</p>
                    <hr />
                    <img className='w-full' src={pic2} alt="" />
                    <p className='text-center mx-24 p-3 font-medium rounded-xl bg-green-500'>Get Started</p>
                </div>
                <div className=' bg-slate-50 border-dashed border-cyan-100 rounded-2xl items-center shadow-lg hover:scale-105 duration-300'>
                    <p className='text-center p-4 text-xl font-bold'>Test 4</p>
                    <hr />
                    <img className='w-full' src={pic4} alt="" />
                    <p className='text-center mx-24 p-3 font-medium rounded-xl bg-green-500'>Get Started</p>
                </div>
                <div className=' bg-white border-dashed border-cyan-100 rounded-2xl items-center shadow-lg hover:scale-105 duration-300'>
                    <p className='text-center p-4 text-xl font-bold'>Test 1</p>
                    <hr />
                    <img className='w-full' src={pic1} alt="" />
                    <p className='text-center mx-24 p-3 font-medium rounded-xl bg-green-500'>Get Started</p>
                </div>
                <div className=' bg-slate-50 border-dashed border-cyan-100 rounded-2xl items-center shadow-lg hover:scale-105 duration-300' >
                    <p className='text-center p-4 text-xl font-bold'>Test 2</p>
                    <hr />
                    <img className='w-full' src={pic2} alt="" />
                    <p className='text-center mx-24 p-3 font-medium rounded-xl bg-green-500'>Get Started</p>
                </div>
                <div className=' bg-slate-50 border-dashed border-cyan-100 rounded-2xl items-center shadow-lg hover:scale-105 duration-300'>
                    <p className='text-center p-4 text-xl font-bold'>Test 3</p>
                    <hr />
                    <img className='w-full' src={pic2} alt="" />
                    <p className='text-center mx-24 p-3 font-medium rounded-xl bg-green-500'>Get Started</p>
                </div>
                <div className=' bg-slate-50 border-dashed border-cyan-100 rounded-2xl items-center shadow-lg hover:scale-105 duration-300'>
                    <p className='text-center p-4 text-xl font-bold'>Test 4</p>
                    <hr />
                    <img className='w-full' src={pic4} alt="" />
                    <p className='text-center mx-24 p-3 font-medium rounded-xl bg-green-500'>Get Started</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default APT