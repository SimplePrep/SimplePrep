import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NovaSpace from './NovaSpace';
import SwitchToLaptopModal from './SwitchToLaptopModal';
import StudySpaceNavbar from './StudySpaceNavbar';
import StudySpaceBody from './StudySpaceBody';

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
  const darkModeClass = isDarkMode ? 'dark-background transition-colors duration-300' : 'bg-gray-100 transition-colors duration-300';
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
        <NovaSpace userSubscription={userSubscription} isDarkMode={isDarkMode} />
        <Outlet context={{ handleProgressChange }} />
      </div>
      <SwitchToLaptopModal />
    </div>
  );
};

export default StudySpaceLayout;
