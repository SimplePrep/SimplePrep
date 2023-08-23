import React from 'react'
import quote from '../assets/quote.png'
const Testimonials = () => {
  return (
    <div className='bg-slate-100 h-[100vh]'>
        <div className='max-w-[1240px] mx-auto w-full items-center'>
        <h1 className='text-4xl py-40 font-bold text-center'>See Our Excellence Through Their Eyes – Customer Stories in Spotlight</h1>
        <div className='w-full my-10 grid md:grid-cols-3 gap-5'>
            <div className='bg-slate-100 rounded-3xl shadow-xl hover:scale-105 duration-300'>
                <div className='bg-white rounded-t-3xl'>
                    <img className='p-5' src={quote} alt="" />
                    <p className='p-7 text-lg font-medium'>It's a super product with professional support team. I can't wait to see the future features.</p>
                </div>
                <hr className=''/>
                <p className='p-5 text-lg font-medium'>@emilypeterson</p>
            </div>
            <div className='bg-slate-100 rounded-3xl shadow-xl my-[-30px] hover:scale-105 duration-300'>
                <div className='bg-white rounded-t-3xl'>
                    <img className='p-5' src={quote} alt="" />
                    <p className='p-7  text-lg font-medium'>
                        "Professionalism in their craft! All products were super amazing with strong attention to details, comps, and overall vibe.
                    </p>
                </div>
                <hr className=''/>
                <p className='p-5  text-lg font-medium'>@AdrienJacob</p>
            </div>
            <div className='bg-slate-100 rounded-3xl shadow-xl hover:scale-105 duration-300'>
                <div className='bg-white rounded-t-3xl'>
                    <img className='p-5' src={quote} alt="" />
                    <p className='p-7 text-lg font-medium'>This product helped me grow my business by inbound marketing and sales education</p>
                </div>
                <hr className=''/>
                <p className='p-5  text-lg font-medium'>@emilypeterson</p>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Testimonials