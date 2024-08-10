import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

interface LearningLayoutProps {
  isDarkMode: boolean;
}

const LearningLayout: React.FC<LearningLayoutProps> = ({
  isDarkMode,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const darkModeClass = isDarkMode ? 'dark-background transition-colors duration-300' : 'bg-gray-100 transition-colors duration-300';

  


  return (
    <div className={`w-full h-full ${darkModeClass} font-opensans `}>
      {/* No NavBarDash here */}
      <Outlet />
    </div>
  );
};

export default LearningLayout;
