import React, { useState, useEffect, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import bookLoader from '../../../assets/bookLoader.json'; // Adjust the path as needed

interface LoaderWrapperProps {
  minLoadTime?: number;
  onLoadComplete: () => void;
  size?: string;
  text?: string;
  isDarkMode?: boolean;
  speed?: number;
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({
  minLoadTime = 3000,
  onLoadComplete,
  size = "64px",
  text = "Loading...",
  isDarkMode = false,
  speed = 1.5, // Default speed is 1
}) => {
  const [showLoader, setShowLoader] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

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

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  if (!showLoader) {
    return null;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-200">
      <Lottie
        lottieRef={lottieRef}
        animationData={bookLoader}
        style={{ width: size, height: size }}
      />
      <span className={`mt-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>{text}</span>
    </div>
  );
};

export default LoaderWrapper;