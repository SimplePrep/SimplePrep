import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimationControls } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoFlame } from 'react-icons/go';
import DashboardImg from '../assets/dashboardView.png';
import TestPageImg from '../assets/TestPageImg.png';
import AnalyticsImg from '../assets/AnalyticsPageImg.png';
import {
  BiBrain, 
  BiTargetLock,
  BiBarChartAlt2, 
  BiGroup,
  BiBook,
  BiChevronRight 
} from 'react-icons/bi';
import SeamlessConnection from './SeamlessConnection';
import MouseClickAnimation from './features/MouseClickAnimation';

// Type Definitions
interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

const bg_purple = {
  background: 'rgb(236 230 255/var(--tw-bg-opacity))',
};

const bg_green = {
  background: 'rgb(230 245 237/var(--tw-bg-opacity))',
};

interface SeamlessCard {
  point: string;
  description: string;
  image: string;
}

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  seamlessContent: {
    title: string;
    cards: SeamlessCard[];
  };
}


// Animation variants
const fadeUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const statsGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const statItemVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const featuresGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const featureCardVariants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Static Data
const stats: StatItem[] = [
  { icon: BiGroup, label: 'Active Students', value: '100+' },
  { icon: BiTargetLock, label: 'Exam Confidence', value: '99%' },
  { icon: BiBook, label: 'Practice Questions', value: '1,000+' },
  { icon: BiBrain, label: 'Expert Tutors', value: '10+' }
];

const features: FeatureItem[] = [
  {
    icon: BiBrain,
    title: 'Smart Practice Engine',
    description: 'AI-powered system adapts to your performance, focusing on areas where you need improvement',
    features: ['Personalized question sets', 'Real-time difficulty adjustment'],
    seamlessContent: {
      title: 'Seamless Integration with Your Learning',
      cards: [
        {
          point: 'Real-time analytics',
          description: 'Track your performance with real-time data across all modules.',
          image: DashboardImg,
        },
        {
          point: 'Performance tracking',
          description: 'Monitor your progress and identify areas where you need improvement.',
          image: DashboardImg,
        },
        {
          point: 'Comprehensive feedback',
          description: 'Receive detailed feedback after every practice session to enhance learning.',
          image: DashboardImg,
        }
      ]
    }
  },
  {
    icon: BiTargetLock,
    title: 'Authentic Digital Format',
    description: 'Practice in an environment identical to the actual Digital SAT testing platform',
    features: ['Same tools and features', 'Identical timing system'],
    seamlessContent: {
      title: 'Seamless Testing Experience',
      cards: [
        {
          point: 'Digital tools',
          description: 'Use tools like a digital calculator and notepad identical to the actual SAT platform.',
          image: TestPageImg,
        },
        {
          point: 'Real-time feedback',
          description: 'Get immediate feedback on your answers to know what went wrong and why.',
          image: TestPageImg,
        },
        {
          point: 'Identical format',
          description: 'Practice in a testing environment that mimics the real SAT.',
          image: TestPageImg,
        }
      ]
    }
  },
  {
    icon: BiBarChartAlt2,
    title: 'Detailed Analytics',
    description: 'Track your progress with comprehensive performance insights and improvement recommendations',
    features: ['Topic-wise breakdown', 'Score predictions'],
    seamlessContent: {
      title: 'Detailed Performance Insights',
      cards: [
        {
          point: 'Score tracking',
          description: 'Track your scores and improvements after every test.',
          image: AnalyticsImg,
        },
        {
          point: 'Topic analysis',
          description: 'Analyze your strengths and weaknesses topic by topic.',
          image: AnalyticsImg,
        },
        {
          point: 'Growth metrics',
          description: 'Measure your overall growth and get recommendations for improvement.',
          image: AnalyticsImg,
        }
      ]
    }
  }
];


