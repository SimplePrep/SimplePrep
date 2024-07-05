import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Banket from "../assets/guy-lesson.jpg";
import { Link } from 'react-router-dom';

const About = () => {
  const divStyle = {
    backgroundImage: `url(${Banket})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '550px',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
      },
    },
  };

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const inView1 = useInView(ref1, { once: true });
  const inView2 = useInView(ref2, { once: true });

  useEffect(() => {
    if (inView1) {
      controls1.start('visible');
    }
  }, [controls1, inView1]);

  useEffect(() => {
    if (inView2) {
      controls2.start('visible');
    }
  }, [controls2, inView2]);

  return (
    <div className="h-full mt-10 relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl sm:-top-80 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <motion.div
        className="flex flex-col lg:flex-row max-w-[1600px] mx-auto gap-10 lg:gap-20 items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls1}
        ref={ref1}
      >
        <motion.div className="max-w-2xl py-12 sm:py-24 lg:py-48" variants={itemVariants}>
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              New features are coming up!
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-center tracking-tight text-gray-900 sm:text-6xl">
              Ready to own the digital SAT?
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
              Our data tools spotlight gaps in knowledge so you can optimize prep time and master the concepts that matter most.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-center justify-center lg:justify-center gap-x-6 gap-y-4">
              <Link
                to="/login"
                className="rounded-md bg-[#00df9a] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div className="flex justify-center items-center" variants={imageVariants}>
          <img src={Banket} className="w-full max-w-xl sm:w-[600px] rounded-3xl" alt="students studying" />
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
