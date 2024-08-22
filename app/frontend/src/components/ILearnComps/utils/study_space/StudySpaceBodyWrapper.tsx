import React from 'react';
import { useOutletContext } from 'react-router-dom';
import StudySpaceBody from './StudySpaceBody';

interface StudySpaceBodyWrapperProps {
  isDarkMode: boolean;
}

const StudySpaceBodyWrapper: React.FC<StudySpaceBodyWrapperProps> = ({ isDarkMode }) => {
  const { handleProgressChange } = useOutletContext<{ handleProgressChange: (step: number) => void }>();

  return (
    <StudySpaceBody 
      isDarkMode={isDarkMode} 
      onProgressChange={handleProgressChange} 
    />
  );
};

export default StudySpaceBodyWrapper;
