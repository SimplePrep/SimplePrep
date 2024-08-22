import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsMoon, BsSun } from 'react-icons/bs';
import { RxExit } from "react-icons/rx";
import Logo from '../../../assets/logo-icon.png';
import StepProgressBar from './StepProgressBar';

interface StudySpaceNavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  currentStep: number;
}

const StudySpaceNavbar: React.FC<StudySpaceNavbarProps> = ({ toggleDarkMode, isDarkMode, currentStep }) => {
  const navigate = useNavigate();
  const { tutorialId } = useParams<{ tutorialId: string }>();  
  const totalSteps = 5; 
  const darkModeClass = isDarkMode ? 'bg-[#1d263b] text-color-dark border-slate-600' : 'text-color-light border-slate-300';

  const handleExitClick = () => {
    if (tutorialId) {
      navigate(`/demo/tutorials/course-paths/${tutorialId}`);
    } else {
      navigate('/demo/tutorials');
    }
  };

  return (
    <div className={`fixed left-0 w-full z-40 font-space-grotesk bg-inherit`}>
      <div className='hidden md:block'>
        <div className={`w-full px-5 py-2 flex items-center justify-between ${darkModeClass} border-b-[0.5px]`}>
          <div className='flex flex-row gap-1 items-center'>
            <img src={Logo} alt="SimplePrep Logo" className='w-13 h-12 rounded-full' />
            <p className="text-2xl font-semibold">Study Space</p>
          </div>
          <div className='flex-1 flex items-center justify-center'>
            <StepProgressBar steps={totalSteps} currentStep={currentStep} />
          </div>
          <div className='flex flex-row gap-4 items-center'>
            <button 
              onClick={toggleDarkMode} 
              className="text-lg p-2 rounded-full hover:text-indigo-600 dark:hover:text-indigo-600"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <BsSun size={22} /> : <BsMoon size={22} />}
            </button>
            <button 
              onClick={handleExitClick} 
              className="text-lg p-2 rounded-full hover:text-indigo-600 dark:hover:text-indigo-600"
              aria-label="Exit to course path"
            >
              <RxExit size={22} />
            </button>
          </div>
        </div>
      </div>

      <div className='md:hidden'>
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md flex flex-col items-center px-4 py-2`}>
          <div className='flex justify-between items-center w-full mb-2'>
            <div className='flex flex-row gap-5 items-center'>
              <img src={Logo} alt="SimplePrep Logo" className='w-10 h-10' />
              <p className="text-lg font-semibold">Learning Space</p>
            </div>
            <div className='flex flex-row gap-3'>
              <button onClick={toggleDarkMode} className="text-lg p-2 rounded-full">
                {isDarkMode ? <BsSun /> : <BsMoon />}
              </button>
              <button onClick={handleExitClick} className="text-lg p-2 rounded-full">
                <RxExit />
              </button>
            </div>
          </div>
          <div className='w-full'>
            <StepProgressBar steps={totalSteps} currentStep={currentStep} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySpaceNavbar;
