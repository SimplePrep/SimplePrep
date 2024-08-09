import React, { useState, useEffect, useRef } from 'react';
import { FaBook, FaClipboardList, FaGgCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import AnalyticsChart from './utils/analytics_components/AnalyticsChart';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { VscDebugRestart } from "react-icons/vsc";
import { Chapter, Section, Tutorial } from '../auth_utils/types';
import MixCard from './utils/tutorials/MixCard';

interface ChapterCardProps {
    chapter: {
      id: number;
      title: string;
      order: number;
      tutorial: number;
      description: string;
      lessons: number;
      practices: number;
      difficulty: string;
      image_path: string;
    };
    isDarkMode: boolean;
  }
  
const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, isDarkMode }) => {
    const imagePath = require(`../assets/${chapter.image_path}`);
  
    const getDifficultyStyles = (difficulty: string) => {
      switch (difficulty.toLowerCase()) {
        case 'beginner':
          return isDarkMode ? 'text-green-500' : 'text-green-600';
        case 'intermediate':
          return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
        case 'advanced':
          return isDarkMode ? 'text-red-400' : 'text-red-600';
        default:
          return isDarkMode ? 'text-gray-400' : 'text-gray-600';
      }
    };
  
    return (
      <div
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden mb-8 mx-auto md:mx-20 ${isDarkMode ? 'text-white' : 'text-gray-800'} shadow-lg ChapterCard`}
        style={{ boxShadow: isDarkMode ? '0 4px 236px 0 rgba(16, 98, 251, .7)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
      >
        {/* Mobile Design */}
        <div className="block md:hidden p-4">
          <img src={imagePath} alt="img" className="w-full h-56 object-cover rounded-lg mb-4" />
          <div className="flex items-center justify-between mb-2">
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{chapter.title}</h1>
            <span className={`py-1 px-2 rounded-full text-sm font-semibold border ${isDarkMode ? 'border-white' : 'border-gray-800'} ${getDifficultyStyles(chapter.difficulty)}`}>
              {chapter.difficulty}
            </span>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{chapter.description}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <FaBook className="mr-2" color={isDarkMode ? 'white' : '#2D3748'} size={20} />
              <span className="text-sm">{chapter.lessons} classes</span>
            </div>
            <div className="flex items-center">
              <FaClipboardList className="mr-2" color={isDarkMode ? 'white' : '#2D3748'} size={20} />
              <span className="text-sm">{chapter.practices} practices</span>
            </div>
          </div>
          <button className={`w-full mt-4 py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-medium`}>
            Continue course
          </button>
        </div>
  
        {/* Desktop Design */}
        <div className="hidden md:block relative">
          <img src={imagePath} alt="img" className="w-full h-[500px] object-cover" />
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-[#111827] to-transparent opacity-90' : 'bg-gradient-to-r from-gray-300 00 to-transparent opacity-95'}`}>
            <div className="h-full w-full md:w-3/5 flex flex-col gap-5 px-4 md:px-12 py-10 justify-center">
              <div className="flex justify-start">
                <div
                  className={`inline-flex items-center justify-center py-1 px-2 rounded-full text-sm font-semibold ${isDarkMode ? 'border-white' : 'border-gray-800'} ${getDifficultyStyles(
                    chapter.difficulty
                  )}`}
                >
                  {chapter.difficulty}
                </div>
              </div>
              <h1 className={`text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{chapter.title}</h1>
              <p className={`text-sm md:text-md ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{chapter.description}</p>
              <div className="flex flex-col md:flex-row justify-start items-center mb-4">
                <div className="flex items-center font-medium">
                  <FaBook className="mr-2" color={isDarkMode ? 'white' : '#2D3748'} size={20} md-size={30} />
                  <span className="text-lg">{chapter.lessons} classes</span>
                </div>
                <div className="flex items-center font-medium md:ml-4">
                  <FaClipboardList className="mr-2" color={isDarkMode ? 'white' : '#2D3748'} size={20} md-size={30} />
                  <span className="text-lg">{chapter.practices} practices</span>
                </div>
              </div>
              <div className='justify-normal'>
                <div className='flex flex-col md:flex-row gap-2 items-center'>
                  <button className={`p-3 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-medium`}>
                    Continue course
                  </button>
                  <AnalyticsChart value={5} maxValue={100} width={48} height={48} textSize='text-sm'/>
                  <p>Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  

  

interface CurvedLineProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    isStraight?: boolean;
    color?: string; // Add color prop
  }
  
  const CurvedLine: React.FC<CurvedLineProps> = ({ startX, startY, endX, endY, isStraight = false, color = "#4B5563" }) => {
    if (isStraight) {
      return (
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={color}
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      );
    }
  
    const controlPointX = (startX + endX) / 2;
    const controlPointY = startY + (endY - startY) / 2 - 50;
  
    return (
      <path
        d={`M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`}
        fill="none"
        stroke={color} // Use the passed color
        strokeWidth="2"
        strokeDasharray="5,5"
      />
    );
  };
  
interface TutorialPathProps {
  isDarkMode: boolean;
}
const TutorialPath: React.FC<TutorialPathProps> = ({ isDarkMode }) => {
  const { tutorialID } = useParams<{ tutorialID: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const chapterCardRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<{ x: number, y: number }[]>([]);
  const [chapterCardPosition, setChapterCardPosition] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const dummyChapters: Chapter[] = [
      {
        id: 1,
        title: "Introduction to SAT Reading",
        order: 1,
        tutorial: 1,
        description: "This chapter introduces the basics of SAT Reading, covering the structure and types of passages.",
        lessons: 5,
        practices: 10,
        difficulty: "Intermediate",
        image_path: "tutorials/img2.jpg",
        requiredSubscription: 'free'
      },
      {
        id: 2,
        title: "Advanced SAT Writing",
        order: 2,
        tutorial: 1,
        description: "This chapter introduces advanced topics in SAT Writing, focusing on grammar and style.",
        lessons: 6,
        practices: 12,
        difficulty: "Advanced",
        image_path: "tutorials/img1.jpg",
        requiredSubscription: 'free'
      },
    ];

    setChapters(dummyChapters);

    const dummySections: Section[] = [
      {
        id: 1,
        slug: 'section-1',
        title: 'Understanding Passage Structure',
        description: 'Learn how to analyze the structure of passages to answer questions more effectively.',
        content: 'Content of section 1',
        chapter: 1,
      },
      {
        id: 2,
        slug: 'section-2',
        title: 'Key Ideas and Details',
        description: 'This section covers identifying key ideas and details in SAT Reading passages.',
        content: 'Content of section 2',
        chapter: 1,
      },
      {
        id: 1,
        slug: 'section-1',
        title: 'Understanding Passage Structure',
        description: 'Learn how to analyze the structure of passages to answer questions more effectively.',
        content: 'Content of section 1',
        chapter: 1,
      },
      {
        id: 2,
        slug: 'section-2',
        title: 'Key Ideas and Details',
        description: 'This section covers identifying key ideas and details in SAT Reading passages.',
        content: 'Content of section 2',
        chapter: 1,
      },
      {
        id: 3,
        slug: 'section-3',
        title: 'Grammar Essentials',
        description: 'Focus on essential grammar rules necessary for the SAT Writing section.',
        content: 'Content of section 3',
        chapter: 2,
      },
      {
        id: 4,
        slug: 'section-4',
        title: 'Effective Sentence Structure',
        description: 'Learn how to craft effective sentences that enhance clarity and style.',
        content: 'Content of section 4',
        chapter: 2,
      },
    ];

    setSections(dummySections);
  }, [tutorialID]);

  useEffect(() => {
    const updatePositions = () => {
      if (containerRef.current && chapterCardRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const chapterCardRect = chapterCardRef.current.getBoundingClientRect();

        // Calculate the center-bottom position of the ChapterCard
        setChapterCardPosition({
          x: chapterCardRect.left + chapterCardRect.width / 2 - containerRect.left,
          y: chapterCardRect.bottom - containerRect.top,
        });

        // Calculate the center-top position of each MixCard
        const cards = containerRef.current.querySelectorAll('.MixCard');
        const newPositions = Array.from(cards).map((card) => {
          const rect = card.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top - containerRect.top,
          };
        });
        setCardPositions(newPositions);
      }
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [chapters, sections]);

  return (
    <div className={`max-w-6xl mx-auto py-32 font-montserrat relative`}>
      <div ref={chapterCardRef}>
        {chapters.map((chapter) => (
          <div key={chapter.id} className="mb-16"> {/* Add margin bottom to separate chapters */}
            <ChapterCard
              isDarkMode={isDarkMode}
              chapter={chapter}
            />
            
              <div className="flex flex-col gap-12 mt-12"> {/* Flexbox with gap between MixCards */}
                {sections
                  .filter((section) => section.chapter === chapter.id)
                  .map((section, index) => (
                    <MixCard
                      key={section.id}
                      isActive={index === 0}
                      isDarkMode={isDarkMode}
                      isComplete={false} // Assuming incomplete for dummy data
                      position={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'middle' : 'right'}
                      index={index}
                      section={section}
                    />
                  ))}
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialPath;