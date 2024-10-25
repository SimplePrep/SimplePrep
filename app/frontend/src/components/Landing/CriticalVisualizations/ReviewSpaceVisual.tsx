import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Users, Brain, CheckCircle, Sparkles, Target, BarChart, Clock } from 'lucide-react';

// Define the features data
const features = [
  {
    icon: BookOpen,
    title: "Smart CheatSheet",
    description: "Quick-access reference guides that focus on concepts you missed in your practice exam. Get straight to the point with clear explanations of core concepts, common pitfalls, and key formulas.",
    gradientFrom: "from-[#FF6B6B]",
    gradientTo: "to-[#FF8E53]",
    lightBg: "bg-red-50",
    iconColor: "text-red-600",
    stats: [
      { value: "5min", label: "Quick Review" },
      { value: "98%", label: "Topic Focus" },
      { value: "2.8x", label: "Better Results" }
    ]
  },
  {
    icon: Brain,
    title: "Targeted Practice",
    description: "Practice exercises specifically tailored to the topics you struggled with. Our AI analyzes your exam mistakes and generates focused questions to strengthen your understanding.",
    gradientFrom: "from-[#4158D0]",
    gradientTo: "to-[#C850C0]",
    lightBg: "bg-purple-50",
    iconColor: "text-purple-600",
    stats: [
      { value: "100%", label: "Personalized" },
      { value: "3.5x", label: "Improvement" },
      { value: "+40%", label: "Retention" }
    ]
  },
  {
    icon: Users,
    title: "Expert Strategies",
    description: "Learn proven review strategies from top-scoring students and experts who excelled in these specific topics. Get insights into effective learning approaches and common mistake prevention.",
    gradientFrom: "from-[#0093E9]",
    gradientTo: "to-[#80D0C7]",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-600",
    stats: [
      { value: "500+", label: "Top Scorers" },
      { value: "4.9", label: "Strategy Rating" },
      { value: "92%", label: "Success Rate" }
    ]
  },
  {
    icon: CheckCircle,
    title: "Strategy Validation",
    description: "AI-powered analysis compares your approach against proven methods from top performers. Get personalized feedback on your learning strategy and suggestions for optimization.",
    gradientFrom: "from-[#8EC5FC]",
    gradientTo: "to-[#E0C3FC]",
    lightBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    stats: [
      { value: "Real-time", label: "Feedback" },
      { value: "85%", label: "Alignment" },
      { value: "3.2x", label: "Efficiency" }
    ]
  }
];

// Define types for our components
interface FeatureCardProps {
  icon: typeof BookOpen | typeof Users | typeof Brain | typeof CheckCircle;
  title: string;
  description: string;
  stats: Array<{ value: string; label: string }>;
  gradientFrom: string;
  gradientTo: string;
  isActive: boolean;
  onMouseEnter: () => void;
}


const getConnectionPath = (index: number): string => {
  const centerX = 232;
  const centerY = 232;
  const radius = 200; // Increased radius further
  const isTop = index < 2;
  const isLeft = index % 2 === 0;
  
  // Extended starting points even further
  const x1 = isLeft ? (isTop ? 20 : 20) : (isTop ? 444 : 444);
  const y1 = isTop ? 100 : 364;
  
  // Calculate circle intersection points (where lines should stop)
  const circleRadius = 90; // Radius of the area to mask
  const angle = Math.atan2(centerY - y1, centerX - x1);
  const intersectX = centerX + circleRadius * Math.cos(angle);
  const intersectY = centerY + circleRadius * Math.sin(angle);
  
  // Calculate control points for curved paths that avoid the center
  const controlPoint1X = isLeft ? 
    (x1 + radius * (isTop ? 0.4 : -0.4)) : 
    (x1 - radius * (isTop ? 0.4 : -0.4));
  const controlPoint1Y = isTop ? 
    (y1 + radius * 0.7) : 
    (y1 - radius * 0.7);
  
  const controlPoint2X = intersectX + (isLeft ? 40 : -40);
  const controlPoint2Y = intersectY + (isTop ? 40 : -40);
  
  return `M${x1},${y1} C${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${intersectX},${intersectY}`;
};


