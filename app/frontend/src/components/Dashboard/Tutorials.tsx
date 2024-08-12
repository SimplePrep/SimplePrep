import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaClipboardList } from 'react-icons/fa';
import tutorialImage2 from '../assets/tutorials/readingImg3.webp';
import tutorial2Image from '../assets/tutorials/writingImg.webp';
import { GiDividedSquare } from "react-icons/gi";

// Interfaces
interface Tutorial {
  id: number;
  title: string;
  description: string;
  duration: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  classes: number;
  practices: number;
}

// Mock data
const tutorials: Tutorial[] = [
  {
    id: 1,
    title: "SAT Reading Mastery",
    description: "Develop critical reading skills and strategies to excel in the SAT Reading section.",
    duration: "6 weeks",
    skillLevel: "Intermediate",
    classes: 10,
    practices: 25,
  },
  {
    id: 2,
    title: "SAT Writing & Language Pro",
    description: "Master grammar, punctuation, and effective writing techniques for SAT success.",
    duration: "5 weeks",
    skillLevel: "Intermediate",
    classes: 8,
    practices: 20,
  }
];

const basePath = "/demo/tutorials";

// Components
interface TutorialCardProps {
  tutorial: Tutorial;
  isDarkMode: boolean;
}

const SkeletonTutorialCard: React.FC = () => (
  <div className="w-full sm:w-[384px] rounded-xl shadow-lg overflow-hidden transition-all duration-300 bg-gray-200 animate-pulse">
    <div className="p-3">
      <div className="w-full h-56 bg-gray-300 rounded-lg"></div>
      <div className="absolute top-0 right-0 m-5 bg-gray-300 rounded-full w-20 h-6"></div>
    </div>
    <div className="px-5 py-2 flex flex-row items-center gap-3">
      <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
      <div className="w-32 h-4 bg-gray-300 rounded"></div>
    </div>
    <div className="px-6 py-2">
      <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
      <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-5/6 h-4 bg-gray-300 rounded mb-4"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-gray-300 rounded-full mr-2"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-gray-300 rounded-full mr-2"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="w-24 h-8 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, isDarkMode }) => {
  const tutorialImages: { [key: number]: string } = {
    1: tutorialImage2,
    2: tutorial2Image,
  };

  const tutorialImage = tutorialImages[tutorial.id] || 'path/to/default/image.jpg';

  return (
    <motion.div
      className={`max-w-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${isDarkMode ? 'bg-[#2d3855] hover:bg-[#39476B]' : 'bg-white'} cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="relative p-3">
        <img 
          className="w-full h-56 object-cover rounded-lg" 
          src={tutorialImage} 
          alt={`${tutorial.title} cover`} 
        />
        <div className="absolute top-0 right-0 m-2 bg-white rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
          {tutorial.duration}
        </div>
      </div>
      <div className="px-5 py-2 flex flex-row items-center gap-3">
          <GiDividedSquare size={20} color={'gold'} />
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Beginner Friendly
          </span>
        </div>
      <div className="px-6 py-2">
        <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{tutorial.title}</h2>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tutorial.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm font-medium text-gray-600">
            <FaBook className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20}/>
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tutorial.classes} classes</span>
          </div>
          <div className="flex items-center text-sm font-medium text-gray-600">
            <FaClipboardList className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20}/>
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tutorial.practices} practices</span>
          </div>
        </div>
       
        <div className="flex justify-end">
          <NavLink
            to={`${basePath}/course-paths/${tutorial.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Start Path
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

interface TutorialsProps {
  isDarkMode: boolean;
}

const Tutorials: React.FC<TutorialsProps> = ({ isDarkMode }) => {
  const [tutorialsList, setTutorialsList] = React.useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTutorials = async () => {
      setIsLoading(true);
      try {
        // Simulating API call with dummy data
        setTutorialsList(tutorials);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  return (
    <div className={`min-h-screen max-w-[1200px] mx-auto font-montserrat  py-20`}>
      <div className="container mx-auto px-4 py-10">
        <h1 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-[#001a72]'}`}>
          Explore Our Tutorials
        </h1>
        <div className="flex flex-row flex-wrap gap-10 justify-center">
          {!isLoading && tutorialsList.map(tutorial => (
                <TutorialCard 
                  key={tutorial.id} 
                  tutorial={tutorial}
                  isDarkMode={isDarkMode}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;

