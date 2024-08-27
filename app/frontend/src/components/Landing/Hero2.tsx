import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import pic3 from '../assets/visual2.jpg';
import { ReactComponent as WaveSVG } from '../assets/waveSvg.svg';
import pic8 from '../assets/cheerful-sassy-redhead-female-student-college-girl-glasses-sitting-crossed-legs-with-laptop-wo.jpg';
import laptopImg from '../assets/laptopImg.png';
import contentIcon from '../assets/contents.png';
import blogImg from '../assets/blogbackground.png';
import blogIcon from '../assets/blogicon.png';
import studentImg from '../assets/student_discussion.jpg';
import { Link } from 'react-router-dom';
import DashboardImg from '../assets/dashboardView.png';

const Hero = () => {
  const divStyle = {
    backgroundImage: `url(${pic8})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '550px',
  };

  const bg_purple = {
    background: 'rgb(236 230 255/var(--tw-bg-opacity))',
  };

  const bg_green = {
    background: 'rgb(230 245 237/var(--tw-bg-opacity))',
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
        duration: 5,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        duration: 5,
      },
    },
  };

  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(null);
  const ref4 = React.useRef(null);
  const ref5 = React.useRef(null);
  const ref6 = React.useRef(null);

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();
  const controls6 = useAnimation();

  const inView1 = useInView(ref1, { once: true });
  const inView2 = useInView(ref2, { once: true });
  const inView3 = useInView(ref3, { once: true });
  const inView4 = useInView(ref4, { once: true });
  const inView5 = useInView(ref5, { once: true });
  const inView6 = useInView(ref6, { once: true });

  React.useEffect(() => {
    if (inView1) controls1.start('visible');
    if (inView2) controls2.start('visible');
    if (inView3) controls3.start('visible');
    if (inView4) controls4.start('visible');
    if (inView5) controls5.start('visible');
    if (inView6) controls6.start('visible');
  }, [controls1, controls2, controls3, controls4, controls5, controls6, inView1, inView2, inView3, inView4, inView5, inView6]);

  return (
    <motion.div id='our-vision' className="w-full block py-10 md:py-20 mx-auto overflow-x-hidden">
      <WaveSVG className="w-full" />
      <div className="bg-slate-100 rounded-b-[3rem] font-ubuntu px-4 md:px-6 lg:px-10">
      <div className="max-w-[900px] mx-auto pb-10 bg-slate-100 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900">Welcome to SimplePrep</h1>
          <p className="text-lg md:text-xl text-gray-700 mt-4">
            SimplePrep empowers your learning journey with personalized insights, progress tracking, and motivational tools to help you achieve your educational goals.
          </p>
        </div>
        <motion.div
            className="w-full max-w-[1250px] flex flex-col lg:flex-row h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] mx-auto rounded-2xl shadow-2xl shadow-teal-100 border-8 border-[#d3d6fe] bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-400 opacity-90"
            variants={imageVariants}
            ref={ref1}
            initial="hidden"
            animate={controls1}
            >
            <motion.div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-3 md:gap-5 justify-center rounded-2xl m-4" variants={itemVariants}>
            <img 
                src={DashboardImg} 
                alt="Dashboard" 
                className="rounded-2xl w-full h-full object-cover sm:object-contain sm:w-auto sm:h-auto"
            />
            </motion.div>
        </motion.div>
        <div className="max-w-[1250px] mt-10 flex flex-col lg:flex-row gap-6 md:gap-10 mx-auto">
          <motion.div
            style={bg_purple}
            className="p-6 md:p-10 lg:p-14 flex-1 flex-col rounded-2xl items-center shadow-2xl shadow-teal-100 border-2 border-white"
            variants={itemVariants}
            ref={ref2}
            initial="hidden"
            animate={controls2}
          >
            <p className="text-center font-semibold text-lg md:text-xl lg:text-2xl text-blue-600">The Platform you can trust</p>
            <p className="text-center text-sm md:text-base lg:text-lg mt-2">Our proven test-taking strategies and customizable study plans provide the key to exam confidence.</p>
          </motion.div>
          <motion.div
            style={bg_green}
            className="p-6 md:p-10 lg:p-14 flex-1 flex-col rounded-2xl items-center shadow-2xl shadow-teal-100 border-2 border-white"
            variants={itemVariants}
            ref={ref3}
            initial="hidden"
            animate={controls3}
          >
            <p className="text-center font-semibold text-lg md:text-xl lg:text-2xl text-blue-600">Level up your SAT game</p>
            <p className="text-center text-sm md:text-base lg:text-lg mt-2">Our adaptive drills sharpen skills in context for realistic practice while expert instructors guide you every step of the way.</p>
          </motion.div>
        </div>
        <div className="max-w-[1800px] mx-auto my-16 md:my-24 flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-0">
          <motion.img
            className="w-full lg:w-[60%] h-auto lg:h-[50%] object-contain"
            src={laptopImg}
            alt="Laptop"
            variants={imageVariants}
            ref={ref4}
            initial="hidden"
            animate={controls4}
          />
          <motion.div className="flex p-6 md:p-10 lg:p-20 flex-col justify-center" variants={itemVariants} ref={ref4} initial="hidden" animate={controls4}>
            <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">How does SimplePrep work?</h1>
            <p className="text-base md:text-lg my-6 md:my-10 font-medium text-slate-500">
              Feeling a bit lost about conquering the digital SAT exam? No worries - we're here to help you out! Let's kickstart your journey to success right here. Crack the Digital SAT: Ace Your Online Exam Journey!
            </p>
          </motion.div>
        </div>
        <h1 id='product' className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">What we offer</h1>
        <div className="mt-10 lg:mt-20 max-w-[1400px] my-16 md:my-24 mx-auto grid gap-10 md:gap-20 lg:gap-40 md:grid-cols-2">
            <motion.div className="flex flex-col justify-center" variants={itemVariants} ref={ref5} initial="hidden" animate={controls5}>
                <div className="flex flex-row items-center gap-3 md:gap-5">
                <img src={contentIcon} className="w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] bg-green-200 rounded-2xl" alt="Content Icon" />
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">Full Length Practice Tests and Topic-based questions</h1>
                </div>
                <p className="p-2 text-base md:text-lg my-6 md:my-10 font-medium text-slate-500">
                Discover a modern approach to SAT prep on our platform. Dive into topic-based questions (from English to Math), adaptive practice, and more. Let's make your digital SAT practice effective and exciting, all in one place!
                </p>
            </motion.div>
            <motion.div
                className="bg-gradient-to-br from-pink-200 via-purple-100 to-purple-400 rounded-[2rem] -rotate-6"
                variants={imageVariants}
                ref={ref5}
                initial="hidden"
                animate={controls5}
            >
                <img className="p-3 w-[300px] md:w-[400px] mx-auto my-4 rounded-3xl lg:w-[400px] lg:h-[400px] h-[300px] rotate-6 object-cover" src={pic3} alt="Pic1" />
            </motion.div>
        </div>
        <div className="mt-10 lg:mt-20 max-w-[1400px] my-16 md:my-24 mx-auto grid gap-10 md:gap-20 lg:gap-40 md:grid-cols-2">
          <motion.img
            className="rounded-3xl w-full lg:w-[800px] lg:h-[400px] object-cover"
            src={blogImg}
            alt="Pic1"
            variants={imageVariants}
            ref={ref6}
            initial="hidden"
            animate={controls6}
          />
          <motion.div className="flex flex-col justify-center p-2" variants={itemVariants} ref={ref6} initial="hidden" animate={controls6}>
            <div className="flex flex-row items-center gap-3 md:gap-5">
              <img src={blogIcon} className="w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] bg-green-200 rounded-2xl" alt="Content Icon" />
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">Keep Climbing the Ladder with Our Weekly Success Stories!</h1>
            </div>
            <p className="text-base md:text-lg my-6 md:my-10 font-medium text-slate-500">
              Elevate your motivation! Our weekly success stories highlight the journeys of students who have reached new heights and conquered challenges. Join this inspiring ascent and pave the way for your own success story.
            </p>
          </motion.div>
        </div>
        <div className="p-2 mt-10 lg:mt-20 max-w-[1400px] my-16 md:my-24 mx-auto grid gap-10 md:gap-20 lg:gap-40 md:grid-cols-2">
          <motion.div
            className="flex flex-col justify-center items-center"
            variants={itemVariants}
            ref={ref6}
            initial="hidden"
            animate={controls6}
          >
            <h1 className="text-lg md:text-2xl lg:text-3xl text-center font-bold">Curious to Learn More?</h1>
            <p className="text-base md:text-lg my-6 md:my-10 font-medium text-slate-500 text-center">
              Join the Conversation in Our Discussion Channels! Connect with fellow students in our dedicated Discord and Slack channels, where you can discuss upcoming exams and get valuable insights.
            </p>
            <div className="items-center justify-center">
              <button className="p-3 bg-[#00df9a] rounded-lg items-center justify-center">
                <Link to="/login" className="p-3 md:p-5 text-base md:text-lg font-medium text-white">
                  Join Us
                </Link>
              </button>
            </div>
          </motion.div>
          <motion.div className="bg-white rounded-[2rem] -rotate-6 mb-20" variants={imageVariants} ref={ref6} initial="hidden" animate={controls6}>
            <img className="p-6 md:p-10 rounded-[4rem] rotate-1 w-full h-full object-cover" src={studentImg} alt="Pic1" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;