import React from 'react'
import pic1 from '../assets/exam.jpg'
import pic2 from '../assets/topic_based_questions.png'
import pic4 from '../assets/Mathematics-bro.png'
import { Link } from 'react-router-dom'

const ContentUrls = [
    {
        name: 'Authentic Practice Tests',
        url: '/practice-tests',
        pic: pic1
    },
    {
        name: 'Topic Based Questions',
        url: '/topic-questions',
        pic: pic2
    },
    {
        name: 'English & Writing',
        url: '/english&writing-practice',
        pic: pic2
    },
    {
        name: 'Math',
        url: '/math-practice',
        pic: pic4
    }
]

const Contents = () => {
  return (
    <div className='h-full w-full'>
        <div className='max-w-[1450px] mx-auto'>
            <p className='p-5 text-4xl font-bold text-center text-[#00df9a]'>Contents</p>
            <div className='my-24 grid lg:grid-cols-4 gap-5'>
                {ContentUrls.map((content) => (
                    <div className=' bg-white border-dashed border-cyan-100 rounded-2xl items-center shadow-lg hover:scale-105 duration-300'>
                        <p className='text-center p-4 text-xl font-bold'>{content.name}</p>
                        <hr />
                        <img className='w-full' src={content.pic} alt="" />
                        <Link to={content.url}><p className='text-center mx-24 p-3 font-medium rounded-xl bg-green-500'>Get Started</p></Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Contents;