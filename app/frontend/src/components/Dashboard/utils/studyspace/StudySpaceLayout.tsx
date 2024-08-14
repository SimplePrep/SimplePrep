import React from 'react';
import LearningSpaceNavbar from './StudySpaceNavbar';
import NovaSpace from './NovaSpace';
import LearningSpaceBody from './StudySpaceBody';
import SwitchToLaptopModal from './SwitchToLaptopModal';

interface StudySpaceLayoutProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userSubscription: 'free' | 'nova+' | 'nova pro';
}

const StudySpaceLayout: React.FC<StudySpaceLayoutProps> = ({
  isDarkMode,
  toggleDarkMode,
  userSubscription
}) => {
  const darkModeClass = isDarkMode ? 'dark-background transition-colors duration-300' : 'bg-gray-100 transition-colors duration-300';

  return (
    <div className={`w-full h-full ${darkModeClass}  font-montserrat`}>
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

export default StudySpaceLayout;
