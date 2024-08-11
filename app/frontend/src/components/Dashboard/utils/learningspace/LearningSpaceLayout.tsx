import React from 'react';
import LearningSpaceNavbar from './LearningSpaceNavbar';
import NovaSpace from './NovaSpace';
import LearningSpaceBody from './LearningSpaceBody';
import SwitchToLaptopModal from './SwitchToLaptopModal';

interface LearningLayoutProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userSubscription: 'free' | 'nova+' | 'nova pro';
}

const LearningLayout: React.FC<LearningLayoutProps> = ({
  isDarkMode,
  toggleDarkMode,
  userSubscription
}) => {
  const darkModeClass = isDarkMode ? 'dark-background transition-colors duration-300' : 'bg-gray-100 transition-colors duration-300';

  return (
    <div className={`w-full h-full ${darkModeClass} font-opensans`}>
      <LearningSpaceNavbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className='flex'> {/* Add padding-top equivalent to the navbar height */}
        <NovaSpace userSubscription={userSubscription} isDarkMode={isDarkMode} />
        <LearningSpaceBody isDarkMode={isDarkMode}  />
      </div>
      
      {/* Display full-screen modal on mobile */}
      <SwitchToLaptopModal />
    </div>
  );
};

export default LearningLayout;
