import React from 'react';
import { FaBook, FaPen, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface PerformanceCardProps {
  title: string;
  score: number;
  previousScore: number;
  change: number;
  icon: React.ElementType;
  color: string;
  isDarkMode: boolean;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  score,
  previousScore,
  change,
  icon: Icon,
  color,
  isDarkMode,
}) => (
  <div
    className={`rounded-xl shadow-md p-4 sm:p-5 md:p-6 flex flex-col border ${
      isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
    }`}
  >
    <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
        <div className={`rounded-full p-2 ${isDarkMode ? 'bg-gradient-to-b from-slate-400 to-slate-800' : 'bg-gradient-to-b from-slate-50 to-slate-300'}`}>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${color} flex items-center justify-center`}>
                <Icon className="text-white text-xl sm:text-2xl md:text-2xl" />
            </div>
        </div>
      <div
        className={`text-base sm:text-base md:text-xl font-medium ${
          change >= 0 ? 'text-green-500' : 'text-red-500'
        } flex items-center`}
      >
        {change >= 0 ? '+' : ''}
        {change.toFixed(1)}%
        {change >= 0 ? <FaArrowUp className="ml-1" /> : <FaArrowDown className="ml-1" />}
      </div>
    </div>
    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">{title}</h3>
    <div className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-1 sm:mb-2">{score}</div>
    <p className={`text-xs sm:text-sm md:text-md ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      Previous score: <span className="font-bold text-lg">{previousScore}</span>
    </p>
  </div>
);

interface PerformanceDashboardProps {
  isDarkMode: boolean;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ isDarkMode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <PerformanceCard
        title="Reading"
        score={320}
        previousScore={310}
        change={3.2}
        icon={FaBook}
        color="from-purple-500 to-pink-500"
        isDarkMode={isDarkMode}
      />
      <PerformanceCard
        title="Writing"
        score={285}
        previousScore={290}
        change={-1.7}
        icon={FaPen}
        color="from-red-500 to-orange-500"
        isDarkMode={isDarkMode}
      />
      <PerformanceCard
        title="Overall"
        score={605}
        previousScore={600}
        change={0.8}
        icon={FaChartLine}
        color="from-green-500 to-blue-500"
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default PerformanceDashboard;
