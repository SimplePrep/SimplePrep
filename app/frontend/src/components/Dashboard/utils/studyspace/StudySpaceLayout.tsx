import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NovaSpace from './NovaSpace';
import SwitchToLaptopModal from './SwitchToLaptopModal';
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
  const [currentStep, setCurrentStep] = useState(1);

  const handleProgressChange = (newStep: number) => {
    setCurrentStep(newStep);
  };

  return (
    <div className={`w-full h-full ${isDarkMode ? 'dark-background' : 'bg-gray-100'} transition-colors duration-300 font-montserrat`}>
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
