import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import WomanImg from '../assets/aboutPageWoman.png';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define interface for feature
interface Feature {
  title: string;
  icon: string;
  color: string;
}

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [{
    label: 'Monthly Progress',
    data: [30, 45, 40, 55, 50],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    borderRadius: 6,
    borderSkipped: false,
    barThickness: 8,
  }],
};

const chartOptions: ChartOptions<'bar'> = {
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
      padding: 8,
      titleFont: {
        size: 12,
        weight: 'bold' as const, // Type assertion to prevent string literal type error
      },
      bodyFont: {
        size: 11,
        weight: 'normal' as const,
      },
    },
  },
};

const About = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50 }
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

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleFeatureClick = (feature: Feature) => {
    switch(feature.title) {
      case "Personalized Learning Paths":
        navigate('/learning-paths');
        break;
      case "Real-Time Analytics":
        navigate('/analytics');
        break;
      case "Expert-Led Content":
        navigate('/expert-content');
        break;
      default:
        break;
    }
  };

  const features: Feature[] = [
    {
      title: "Personalized Learning Paths",
      icon: "⚡",
      color: "bg-indigo-500"
    },
    {
      title: "Real-Time Analytics",
      icon: "📊",
      color: "bg-purple-500"
    },
    {
      title: "Expert-Led Content",
      icon: "🎯",
      color: "bg-indigo-400"
    }
  ];



  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20 md:mt-10">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-600 to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <motion.div
        className="min-h-screen flex flex-col lg:flex-row max-w-[1200px] mx-auto items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        ref={ref}
      >
        {/* Left Content Section */}
        <motion.div 
          className="w-full lg:w-[45%] py-8 sm:py-12 lg:py-24 flex flex-col justify-center"
          variants={itemVariants}
        >
          <div className="space-y-8">
            <motion.button 
              className="inline-flex items-center px-4 py-2  rounded-full border border-indigo-300 cursor-pointer hover:bg-indigo-200 transition-colors"
              variants={itemVariants}
              onClick={() => navigate('/features')}
            >
              <span className="mr-2">🚀</span>
              <span className="text-sm font-semibold text-indigo-600">New features are coming up!</span>
            </motion.button>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">master</span> the digital SAT?
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-gray-600">
                Our data-driven tools spotlight knowledge gaps, helping you optimize prep time and master the concepts that matter most.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={handleGetStarted}
              className="z-10 w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5 ease-out cursor-pointer"
            >
              <span className="flex items-center justify-center">
                Get Started
                <BiChevronRight className="w-5 h-5 ml-2" />
              </span>
            </button>
            </div>
          </div>
        </motion.div>

        {/* Right Content Section */}
        <motion.div 
          className="w-full lg:w-[55%] flex flex-col items-center justify-center relative mt-8 lg:mt-0"
          variants={itemVariants}
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            <motion.div 
              className="w-full h-full bg-red-200 rounded-full overflow-hidden shadow-xl cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate('/success-stories')}
            >
              <img src={WomanImg} className="w-full h-full object-cover" alt="Student success" />
            </motion.div>

            <motion.div 
              className="absolute top-0 -right-14 sm:-right-10 p-4 bg-white rounded-xl shadow-lg cursor-pointer"
              variants={itemVariants}
              onClick={() => navigate('/success-metrics')}
            >
              <span className="text-3xl sm:text-4xl font-bold text-indigo-600">+75%</span>
              <span className="block text-sm text-gray-600 mt-1">Score Increase</span>
            </motion.div>

            <motion.div 
              className="absolute -bottom-4 -left-16 sm:-left-28 bg-white p-4 rounded-xl shadow-lg cursor-pointer"
              variants={itemVariants}
              onClick={() => navigate('/progress')}
            >
              <p className="text-gray-800 font-medium mb-2 text-sm">Monthly Progress</p>
              <div className="w-32 h-24 sm:w-40 sm:h-32">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </motion.div>
          </div>

          <div className="space-y-4 w-full max-w-md mt-12">
            {features.map((feature, index) => (
              <motion.button
                key={index}
                className="w-full group flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -2 }}
                onClick={() => handleFeatureClick(feature)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 ${feature.color} rounded-full flex items-center justify-center text-white`}>
                    {feature.icon}
                  </div>
                  <span className="font-medium text-gray-800">{feature.title}</span>
                </div>
                <BiChevronRight className="w-5 h-5 text-indigo-600 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-600 to-purple-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};

export default About;