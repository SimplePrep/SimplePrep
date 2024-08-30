import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NovaSpace from './NovaSpace';
import StudySpaceNavbar from './StudySpaceNavbar';

interface StudySpaceLayoutProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userSubscription: 'Free' | 'Nova+' | 'Nova Pro';
}

const StudySpaceLayout: React.FC<StudySpaceLayoutProps> = ({
  isDarkMode,
  toggleDarkMode,
  userSubscription
}) => {
  const darkModeClass = isDarkMode
    ? 'dark-background transition-colors duration-300'
    : 'bg-gray-100 transition-colors duration-300';
  const [currentStep, setCurrentStep] = useState(0);

  const handleProgressChange = (newStep: number) => {
    setCurrentStep(newStep);
  };

  return (
    <div className={`w-full h-full ${darkModeClass} font-montserrat`}>
      <StudySpaceNavbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        currentStep={currentStep} 
      />
      <div className='flex'>
        <div className="hidden lg:block">
          <NovaSpace userSubscription={userSubscription} isDarkMode={isDarkMode} />
        </div>
        <div className="flex-grow">
          <Outlet context={{ handleProgressChange }} />
        </div>
      </div>
    </div>
  );
};

export default StudySpaceLayout;
