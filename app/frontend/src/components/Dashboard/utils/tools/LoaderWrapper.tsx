import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import bookLoader from '../../../assets/bookLoader2.json'; // Adjust the path as needed

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
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Lottie animationData={bookLoader} style={{ width: size, height: size }} />
      <span className={`mt-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>{text}</span>
    </div>
  );
};

export default LoaderWrapper;
