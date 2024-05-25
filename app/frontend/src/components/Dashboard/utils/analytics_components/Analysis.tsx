import React, { useState, useEffect } from 'react';
import { BsMoon } from 'react-icons/bs';
import AnalyticsChart from './AnalyticsChart';
import { TestReportData } from '../../types';

interface AnalysisProps {
  data: TestReportData;
  onClose: () => void;
}

const Analysis: React.FC<AnalysisProps> = ({ data, onClose }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const darkModeClass = isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black';
  const animationClass = fadeIn ? 'animate-fadeIn' : 'opacity-0';
  const bodyModeClass = isDarkMode ? 'bg-gray-600' : 'bg-[#f6fbff]';

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const roundToTwoDecimals = (num: number) => {
    return Math.round(num * 100) / 100;
  };

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 ${animationClass}`}>
      <div className={`relative top-20 mb-8 max-w-[1400px] mx-auto p-5 border shadow-lg rounded-2xl ${darkModeClass}`}>
        <div className='flex p-5 justify-between items-center'>
          <div className='mx-5 flex gap-10 items-center'>
            <p className='font-semibold text-3xl'>Analysis Report</p>
            <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500">
              <BsMoon />
            </button>
          </div>
          <div className='flex justify-end items-center gap-5'>
            <button onClick={onClose} className='py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'>Exit</button>
          </div>
        </div>
        <hr className="border-gray-300 border-[1px]" />
        <div className={`flex h-auto w-full py-5 ${bodyModeClass}`}>
          {Object.entries(data.modules).map(([moduleName, moduleData]) => (
            <div key={moduleName} className='w-1/3 flex flex-col gap-10 p-2 items-center rounded-lg'>
              <div className='p-2 border-r-2 justify-center items-center'>
                <p className='text-3xl font-medium'>{moduleName}</p>
                {Object.entries(moduleData.sections).map(([sectionName, sectionData]) => (
                  <div key={sectionName} className='flex items-center'>
                    <div className='py-5 relative flex flex-col gap-5 justify-center items-center w-full'>
                      <AnalyticsChart value={roundToTwoDecimals((sectionData.correct_answers / sectionData.total_questions) * 100)} maxValue={100} />
                      <p className=''><span className='font-bold'>{sectionData.correct_answers}</span> Out of {sectionData.total_questions} Correct</p>
                    </div>
                    <p className='text-lg font-medium'>{sectionName}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className='w-1/3 flex flex-col gap-10 p-2 items-center rounded-lg'>
          <div className='p-2 justify-center items-center'>
            <h2 className='text-3xl font-medium'>Overall</h2>
            <div className='py-5 flex flex-col gap-5 items-center w-full'>
              <AnalyticsChart value={roundToTwoDecimals((data.correct_answers / data.total_questions) * 100)} maxValue={100} />
              <p><span className='font-bold'>{data.correct_answers}</span> Out of {data.total_questions} Correct</p>
            </div>
            <p className='text-lg text-gray-600'>
              Quick Note: Topics are sorted by importance based on your test performance.
            </p>
            <div className='pt-5 w-full'>
              <h3 className='font-medium text-2xl'>Topics to Review:</h3>
              <ul className='list-disc list-inside my-4'>
                {data.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