const Hero: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [showClickAnimation, setShowClickAnimation] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const heroControls = useAnimation();
  const statsControls = useAnimation();
  const featuresControls = useAnimation();
  const ctaControls = useAnimation();

  // InView hooks
  const heroInView = useInView(heroRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible');
    }
  }, [heroInView, heroControls]);

  useEffect(() => {
    if (statsInView) {
      statsControls.start('visible');
    }
  }, [statsInView, statsControls]);

  useEffect(() => {
    if (featuresInView) {
      featuresControls.start('visible');
    }
  }, [featuresInView, featuresControls]);

  useEffect(() => {
    if (ctaInView) {
      ctaControls.start('visible');
    }
  }, [ctaInView, ctaControls]);

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(selectedFeature === index ? null : index);
    setShowClickAnimation(false); // Stop showing MouseClickAnimation on click
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);  // Set isMobile based on screen width < 640px (Tailwind's sm breakpoint)
    };

    handleResize();  // Run on component mount
    window.addEventListener('resize', handleResize);  // Attach the listener

    return () => {
      window.removeEventListener('resize', handleResize);  // Clean up the listener
    };
  }, []);
  return (
    <div className="w-full bg-gradient-to-b from-indigo-100 via-white to-indigo-100 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-fixed" />
      
      <motion.div 
        ref={heroRef}
        variants={staggerContainerVariants}
        initial="hidden"
        animate={heroControls}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
      >
        {/* Hero Section */}
        <motion.div 
          ref={heroRef}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={heroControls}
          className="text-center mb-24"
        >
          <motion.div variants={fadeUpVariants} className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full mb-8 border-2 border-white">
            <GoFlame className="w-4 h-4 text-indigo-600 mr-2" />
            <span className="text-indigo-600 font-medium">New Digital SAT Format</span>
          </motion.div>
          
          <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold text-indigo-900 mb-8 leading-tight text-center">
            Master the
            <span className="relative ml-2">
              <span className="relative z-10 px-2 text-white">Digital SAT</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform -skew-y-2 rounded" />
            </span>
            <br />with Confidence
          </motion.h1>
          
          <motion.p variants={fadeUpVariants} className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            Join thousands of students achieving their dream scores with SimplePrep's
            comprehensive Digital SAT preparation platform
          </motion.p>
          
          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/signup" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-lg overflow-hidden bg-indigo-600 hover:bg-indigo-700 transition-colors">
              <div className="absolute inset-0 w-3 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-10" />
              <span className="relative text-white font-medium">Start Free Trial</span>
            </Link>
            <Link to="/practice-test" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors">
              Take Practice Test
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          variants={statsGridVariants}
          initial="hidden"
          animate={statsControls}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="relative group"
              variants={statItemVariants}>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl transform transition-transform group-hover:scale-105" />
              <div className="relative p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-indigo-600" />
                <div className="font-bold text-2xl text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div 
            ref={featuresRef}
            variants={featuresGridVariants}
            initial="hidden"
            animate={featuresControls}
            className="relative grid md:grid-cols-3 gap-8 mb-8"
          >
        {!isMobile && showClickAnimation && (
        <MouseClickAnimation 
          position={currentPosition}
          setPosition={setCurrentPosition}
        />
      )}
        {features.map((feature, index) => (
          <motion.div 
              key={index}
              variants={featureCardVariants}
              className="group relative bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-xl border border-indigo-100 cursor-pointer overflow-hidden"
              onClick={() => handleFeatureClick(index)}
            >
            {/* Highlight animation when cursor is at this position */}
            {showClickAnimation && index === currentPosition && (
              <motion.div
                className="absolute inset-0 bg-indigo-50/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            )}
            
            <div className={`absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl transition-opacity ${selectedFeature === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            <div className="relative">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-500">
                    <BiChevronRight className="w-4 h-4 mr-2 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
          
      {selectedFeature !== null && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-24"
          >
            <SeamlessConnection
              title={features[selectedFeature].seamlessContent.title}
              cards={features[selectedFeature].seamlessContent.cards}
              DashboardImg={features[selectedFeature].seamlessContent.cards[0].image}
              bg_purple={bg_purple}
              bg_green={bg_green}
            />
          </motion.div>
        )}


        {/* CTA Section */}
        <motion.div
            ref={ctaRef}
            variants={fadeUpVariants}
            initial="hidden"
            animate={ctaControls}
            className="relative mb-24"
          >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl transform -rotate-1" />
          <div className="relative bg-white rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-indigo-900 mb-6">
              Ready to Experience the Digital SAT?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Take our free diagnostic test to assess your current level and receive a personalized study plan
            </p>
            <Link 
              to="/diagnostic-test" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              Start Free Diagnostic Test
              <BiChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};


const ClickIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
      transition={{
        duration: 2,
        times: [0, 0.2, 0.8, 1],
        repeat: 1
      }}
    >
      <div className="relative">
        <svg 
          className="w-8 h-8 text-indigo-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M12 5a5 5 0 0 1 5 5v4a5 5 0 0 1-10 0v-4a5 5 0 0 1 5-5z" />
          <path d="M12 10v3" />
        </svg>
        
        <motion.div
          className="absolute -right-1 top-1/2 w-3 h-3 bg-indigo-400 rounded-full"
          animate={{
            scale: [1, 2],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
      </div>
    </motion.div>
  );
};

export default Hero;
