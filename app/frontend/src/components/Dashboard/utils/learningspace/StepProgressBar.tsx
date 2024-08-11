import React from 'react';
import { FaCheck } from "react-icons/fa6";

interface StepProgressBarProps {
  steps: number;
  currentStep: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto">
      {Array.from({ length: steps }, (_, index) => (
        <React.Fragment key={index}>
          <div className="relative">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? 'bg-indigo-600'
                  : index === currentStep
                  ? 'bg-indigo-600 ring-4 ring-indigo-200'
                  : 'bg-gray-300'
              }`}
            >
              {index < currentStep ? (
                <FaCheck className="w-5 h-5 text-white" />
              ) : (
                <span className={`text-sm font-medium ${
                  index === currentStep ? 'text-white' : 'text-gray-700'
                }`}>
                  {index + 1}
                </span>
              )}
            </div>
          </div>
          {index < steps - 1 && (
            <div
              className={`flex-1 h-0.5 ${
                index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepProgressBar;