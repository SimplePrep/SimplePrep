import React from 'react'
import pic1 from './assets/Exams-amico.png'
import pic2 from './assets/presentation-amico.png'
import pic3 from './assets/visual2.jpg'
import studentStress from './assets/Student-stress.png'
import pic4 from './assets/Leader-bro.png'
import pic5 from './assets/Chat bot-bro.png'
import pic6 from './assets/discussion.png'
const Hero = () => {
  return (
    <div className='w-full py-32 px-4 mx-auto'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <img className='md:w-[500px] mx-auto my-4 lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]' src={pic1} alt="Pic1" />
            <div className='flex flex-col justify-center'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-bold text-[#00df9a]'>What happened to SAT Exam Format?</h1>
                <p className='md:text-xl my-10 font-medium text-slate-500'>Since November 2021, Collegeboard started transitioning SAT Exam from Paper based to digital format. 
                The SAT is going digital in order to make the exam easier to take, easier to give, and more relevant for students. So, The World is changing, so are we. </p>
            </div>  
        </div>
        <div className='max-w-[1240px] my-24 mx-auto grid md:grid-cols-2'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-bold text-[#00df9a]'>Feeling the stress?</h1>
                <p className='md:text-xl my-10 font-medium text-slate-500'>
                 Feeling a bit lost about conquering the digital SAT exam? No worries - we're here to help you out! Let's kickstart your journey to success right here. Crack the Digital SAT: Ace Your Online Exam Journey! 
                </p>
            </div>  
            <img className='md:w-[500px] mx-auto my-4 lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]' src={studentStress} alt="Pic1" />
        </div>
        <h1 className='text-center text-5xl font-bold text-[#00df9a]'>What we offer</h1>
        <div className='max-w-[1240px] my-24 mx-auto grid md:grid-cols-2'>
            <img className='md:w-[500px] mx-auto my-4 lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]' src={pic3} alt="Pic1" />
            <div className='flex flex-col justify-center'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-bold text-[#00df9a]'>Full Length Practice Tests and Topic-based questions</h1>
                <p className='md:text-xl my-10 font-medium text-slate-500'>
                Discover a modern approach to SAT prep on our platform. Dive into topic-based questions(from English to Math), adaptive practice, and more. 
                Let's make your digital SAT practice effective and exciting, all in one place!" 
                </p>
            </div>  
        </div>
        <div className='max-w-[1240px] my-24 mx-auto grid md:grid-cols-2'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-bold text-[#00df9a]'>Keep Climbing the Ladder with Our Weekly Success Stories!</h1>
                <p className='md:text-xl my-10 font-medium text-slate-500'>
                    Elevate your motivation! Our weekly success stories highlight the journeys of students who have reached new heights and conquered challenges.
                    Join this inspiring ascent and pave the way for your own success story.
                </p>
            </div>  
            <img className='md:w-[500px] mx-auto my-4 lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]' src={pic4} alt="Pic1" />
        </div>
        <div className='max-w-[1240px] my-24 mx-auto grid md:grid-cols-2'>
            <img className='md:w-[500px] mx-auto my-4 lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]' src={pic5} alt="Pic1" />
            <div className='flex flex-col justify-center'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-bold text-[#00df9a]'>Got Test Questions? Just Ask!</h1>
                <p className='md:text-xl my-10 font-medium text-slate-500'>
                    Connect with our AI-powered chatbot for any questions about your test. 
                    Whether it's exam strategies or understanding content, our chatbot has you covered. Get personalized support with a simple message!
                </p>
            </div>  
        </div>
        <div className='max-w-[1240px] my-24 mx-auto grid md:grid-cols-2'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-bold text-[#00df9a]'>Curious to Learn More?</h1>
                <p className='md:text-xl my-10 font-medium text-slate-500'>
                    Join the Conversation in Our Discussion Channels!
                    Connect with fellow students in our dedicated Discord and Slack channels, where you can discuss upcoming exams and get valuable insights.
                </p>
            </div>  
            <img className='md:w-[500px] mx-auto my-4 lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]' src={pic6} alt="Pic1" />
        </div>
    </div>
  )
}

export default Hero