import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBarDash from '../components/Dashboard/NavBarDash';
import LoaderWrapper from '../components/Dashboard/utils/tools/LoaderWrapper';

interface DashboardPageProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  toggleDarkMode,
  isDarkMode,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const darkModeClass = isDarkMode ? 'dark-background transition-colors duration-300' : 'light-background transition-colors duration-300';

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LoaderWrapper
        size='35px'
        minLoadTime={2000}
        onLoadComplete={handleLoadComplete}
        text="Loading Dashboard..."
        isDarkMode={!isDarkMode}
      />
    );
  }

  return (
    <div className={`w-full h-full ${darkModeClass} font-opensans`}>
      <NavBarDash toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <Outlet />
    </div>
  );
};

export default DashboardPage;
