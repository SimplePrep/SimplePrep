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

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching user data or other async operations)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup the timer if the component unmounts before the timer completes
    return () => clearTimeout(timer);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LoaderWrapper
        size='250px'
        minLoadTime={3000}
        onLoadComplete={handleLoadComplete}
        text="Loading Dashboard..."
        isDarkMode={false}
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
