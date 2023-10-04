import React from 'react';
import Banket from "../assets/visual1.png"

const About = () => {
  return (
    <div className='flex mt-[150px]  max-w-[1240px] mx-auto justify-center items-center'>
        <div className='flex flex-col gap-5 text-center  font-roboto'>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold py-6 text-purple-700'>There is a better way to practice</h1>
            <p className='md:text-4xl sm:text-4xl text-3xl font-medium py-5'>Welcome to <span className='text-purple-600'>SimplePrep</span>, a platform where you can:</p>
            <p className='md:text-3xl sm:3xl text-2xl font-semibold text-purple-500'>"Unleash Your SAT Superpowers", "Elavate Your Score", "Surpass Your Limits!"</p>
            <img src={Banket} alt="Landing Page Banket" />
        </div>
        
    </div>
  )
}

export default About;