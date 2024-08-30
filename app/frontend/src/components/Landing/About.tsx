import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Banket from "../assets/guy-lesson.jpg";
import { Link } from 'react-router-dom';
import WomanImg from '../assets/aboutPageWoman.png';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Monthly Revenue',
      data: [30, 45, 40, 55, 50],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
      barThickness: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        display: true,
        color: '#333',
        font: { size: 10 },
      },
    },
    y: {
      beginAtZero: true,
      grid: { display: false },
      ticks: { display: false },
      max: 60,
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#fff',
      displayColors: false,
      cornerRadius: 4,
      xPadding: 10,
      yPadding: 10,
    },
  },
  layout: {
    padding: { left: 10, right: 10, top: 10, bottom: 10 },
  },
  elements: {
    bar: { borderRadius: 10 },
  },
};

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 50 },
    },
  };

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20 md:mt-0">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl sm:-top-80 overflow-hidden" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <motion.div
        className="min-h-screen flex flex-col lg:flex-row max-w-[1200px] mx-auto items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        ref={ref}
      >
        <motion.div className="w-full lg:w-[45%] py-8 sm:py-12 lg:py-24 flex flex-col justify-center" variants={itemVariants}>
          <div className="px-4 sm:px-6 lg:px-10 space-y-6 sm:space-y-10">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="p-2 rounded-full border border-slate-400 text-xs sm:text-sm font-bold text-gray-700">
                🚀 New features are coming up!
              </div>
            </div>

            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00df9a] to-[#00c088]">master</span> the digital SAT?
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-gray-600">
                Our data-driven tools spotlight knowledge gaps, helping you optimize prep time and master the concepts that matter most.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 py-3 bg-[#00df9a] text-white text-lg font-semibold rounded-full shadow-md hover:bg-[#00c088] transition-transform transform hover:-translate-y-1 duration-300 ease-in-out text-center"
              >
                Get Started
              </Link>
              <Link to="/login" className="text-lg font-semibold text-gray-900 hover:text-[#00df9a] flex items-center justify-center sm:justify-start transition duration-300 ease-in-out">
                Our Features
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div className="w-full lg:w-[55%]  flex flex-col items-center justify-center relative mt-8 lg:mt-0" variants={imageVariants}>
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mb-4 mt-20">
            <div className="w-full h-full bg-[#FFE5B4] rounded-full overflow-hidden shadow-xl">
              <img src={WomanImg} className="w-full h-full object-cover" alt="smiling person" />
            </div>
            <div className="absolute top-0 -right-4 sm:-right-10 p-4 text-3xl sm:text-4xl font-bold text-[#00df9a]">+75%</div>

            <motion.div className="absolute -bottom-4 -left-16 sm:-left-28 transform translate-x-[-50%] translate-y-[-50%] bg-neutral-100 p-2 sm:p-4 rounded-xl shadow-2xl border"
              variants={itemVariants}
            >
              <p className='text-black text-center text-xs sm:text-sm'>Monthly Progress</p>
              <div className="w-32 h-24 sm:w-40 sm:h-32">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </motion.div>
          </div>
          <div className="space-y-4 w-full max-w-xs mt-2">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4H8l4-8v8h3l-4 8z" />
                        </svg>
                    </div>
                    <span className="font-medium">Personalized Learning Paths</span>
                </div>
                <span className="text-[#00df9a]">&gt;</span>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="font-medium">Expert Insights & Feedback</span>
                </div>
                <span className="text-[#00df9a]">&gt;</span>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.962 7.962 0 00-2-5.255V4a4 4 0 00-8 0v1.745A7.962 7.962 0 006 11v3.159c0 .538-.214 1.055-.595 1.438L4 17h5m6 0v2a2 2 0 11-4 0v-2m4 0H9" />
                        </svg>
                    </div>
                    <span className="font-medium">Progress Tracking & Analytics</span>
                </div>
                <span className="text-[#00df9a]">&gt;</span>
            </div>
        </div>
        </motion.div>
      </motion.div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
};

export default About;