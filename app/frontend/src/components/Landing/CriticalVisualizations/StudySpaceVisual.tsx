import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, PenTool, Bot, BarChart2, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import NovaLogo from '../../assets/nova_headshot.png';

type Feature = {
  icon?: typeof BookOpen | typeof PenTool | typeof Bot | typeof BarChart2;
  imageUrl?: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  lightBg: string;
  iconColor: string;
  step: number;
  stats: {
    value: string;
    label: string;
  }[];
};

const features: Feature[] = [
  {
    icon: BookOpen,
    title: "Exclusive Reading Tutorials",
    description: "Start your journey with comprehensive reading tutorials featuring interactive visuals, step-by-step guides, and real-world examples. Master fundamental concepts through engaging content designed for optimal learning.",
    gradientFrom: "from-[#00C6FB]",
    gradientTo: "to-[#005BEA]",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-600",
    step: 1,
    stats: [
      { value: "200+", label: "Visual Lessons" },
      { value: "Step-by-Step", label: "Approach" },
      { value: "100%", label: "Visual Aid" }
    ]
  },
  {
    icon: PenTool,
    title: "Exclusive Writing Tutorials",
    description: "Build on your reading skills with advanced writing tutorials. Learn through visual examples, practice exercises, and immediate feedback systems that reinforce your understanding of key concepts.",
    gradientFrom: "from-[#F857A6]",
    gradientTo: "to-[#FF5858]",
    lightBg: "bg-pink-50",
    iconColor: "text-pink-600",
    step: 2,
    stats: [
      { value: "150+", label: "Practice Sets" },
      { value: "Visual", label: "Examples" },
      { value: "Instant", label: "Feedback" }
    ]
  },
  {
    imageUrl: NovaLogo, // Using an image instead of an icon
    title: "Nova AI Assistant",
    description: "Meet Nova, your intelligent study companion that works alongside tutorials. Get instant clarification, additional examples, and personalized explanations whenever you need extra support during your learning journey.",
    gradientFrom: "from-[#7F00FF]",
    gradientTo: "to-[#E100FF]",
    lightBg: "bg-purple-50",
    iconColor: "text-purple-600",
    step: 3,
    stats: [
      { value: "Always", label: "Available" },
      { value: "Context", label: "Aware" },
      { value: "Adaptive", label: "Support" }
    ]
  },
  {
    icon: BarChart2,
    title: "Progress Tracking",
    description: "Monitor your growth after each tutorial with detailed visual analytics. Track concept mastery, identify areas for review, and visualize your learning progression through interactive charts and insights.",
    gradientFrom: "from-[#43E97B]",
    gradientTo: "to-[#38F9D7]",
    lightBg: "bg-green-50",
    iconColor: "text-green-600",
    step: 4,
    stats: [
      { value: "Per Topic", label: "Analysis" },
      { value: "Visual", label: "Progress" },
      { value: "Smart", label: "Insights" }
    ]
  }
];

interface FeatureCardProps extends Feature {
  isActive: boolean;
  onMouseEnter: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  imageUrl,
  title,
  description,
  stats,
  gradientFrom,
  gradientTo,
  isActive,
  onMouseEnter,
  step
}) => (
  <motion.div
    className={`
      group relative p-4 sm:p-6 rounded-2xl transition-all duration-500 cursor-pointer
      ${isActive ? 'bg-white/10 sm:scale-105' : 'hover:bg-white/5'}
    `}
    onMouseEnter={onMouseEnter}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform group-hover:-translate-y-1 transition-all duration-700" />
    
    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
        <div className="flex flex-col items-center sm:items-start">
          <div className={`
            w-12 h-12 sm:w-16 sm:h-16 rounded-xl
            bg-gradient-to-br ${gradientFrom} ${gradientTo}
            flex items-center justify-center
            transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg
            mx-auto sm:mx-0
          `}>
            {Icon ? (
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Feature icon" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            ) : null}
          </div>
          <div className="mt-2 text-sm font-semibold text-gray-400 hidden sm:block">Step {step}</div>
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
            <div className="text-sm font-semibold text-gray-400 sm:hidden">Step {step}</div>
          </div>
          
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">{description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-2 sm:p-3 rounded-lg bg-white/5 flex flex-row sm:flex-col items-center sm:items-stretch justify-between sm:justify-start gap-2 sm:gap-0"
              >
                <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const StudySpaceVisuals: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen bg-[#0A0F1C] text-white overflow-hidden">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-green-500/10" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
          
          <motion.div
            className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
                <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">Your First Step to Success</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                  Begin Your Journey
                </span>
                <br />
                <span className="text-white">in Study Space</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Start your learning adventure with our comprehensive Study Space. Master fundamentals through visual tutorials, 
                get AI-powered support, and track your progress every step of the way.
              </p>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <ArrowRight className="w-5 h-5" />
                <span>Follow the structured learning path for optimal results</span>
              </div>
            </motion.div>

            <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
                {/* Adjusted Positioning of Study Space Circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center hidden sm:block">
                  <motion.div
                    className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform duration-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{ marginBottom: '10px' }} // Add margin to create space below the circle
                  >
                    <Sparkles className="w-12 h-12 text-white animate-bounce-twinkle" />
                  </motion.div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Study Space
                  </h2>
                  <p className="text-sm text-gray-400 mt-2">Your Foundation for Success</p>
                </div>

                {/* Adjust Spacing of the Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-32 relative mt-20"> {/* Add margin-top here */}
                  {features.map((feature, index) => (
                    <FeatureCard
                      key={index}
                      {...feature}
                      isActive={activeFeature === index}
                      onMouseEnter={() => setActiveFeature(index)}
                    />
                  ))}
                </div>
              </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default StudySpaceVisuals;
