import React from 'react';
import { FaBook, FaClipboardList, FaChevronDown, FaChevronUp, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AnalyticsChart from '../analytics_components/AnalyticsChart';
import { Chapter, Section } from '../../../auth_utils/types';

interface ChapterCardProps {
  chapter: Chapter;
  isDarkMode: boolean;
  isActive: boolean;
  onToggle: () => void;
  userSubscription: 'Free' | 'Nova+' | 'Nova Pro';
  sections: Section[]; // Pass the sections associated with this chapter
  userCompletedSections: number[]; // Pass the completed sections' IDs
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  isDarkMode,
  isActive,
  onToggle,
  userSubscription,
  sections,
  userCompletedSections,
}) => {
  const navigate = useNavigate();
  const imagePath = require(`../../../assets/${chapter.img_path}`);
  const hasAccess = userSubscription === 'Nova Pro' || userSubscription === 'Nova+' || chapter.requiredSubscription === 'Free';

  // Find the first incomplete section in the chapter
  const firstIncompleteSection = sections.find(section => !userCompletedSections.includes(section.id));

  const handleContinueClick = () => {
    if (firstIncompleteSection) {
      navigate(`/tutorials/section-space/${firstIncompleteSection.slug}`);
    }
  };

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
      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden mb-8 mx-auto md:mx-20 ${isDarkMode ? 'text-white' : 'text-gray-800'} shadow-lg ChapterCard relative`}
      style={{ boxShadow: isDarkMode ? '0 4px 236px 0 rgba(16, 98, 251, .7)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
    >
      <div className="block md:hidden p-4">
        <img src={imagePath} alt="img" className="w-full h-56 object-cover rounded-lg mb-4" />
        <button
          onClick={hasAccess ? onToggle : undefined}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'} text-white`}
        >
          {hasAccess ? (isActive ? <FaChevronUp /> : <FaChevronDown />) : <FaLock />}
        </button>
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
        <button
          onClick={handleContinueClick} // Attach the handleContinueClick function
          className={`mt-4 py-2 px-4 w-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-medium`}
        >
          Continue course
        </button>
      </div>

      <div className="hidden md:block relative">
        <img src={imagePath} alt="img" className="w-full h-[500px] object-cover" />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-[#111827] to-transparent opacity-90' : 'bg-gradient-to-r from-gray-300 00 to-transparent opacity-95'}`}>
          <button
            onClick={hasAccess ? onToggle : undefined}
            className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'} text-white`}
          >
            {hasAccess ? (isActive ? <FaChevronUp size={25} /> : <FaChevronDown size={25} />) : <FaLock size={25} />}
          </button>
          <div className="h-full w-full md:w-3/5 flex flex-col gap-5 px-4 md:px-12 py-10 justify-center">
            <div className="flex justify-start">
              <div
                className={`inline-flex items-center justify-center py-1 px-2 rounded-full text-sm font-semibold border-[1px] ${isDarkMode ? 'border-white' : 'border-gray-800'} ${getDifficultyStyles(
                  chapter.difficulty
                )}`}
              >
                {chapter.difficulty}
              </div>
            </div>
            <h1 className={`mt-5 text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{chapter.title}</h1>
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
            <div className="mt-5 flex items-center">
              <button
                onClick={handleContinueClick} // Attach the handleContinueClick function
                className={`py-2 px-4 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-medium`}
              >
                Continue course
              </button>
              <div className="flex flex-row ml-4 items-center gap-3">
                <AnalyticsChart value={5} maxValue={100} width={48} height={48} textSize='text-sm'/>
                <p className='text-base font-medium'>Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterCard;
