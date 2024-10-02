import React, { useState, useEffect } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import HexagonChart from './HexagonChart';
import AnalyticsChart from './AnalyticsChart';
import { TestReportData } from '../../../../auth_utils/types';

interface AnalysisProps {
  data: TestReportData;
  onClose: () => void;
}

const Analysis: React.FC<AnalysisProps> = ({ data, onClose }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const darkModeClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const bodyModeClass = isDarkMode ? 'bg-gray-700' : 'bg-[#f6fbff]';
  const cardModeClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const borderClass = isDarkMode ? 'border-gray-600' : 'border-gray-100';

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;

  const hasData = (module: any) => module && module.correct_answers !== undefined && module.total_questions !== undefined;

  const renderSectionCharts = (sectionData: any) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {Object.entries(sectionData).map(([sectionName, data]: [string, any]) => (
        hasData(data) && (
          <div key={sectionName} className="flex flex-col items-center">
            <AnalyticsChart
              value={roundToTwoDecimals((data.correct_answers / data.total_questions) * 100)}
              maxValue={100}
              width={80}
              height={80}
              textSize="1.2rem"
              isDarkMode={isDarkMode}
            />
            <p className="font-bold mt-2 text-base">{`${data.correct_answers}/${data.total_questions}`}</p>
            <p className={`text-sm font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{sectionName}</p>
          </div>
        )
      ))}
    </div>
  );

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 ${fadeIn ? 'animate-fadeIn' : 'opacity-0'} font-inter`}>
      <div className={`relative top-20 mb-8 max-w-[1400px] mx-auto p-8 shadow-2xl rounded-lg transition-colors ${darkModeClass}`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-5">
            <h2 className="font-semibold text-4xl">Analysis Report</h2>
            <button
              onClick={toggleDarkMode}
              className="p-3 border-2 rounded-full hover:bg-blue-500 transition-colors hover:text-white"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <BsSun size={24} /> : <BsMoon size={24} />}
            </button>
          </div>
          <button
            onClick={onClose}
            className="py-2 px-6 border-2  hover:bg-blue-500  rounded-lg transition-all hover:text-white"
            aria-label="Exit"
          >
            Exit
          </button>
        </div>
        
        {/* Overall Performance */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg transition-colors ${cardModeClass} border-2 ${borderClass}`}>
          <h3 className="text-2xl font-semibold mb-4 text-center">Overall Performance</h3>
          <div className="flex flex-col items-center">
            <HexagonChart
              value={roundToTwoDecimals((data.correct_answers / data.total_questions) * 100)}
              size={150}
            />
            <p className="font-bold mt-4 text-lg">{`${data.correct_answers} out of ${data.total_questions} Correct`}</p>
          </div>
        </div>

        {/* Module Sections */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${bodyModeClass} p-6 rounded-lg`}>
          {/* Reading Section */}
          {hasData(data.modules.Reading) && (
            <div className={`p-4 rounded-xl shadow-md transition-colors ${cardModeClass} border-2 ${borderClass}`}>
              <h3 className="text-2xl font-semibold mb-4 text-center">Reading</h3>
              <div className="flex flex-col items-center mb-6 text-center">
                <HexagonChart
                  value={roundToTwoDecimals((data.modules.Reading.correct_answers / data.modules.Reading.total_questions) * 100)}
                  size={120}
                />
                <p className="font-bold mt-4 text-lg">{`${data.modules.Reading.correct_answers} out of ${data.modules.Reading.total_questions} Correct`}</p>
              </div>
              {renderSectionCharts(data.modules.Reading.sections)}
            </div>
          )}

          {/* Writing Section */}
          {hasData(data.modules.Writing) && (
            <div className={`p-4 rounded-xl shadow-md transition-colors ${cardModeClass} border-2 ${borderClass}`}>
              <h3 className="text-2xl font-semibold mb-4 text-center">Writing</h3>
              <div className="flex flex-col items-center mb-6 text-center">
                <HexagonChart
                  value={roundToTwoDecimals((data.modules.Writing.correct_answers / data.modules.Writing.total_questions) * 100)}
                  size={120}
                />
                <p className="font-bold mt-4 text-lg">{`${data.modules.Writing.correct_answers} out of ${data.modules.Writing.total_questions} Correct`}</p>
              </div>
              {renderSectionCharts(data.modules.Writing.sections)}
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className={`mt-8 p-6 rounded-xl shadow-lg transition-colors ${cardModeClass} border-2 ${borderClass}`}>
          <h4 className="text-xl font-semibold mb-4">Topics to Review:</h4>
          <ul className="list-disc list-inside text-md space-y-2">
            {data.suggestions && data.suggestions.map((suggestion, index) => (
              <li key={index} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analysis;