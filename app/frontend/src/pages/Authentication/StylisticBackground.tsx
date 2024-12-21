import React from 'react';

type StylisticBackgroundProps = {
  children: React.ReactNode;
};

const StylisticBackground: React.FC<StylisticBackgroundProps> = ({ children }) => {
  return (
    <div className="
      min-h-screen 
      flex items-center justify-center p-4 
      relative overflow-hidden 
      bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900
    ">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="w-full h-full opacity-10 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="subtleDots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subtleDots)" />
        </svg>
      </div>

      {/* Glass-like container */}
      <div className="relative z-10 w-full max-w-md font-inter">
        <div className="
          backdrop-blur-md 
          bg-white
          rounded-xl 
          shadow-md 
          p-8
        ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StylisticBackground;
