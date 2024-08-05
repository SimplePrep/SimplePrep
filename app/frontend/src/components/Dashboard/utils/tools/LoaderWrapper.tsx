import React, { useState, useEffect } from 'react';
import BookLoader from './bookLoader';

interface LoaderWrapperProps {
  minLoadTime?: number;
  onLoadComplete: () => void;
  size?: string;
  text?: string;
  isDarkMode?: boolean;
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({
  minLoadTime = 2000,
  onLoadComplete,
  size = "64px",
  text = "Loading...",
  isDarkMode = false,
}) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const timer = setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(minLoadTime - elapsedTime, 0);

      setTimeout(() => {
        setShowLoader(false);
        onLoadComplete();
      }, remainingTime);
    }, 0);

    return () => clearTimeout(timer);
  }, [minLoadTime, onLoadComplete]);

  if (!showLoader) {
    return null;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <BookLoader
        size={size}
        text={text}
        background="linear-gradient(135deg, #6066FA, #4645F6)"
        shadowColor={isDarkMode ? "rgba(52, 73, 94, 0.28)" : "rgba(41, 128, 185, 0.28)"}
        textColor={isDarkMode ? "#2c3e50" : "#2c3e50"}
        duration={`${minLoadTime / 1000}s`}
      />
    </div>
  );
};

export default LoaderWrapper;