const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  stats,
  gradientFrom,
  gradientTo,
  isActive,
  onMouseEnter
}) => (
  <div
    className={`
      group relative p-4 sm:p-6 rounded-2xl transition-all duration-500 cursor-pointer
      ${isActive ? 'bg-white/10 sm:scale-105' : 'hover:bg-white/5'}
    `}
    onMouseEnter={onMouseEnter}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
    
    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
        <div className={`
          w-12 h-12 sm:w-16 sm:h-16 rounded-xl
          bg-gradient-to-br ${gradientFrom} ${gradientTo}
          flex items-center justify-center
          transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg
          mx-auto sm:mx-0
        `}>
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2 justify-center sm:justify-start">
            {title}
            {title === "Strategy Validation" && (
              <span className="text-xs font-normal px-2 py-1 bg-indigo-500/20 rounded-full">Coming Soon</span>
            )}
          </h3>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">{description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-2 sm:p-3 rounded-lg bg-white/5">
                <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ReviewSpaceVisuals: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen bg-[#0A0F1C] text-white overflow-hidden">
      {isVisible && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
          
          <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
            {/* Header Section */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
                <Target className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">Post-Practice Exam Review</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Transform Mistakes
                </span>
                <br />
                <span className="text-white">Into Mastery</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Review Space analyzes your practice exam results and creates a personalized improvement path using proven strategies from top performers.
              </p>
            </div>

            {/* Main Content Section */}
            <div className="relative">
              {/* Center Element */}
              <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative w-72 h-72">
                  {/* Background Rings */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 animate-spin-slow blur-lg" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30 animate-spin-reverse blur-md" />
                  
                  {/* Main Circle */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-b from-blue-900 to-purple-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                    <div className="relative text-center p-4">
                      <div className="mb-4">
                        <div className="relative w-16 h-16 mx-auto mb-2">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          Review Space
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-base">
                        <div className="p-2 bg-white/5 rounded-lg">
                          <BarChart className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                          <div className="font-bold text-blue-400 ">95%</div>
                          <div className="text-gray-400">Success Rate</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg">
                          <Clock className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                          <div className="font-bold text-purple-400">2.8x</div>
                          <div className="text-gray-400 ">Faster Review</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connection Lines */}
                  <div className="absolute inset-[-100px]">
                    <svg className="w-full h-full" viewBox="0 0 464 464">
                      <style>
                        {`
                          @keyframes dashMove {
                            to {
                              stroke-dashoffset: -20;
                            }
                          }
                        `}
                      </style>
                      <defs>
                      {features.map((feature, index) => (
                        <linearGradient
                          key={`gradient-${index}`}
                          id={`connection-gradient-${index}`}
                          gradientUnits="userSpaceOnUse"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor={index === 0 ? "#FF6B6B" : 
                            index === 1 ? "#4158D0" : 
                            index === 2 ? "#0093E9" : "#8EC5FC"} />
                          <stop offset="100%" stopColor={index === 0 ? "#FF8E53" : 
                            index === 1 ? "#C850C0" : 
                            index === 2 ? "#80D0C7" : "#E0C3FC"} />
                        </linearGradient>
                      ))}
                        <mask id="centerMask">
                          <rect width="464" height="464" fill="white" />
                          <circle cx="232" cy="232" r="90" fill="black" />
                        </mask>
                      </defs>
                      
                      {features.map((_, index) => (
                        <g mask="url(#centerMask)">
                        {features.map((_, index) => (
                          <g key={`connection-${index}`}
                             className="transition-all duration-500">
                            <path
                              d={getConnectionPath(index)}
                              stroke={`url(#connection-gradient-${index})`}
                              strokeWidth={activeFeature === index ? "3" : "1.5"}
                              strokeDasharray="10 10"
                              strokeLinecap="round"
                              fill="none"
                              style={{
                                opacity: activeFeature === index ? 0.8 : 0.2,
                                animation: "dashMove 1s linear infinite",
                                filter: activeFeature === index ? 
                                  "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))" : 
                                  "none",
                                transition: "all 0.5s ease-in-out"
                              }}
                            />
                            {/* Connection points moved further out */}
                            <circle
                              cx={index % 2 === 0 ? "20" : "444"}
                              cy={index < 2 ? "100" : "364"}
                              r="4"
                              fill={`url(#connection-gradient-${index})`}
                              className={`transition-all duration-300 ${
                                activeFeature === index ? 'scale-150' : 'scale-100'
                              }`}
                            />
                          </g>
                        ))}
                      </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-32 relative">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`
                      transition-all duration-500
                      ${index < 2 ? 'mt-0' : 'mt-0 lg:mt-64'}
                    `}
                  >
                    <FeatureCard
                      {...feature}
                      isActive={activeFeature === index}
                      onMouseEnter={() => setActiveFeature(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewSpaceVisuals;
