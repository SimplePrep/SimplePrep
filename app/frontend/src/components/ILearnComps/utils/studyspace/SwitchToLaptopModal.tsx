import React, { useState, useEffect } from 'react';

const SwitchToLaptopModal: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center z-50">
      <div className="text-center max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Switch to a Laptop</h2>
        <p className="text-lg text-gray-200 mb-6">
          For the best learning experience, we highly recommend using a laptop or desktop computer.
          Some features may not be fully supported or accessible on mobile devices.
        </p>
      </div>
    </div>
  );
};

export default SwitchToLaptopModal;
