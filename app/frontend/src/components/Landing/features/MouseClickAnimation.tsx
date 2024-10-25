import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface MouseClickAnimationProps {
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

const MouseClickAnimation: React.FC<MouseClickAnimationProps> = ({ position, setPosition }) => {
  // Positions in percentages (CSS compatible)
  const positions: Position[] = [
    { x: 16.66, y: 50 },  // First feature center
    { x: 50, y: 50 },     // Second feature center
    { x: 83.33, y: 50 }   // Third feature center
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => (prev + 1) % positions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [setPosition]);

  return (
    <motion.div
      className="absolute pointer-events-none z-50"
      style={{
        left: `${positions[position].x}%`,
        top: `${positions[position].y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      animate={{
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20
        }
      }}
    >
      <motion.div 
        className="relative"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 2
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="white"
          stroke="black"
          strokeWidth="1.5"
          className="drop-shadow-lg"
        >
          <path d="M4 4l7.07 16.97 2.51-7.39 7.39-2.51L4 4z" />
        </svg>

        {/* Expanded Ripple Effect Covering Entire Mouse Click Area */}
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-12 h-12 bg-indigo-400 rounded-full"
          animate={{
            scale: [0, 2.5, 0],  // The circle grows larger and covers the area
            opacity: [1, 0],      // Starts visible and fades out
          }}
          transition={{
            duration: 0.8,        // Slightly slower transition for a smoother effect
            repeat: Infinity,
            repeatDelay: 2.5
          }}
        />
      </motion.div>

      {/* Hover Text */}
      <motion.div
        className="absolute left-8 top-0 bg-gray-800 text-white px-4 py-2 rounded-lg text-base whitespace-nowrap shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 0.8],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      >
        Click to explore
      </motion.div>
    </motion.div>
  );
};

export default MouseClickAnimation;
