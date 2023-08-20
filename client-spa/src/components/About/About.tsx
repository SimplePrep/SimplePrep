import React from 'react';
import Typed from 'react-typed';
import Banket from '../assets/visual1.png'

const About = () => {
  return (
    <div className='flex mt-[150px]  max-w-[1240px] mx-auto justify-center items-center'>
        <div className='flex flex-col gap-5 text-center'>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold py-6 text-purple-700'>There is a better way to practice</h1>
            <p className='md:text-4xl sm:text-4xl text-3xl font-medium py-5'>Welcome to SimplePrep, a platform where you can:</p>
            <Typed className='md:text-3xl sm:3xl text-2xl font-semibold text-purple-500' strings={["Unleash Your SAT Superpowers", "Elavate Your Score", "Surpass Your Limits!"]} typeSpeed={60} backSpeed={40} loop/>
            <img src={Banket} alt="Landing Page Banket" />
        </div>
        
    </div>
  )
}

export default About;