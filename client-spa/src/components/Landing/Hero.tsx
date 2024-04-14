import React from 'react'
import pic1 from '../assets/Exams-amico.png'
import pic2 from '../assets/presentation-amico.png'
import pic3 from '../assets/visual2.jpg'
import studentStress from '../assets/Student-stress.png'
import pic4 from '../assets/Leader-bro.png'
import pic5 from '../assets/Chat bot-bro.png'
import pic6 from '../assets/discussion.png'
import {ReactComponent as WaveSVG} from '../assets/waveSvg.svg'
import pic7 from '../assets/girl-smiling.png'
import pic8 from '../assets/cheerful-sassy-redhead-female-student-college-girl-glasses-sitting-crossed-legs-with-laptop-wo.jpg'
import laptopImg from '../assets/laptopImg.png'
import contentIcon from '../assets/contents.png'
import blogImg from '../assets/blogbackground.png'
import blogIcon from '../assets/blogicon.png'
import chatbotImg from '../assets/chatbotImg.png'
import studentImg from '../assets/student_discussion.jpg'
const Hero = () => {
    const divStyle = {
        backgroundImage: `url(${pic8})`,
        backgroundSize: 'cover', // You can adjust this to 'contain' or other values
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        width: '100%', // Set the width and height as needed
        height: '550px', // Set the height as needed
      };
      const bg_purple = {
        background: 'rgb(236 230 255/var(--tw-bg-opacity))',
      }
      const bg_green = {
        background: 'rgb(230 245 237/var(--tw-bg-opacity))',
      }
  return (
    <div className='w-full block py-32  mx-auto'>
        <WaveSVG />
        <div className='bg-slate-100 rounded-b-[3rem] font-ubuntu'>
            <div style={divStyle}  className='max-w-[1400px] flex flex-1 h-[500px] mx-auto rounded-2xl shadow-2xl  shadow-teal-100 border-2 border-white '>
                <div className='p-10 ml-20 flex flex-col gap-5 justify-center'>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold text-blue-600'>Personal online learning</h1>
                    <p className='md:text-xl  font-medium text-slate-700'>Learn online - from anywhere.  </p>
                    <p className='md:text-xl  font-medium text-slate-700'>The right match for you is never limited by location or schedule.</p>
                </div>
            </div>
            <div className='max-w-[1400px] mt-10 flex flex-row gap-10 mx-auto '>
                <div style={bg_purple} className='p-20  flex-1 flex-col rounded-2xl items-center shadow-2xl shadow-teal-100 border-2 border-white' >
                    <p className='text-center font-semibold text-3xl text-blue-600'>The Platform you can trust</p>
                    <p className='text-center text-xl'>Our proven test-taking strategies and customizable study plans provide the key to exam confidence.</p>
                </div>
                <div style={bg_green} className='p-20 flex-1 flex-col  rounded-xl items-center shadow-2xl shadow-teal-100 border-2 border-white' >
                <p className='text-center font-semibold text-3xl text-blue-600'>Level up your SAT game</p>
                    <p className='text-center text-xl'>Our adaptive drills sharpen skills in context for realistic practice while expert instructors guide you every step of the way.</p>
                </div>
            </div>
            <div className='max-w-[1800px] mx-auto my-24  flex flex-row'>
                <img className='w-[70%] h-[50%]' src={laptopImg} alt="Laptop" />
                <div className='flex p-40 flex-col justify-center'>
                    <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-bold text-blue-600'>How does SimplePrep work?</h1>
                    <p className='md:text-xl my-10 font-medium text-slate-500'>
                    Feeling a bit lost about conquering the digital SAT exam? No worries - we're here to help you out! Let's kickstart your journey to success right here. Crack the Digital SAT: Ace Your Online Exam Journey! 
                    </p>
                </div>  
            </div>
            <h1 className='text-center text-5xl font-bold '>What we offer</h1>
            <div className='mt-40 max-w-[1400px] my-24 mx-auto grid md:grid-cols-2 gap-40'>
                <div className='bg-gradient-to-br from-pink-200 via-purple-100 to-purple-400 rounded-[2rem] -rotate-6'>
                    <img className='p-3 md:w-[500px] mx-auto my-4 rounded-3xl lg:w-[500px] lg:h-[500px] w-[300px] h-[300px] rotate-6' src={pic3} alt="Pic1" />
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='flex flex-row items-center gap-5'>
                        <img src={contentIcon} className='w-[100px] h-[100px] bg-green-200 rounded-2xl' alt="Content Icon" />
                        <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold'>Full Length Practice Tests and Topic-based questions</h1>
                    </div>
                    <p className='md:text-xl my-10 font-medium text-slate-500 '>
                    Discover a modern approach to SAT prep on our platform. Dive into topic-based questions(from English to Math), adaptive practice, and more. 
                    Let's make your digital SAT practice effective and exciting, all in one place!" 
                    </p>
                </div>  
            </div>
            <div className='mt-40 max-w-[1400px] my-24 mx-auto grid md:grid-cols-2 gap-20'>
                <div className='flex flex-col justify-center'>
                    <div className='flex flex-row items-center gap-5'>
                        <img src={blogIcon} className='w-[100px] h-[100px] bg-green-200 rounded-2xl' alt="Content Icon" />
                        <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold'>Keep Climbing the Ladder with Our Weekly Success Stories!</h1>
                    </div>
                    <p className='md:text-xl my-10 font-medium text-slate-500'>
                        Elevate your motivation! Our weekly success stories highlight the journeys of students who have reached new heights and conquered challenges.
                        Join this inspiring ascent and pave the way for your own success story.
                    </p>
                </div>  
                <img className='rounded-3xl w-[1000px] h-[500px]' src={blogImg} alt="Pic1" />
            </div>
            <div className='mt-40 max-w-[1400px] my-24 mx-auto grid md:grid-cols-2 gap-20'>
                <div className='bg-gradient-to-br from-pink-200 via-purple-100 to-purple-400 rounded-[2rem]'>
                    <img className='h-[500px] w-[800px]' src={chatbotImg} alt="Pic1" />
                </div>
                <div className='flex flex-col justify-center'>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold'>Got Test Questions? Just Ask!</h1>
                    <p className='md:text-xl my-10 font-medium text-slate-500'>
                        Connect with our AI-powered chatbot for any questions about your test. 
                        Whether it's exam strategies or understanding content, our chatbot has you covered. Get personalized support with a simple message!
                    </p>
                </div>  
            </div>
            <div className='mt-40 max-w-[1400px] my-24 mx-auto grid md:grid-cols-2'>
                <div className='flex flex-col justify-center'>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold'>Curious to Learn More?</h1>
                    <p className='md:text-xl my-10 font-medium text-slate-500'>
                        Join the Conversation in Our Discussion Channels!
                        Connect with fellow students in our dedicated Discord and Slack channels, where you can discuss upcoming exams and get valuable insights.
                    </p>
                    <div className='items-center'>
                        <button className='p-3 bg-[#00df9a] sm:p-1 rounded-lg'><a href='/sign-in' className='p-5 text-2xl font-medium'>Join US</a></button>
                    </div>
                </div>
                    <div className='bg-white rounded-[2rem] rotate-6 mb-20'> 
                        <img className='p-10 rounded-[4rem] -rotate-6' src={studentImg} alt="Pic1" />
                    </div>
            </div>
        </div>  
    </div>
  )
}

export default Hero