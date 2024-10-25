import React, { useState, useEffect } from 'react';
import { Brain, Target, Search, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Brain,
    title: "Question Analysis AI",
    description: "Our AI analyzes every practice test question you complete, identifying exactly why you got questions wrong and how to improve.",
    benefits: [
      "Identifies knowledge gaps in specific topics",
      "Shows patterns in your wrong answers",
      "Suggests targeted practice questions"
    ],
    accentColor: "from-rose-400 to-orange-400",
    bgAccent: "bg-rose-950/20"
  },
  {
    icon: Target,
    title: "Study Time Optimizer",
    description: "Stop wasting time studying the wrong topics. Get a personalized study schedule based on your weak areas and test date.",
    benefits: [
      "Creates daily study schedules",
      "Prioritizes your weakest topics",
      "Adjusts plans based on your progress"
    ],
    accentColor: "from-violet-400 to-purple-400",
    bgAccent: "bg-violet-950/20"
  },
  {
    icon: Search,
    title: "Test Strategy Coach",
    description: "Learn exactly how to approach each question type with personalized strategies based on your thinking style.",
    benefits: [
      "Question-specific timing advice",
      "Step-by-step solution methods",
      "Practice technique recommendations"
    ],
    accentColor: "from-blue-400 to-cyan-400",
    bgAccent: "bg-blue-950/20"
  },
  {
    icon: TrendingUp,
    title: "Score Predictor",
    description: "Track your projected test score based on practice performance and see exactly what you need to improve to reach your target.",
    benefits: [
      "Real-time score predictions",
      "Topic-by-topic scoring analysis",
      "Custom improvement roadmap"
    ],
    accentColor: "from-emerald-400 to-teal-400",
    bgAccent: "bg-emerald-950/20"
  }
];

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const slideInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const slideInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const FeatureShowcase = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
  
    useEffect(() => {
      if (!isHovering) {
        const interval = setInterval(() => {
          setActiveFeature((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(interval);
      }
    }, [isHovering]);
  
    const Feature = features[activeFeature];
  
    return (
      <div className="w-full min-h-screen bg-gray-950 text-white relative overflow-hidden">
        {/* Background Elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1a1a1a,transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#0f0f0f,transparent)]" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-[-250px] left-[-200px] w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute top-[-200px] right-[-300px] w-[600px] h-[600px] bg-gradient-to-l from-rose-500/20 to-orange-500/20 rounded-full blur-3xl"
          />
        </motion.div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          {/* Header */}
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <motion.div 
              variants={fadeIn}
              className="relative inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur" />
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
                  DSAT • AI Test Prep • Future of Learning
                </span>
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
              </div>
            </motion.div>
  
            <motion.h1 
              variants={staggerChildren}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              <motion.span 
                variants={fadeIn}
                className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text"
              >
                Your AI Test Prep Assistant
              </motion.span>
            </motion.h1>
  
            <motion.p 
              variants={fadeIn}
              className="text-lg max-w-2xl mx-auto"
            >
              <span className="text-gray-400">Stop studying blindly. Our AI analyzes your practice tests to create a</span>
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text font-medium">
                {' '}personalized study plan{' '}
              </span>
              <span className="text-gray-400">that focuses on exactly what you need to improve.</span>
            </motion.p>
          </motion.div>
  
          {/* Feature Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Navigation */}
            <motion.div 
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.button
                    key={index}
                    variants={fadeIn}
                    onClick={() => setActiveFeature(index)}
                    className={`
                      w-full text-left p-6 rounded-2xl backdrop-blur-sm transition-all duration-500
                      ${index === activeFeature ? 
                        `${feature.bgAccent} ring-1 ring-white/10` : 
                        'hover:bg-white/5'
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`
                        p-3 rounded-xl bg-gradient-to-br ${feature.accentColor}
                        ${index === activeFeature ? 'scale-110' : 'scale-100'}
                        transition-transform duration-500
                      `}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`
                          text-lg font-semibold mb-1 transition-colors duration-500
                          ${index === activeFeature ? 'text-white' : 'text-gray-300'}
                        `}>
                          {feature.title}
                        </h3>
                        <p className={`
                          text-sm transition-colors duration-500
                          ${index === activeFeature ? 'text-gray-300' : 'text-gray-500'}
                        `}>
                          {feature.description}
                        </p>
                      </div>
                      <ChevronRight className={`
                        ml-auto flex-shrink-0 w-5 h-5 transition-all duration-500 mt-1
                        ${index === activeFeature ? 'opacity-100' : 'opacity-0'}
                      `} />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
  
            {/* Feature Preview */}
            <motion.div 
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`
                p-8 rounded-2xl bg-white/5 backdrop-blur-sm
                ring-1 ring-white/10 transition-all duration-500
              `}>
                <div className={`
                  absolute top-0 left-0 w-full h-full rounded-2xl
                  bg-gradient-to-br ${Feature.accentColor} opacity-5
                `} />
                
                <div className="relative">
                  <div className={`
                    p-4 rounded-xl bg-gradient-to-br ${Feature.accentColor}
                    w-16 h-16 flex items-center justify-center mb-6
                  `}>
                    <Feature.icon className="w-8 h-8 text-white" />
                  </div>
  
                  <h3 className="text-2xl font-bold mb-4">{Feature.title}</h3>
                  <p className="text-gray-400 mb-8">{Feature.description}</p>
  
                  <motion.div 
                    variants={staggerChildren}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    {Feature.benefits.map((benefit, index) => (
                      <motion.div 
                        key={index}
                        variants={fadeIn}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${Feature.accentColor}`} />
                        {benefit}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  };

export default FeatureShowcase;