import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ReviewSpaceNavbar from './ReviewSpaceNavbar';
import SwitchToLaptopModal from '../study_space/SwitchToLaptopModal';

interface ReviewSpaceLayoutProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userSubscription: 'Free' | 'Nova+' | 'Nova Pro';
}

const ReviewSpaceLayout: React.FC<ReviewSpaceLayoutProps> = ({
  isDarkMode,
  toggleDarkMode,
  userSubscription
}) => {
  const darkModeClass = isDarkMode ? 'dark-background transition-colors duration-300' : 'bg-gray-100 transition-colors duration-300';


  return (
    <div className={`w-full h-full ${darkModeClass} font-montserrat`}>
      <ReviewSpaceNavbar
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      <SwitchToLaptopModal />
    </div>
  );
};

export default ReviewSpaceLayout;
