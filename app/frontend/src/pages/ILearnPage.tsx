import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBarDash from '../components/ILearnComps/NavBarDash';
import LoaderWrapper from '../components/ILearnComps/utils/tools/LoaderWrapper';

interface ILearnPageProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const ILearnPage: React.FC<ILearnPageProps> = ({
  toggleDarkMode,
  isDarkMode,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const darkModeClass = isDarkMode ? 'dark-background transition-colors duration-300' : 'bg-gray-100 transition-colors duration-300';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
    <div className={`w-full h-full ${darkModeClass} font-opensans `}>
      <NavBarDash toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <Outlet />
    </div>
  );
};

export default ILearnPage;
