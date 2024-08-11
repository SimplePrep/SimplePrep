import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LearningSpaceNavbar from './LearningSpaceNavbar';

interface LearningLayoutProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const LearningLayout: React.FC<LearningLayoutProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const darkModeClass = isDarkMode ? 'dark-background transition-colors duration-300' : 'bg-gray-100 transition-colors duration-300';

  


  return (
    <div className={`w-full h-full ${darkModeClass} font-opensans `}>
      <LearningSpaceNavbar isDarkMode={isDarkMode === true} toggleDarkMode={toggleDarkMode}/>
      <Outlet />
    </div>
  );
};

export default LearningLayout;
