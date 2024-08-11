import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsMoon, BsSun } from 'react-icons/bs';
import Logo from '../../../assets/logo-icon.png';
import StepProgressBar from './StepProgressBar';
import { RxExit } from "react-icons/rx";

interface LearningSpaceNavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const LearningSpaceNavbar: React.FC<LearningSpaceNavbarProps> = ({ toggleDarkMode, isDarkMode }): React.ReactElement => {
  const navigate = useNavigate();
  const { tutorialId } = useParams<{ tutorialId: string }>();  // Get the tutorialId from the URL
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // Adjust this based on your actual number of steps
  const darkModeClass = isDarkMode ? 'bg-[#1d263b] text-color-dark transition-colors duration-300 border-slate-600' : 'text-color-light transition-colors duration-300 border-slate-300';

  useEffect(() => {
    const calculateProgress = () => {
      const completedSections = currentStep - 1;
      const calculatedProgress = Math.floor((completedSections / (totalSteps - 1)) * 100);
      setProgress(calculatedProgress);
    };

    calculateProgress();
  }, [currentStep]);

  const handleExitClick = () => {
    if (tutorialId) {
      navigate(`/demo/tutorials/course-paths/${tutorialId}`);
    } else {
      // Handle case where tutorialId is not available
      navigate('/demo/tutorials');
    }
  };

  return (
    <div className={`fixed left-0 w-full z-40 font-nunito bg-inherit`}>
      {/* Desktop version */}
        <div className='hidden md:block'>
            <div className={`w-full px-5 py-2 flex items-center justify-between ${darkModeClass} border-b-[0.5px]`}>
                <div className='flex flex-row gap-1 items-center'>
                    <img src={Logo} alt="SimplePrep Logo" className='w-12 h-10' />
                    <p className="text-lg font-semibold">Learning Space</p>
                </div>
                <div className='flex-1 flex items-center justify-center'>
                    <StepProgressBar steps={totalSteps} currentStep={currentStep} />
                </div>

                <div className='flex flex-row gap-4 items-center'>
                    <button 
                        onClick={toggleDarkMode} 
                        className="text-lg p-2 rounded-full transition-colors duration-200 ease-in-out hover:text-indigo-600 dark:hover:text-indigo-400"
                        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDarkMode ? <BsSun size={22} /> : <BsMoon size={22} />}
                    </button>
                    <button 
                        onClick={handleExitClick} 
                        className="text-lg p-2 rounded-full transition-colors duration-200 ease-in-out hover:text-indigo-600 dark:hover:text-indigo-400"
                        aria-label="Exit to course path"
                    >
                        <RxExit size={22} />
                    </button>
                </div>
            </div>
        </div>

      {/* Mobile version */}
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

export default LearningSpaceNavbar;
