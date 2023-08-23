import React from 'react'
import MathPic from '../assets/math.jpg'
import Example1 from '../assets/example1.jpg'
import Example2 from '../assets/example2.png'
const Blogs = () => {
  return (
    <div className='w-full h-full'>
        <div className='max-w-[1240px] mx-auto items-center'>
            <h1 className='p-5 text-center font-bold text-4xl text-[#00df9a]'>Blogs</h1>
            <div className='flex flex-col gap-5'>
                <div className='my-2 grid md:grid-cols-2 items-center'>
                    <div className='flex flex-col gap-2'>
                        <p>@alijonkarimberdiev</p>
                        <a href="">
                            <h1 className='font-bold text-2xl'>Why Blue Space is Better Than Green Space</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sequi libero dignissimos rerum natus numquam ad reiciendis quae deserunt excepturi?</p>
                        </a>
                        <div className='flex flex-row gap-2 items-center'>
                            <p>July 23</p>
                            <p className='text-gray-800 text-3xl font-bold'>·</p>
                            <p>5 min read</p>
                        </div>
                    </div>
                    <a href=""><img className='w-[300px] mx-5 my-3' src={MathPic} alt="" /></a>
                </div>
                <div className='my-2 grid md:grid-cols-2 items-center'>
                    <div className='flex flex-col gap-2'>
                        <p>@GregSatell</p>
                        <a href="">
                            <h1 className='font-bold text-2xl'>The 9 Rules Of Innovation</h1>
                            <p>The truth is that there are many paths to innovation</p>
                        </a>
                        <div className='flex flex-row gap-2 items-center'>
                            <p>Aug 17</p>
                            <p className='text-gray-800 text-3xl font-bold'>·</p>
                            <p>8 min read</p>
                        </div>
                    </div>
                    <a href=""><img className='w-[300px] mx-5 my-3' src={Example1} alt="" /></a>
                </div>
                <div className='my-2 grid md:grid-cols-2 items-center'>
                    <div className='flex flex-col gap-2'>
                        <p>@JeanHsu</p>
                        <a href="">
                            <h1 className='font-bold text-2xl'>Ask vs guess culture</h1>
                            <p>When unreasonable requests are followed up with “but you could have just said no!” Exploring the clashes of ask culture and guess</p>
                        </a>
                        <div className='flex flex-row gap-2 items-center'>
                            <p>Aug 28</p>
                            <p className='text-gray-800 text-3xl font-bold'>·</p>
                            <p>11 min read</p>
                        </div>
                    </div>
                    <a href=""><img className='w-[300px] mx-5 my-3' src={Example2} alt="" /></a>
                </div>
                
            </div>
        </div>
    </div>
    
  )
}

export default Blogs