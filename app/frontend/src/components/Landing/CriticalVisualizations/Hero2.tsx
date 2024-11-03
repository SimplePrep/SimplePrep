import React from 'react';
import AnalyticsSpaceVisual from './AnalyticsSpaceVisual';
import ReviewSpaceVisuals from './ReviewSpaceVisual';
import StudySpaceVisuals from './StudySpaceVisual';

const Hero2 = () => {
  return (
    <div id='our-vision'>
        <StudySpaceVisuals />
        <ReviewSpaceVisuals />
        <AnalyticsSpaceVisual />
    </div>
  )
}

export default Hero2;