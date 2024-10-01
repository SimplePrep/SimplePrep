import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

interface RadarChartProps {
  isDarkMode: boolean;
}

const RadarChart: React.FC<RadarChartProps> = ({ isDarkMode }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const radarChartInstance = useRef<Chart | null>(null);

  // State to toggle between Reading and Writing modes
  const [isReadingMode, setIsReadingMode] = useState(true);

  // Data for Reading and Writing overviews
  const radarData = {
    reading: [
      { label: 'Vocab-in-Context', value: 78 },
      { label: 'Paired Passages', value: 57 },
      { label: 'Purpose', value: 100 },
      { label: 'Main Idea', value: 100 },
      { label: 'Graphs & Charts', value: 42 },
      { label: 'Support Idea', value: 77 },
      { label: 'Text Details', value: 81 },
      { label: 'Inferences', value: 89 },
    ],
    writing: [
      { label: 'Sentence Structure', value: 85 },
      { label: 'Punctuation', value: 73 },
      { label: 'Grammar', value: 92 },
      { label: 'Argument Structure', value: 68 },
      { label: 'Transition Use', value: 56 },
      { label: 'Clarity', value: 83 },
      { label: 'Tone', value: 76 },
      { label: 'Style', value: 90 },
    ],
  };

  const currentData = isReadingMode ? radarData.reading : radarData.writing;

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      if (radarChartInstance.current) {
        radarChartInstance.current.destroy();
      }

      // Extract labels and values from the radarData array
      const labels = currentData.map(item => item.label);
      const values = currentData.map(item => item.value);

      radarChartInstance.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: isDarkMode ? 'rgba(0, 200, 140, 0.2)' : 'rgba(0, 200, 140, 0.2)',
              borderColor: isDarkMode ? 'rgba(0, 200, 140, 1)' : 'rgba(0, 200, 140, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(0, 200, 140, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(0, 200, 140, 1)',
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              },
              grid: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              ticks: {
                display: false,
              },
              pointLabels: {
                font: {
                  size: 14,
                  family: 'Arial, sans-serif',
                },
                color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              },
              suggestedMin: 0,
              suggestedMax: 100,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    return () => {
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy();
      }
    };
  }, [isDarkMode, currentData]);

  const getColorClass = (value: number) => {
    if (value >= 75) return 'text-green-500';
    if (value >= 50) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const DashedLine = () => (
    <div className="flex-grow flex items-center justify-end mr-2">
      <div
        className={`h-[1px] flex-grow ${
          isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
        }`}
        style={{
          backgroundImage: `repeating-linear-gradient(to right, currentColor, currentColor 4px, transparent 4px, transparent 8px)`,
        }}
      ></div>
    </div>
  );

  // Toggle between Reading and Writing mode
  const toggleMode = () => {
    setIsReadingMode(!isReadingMode);
  };

  return (
    <div className={`rounded-xl shadow-lg p-6 w-full max-w-md border-[1px] ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{isReadingMode ? 'Reading Overview' : 'Writing Overview'}</h2>
        <div
          onClick={toggleMode}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} cursor-pointer transition-all duration-300 transform hover:rotate-90 hover:scale-110`}
        >
          <svg className={`w-7 h-7 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      <div className="h-80 mb-6">
        <canvas ref={chartRef}></canvas>
      </div>

      {/* Labels and percentages */}
      <div className="space-y-2 mt-4">
        {currentData.map((item, index) => (
          <div key={index} className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="w-6 flex-shrink-0">{index + 1}.</span>
            <span className="flex-grow">{item.label}</span>
            <DashedLine />
            <span className={`font-semibold w-12 text-right ${getColorClass(item.value)}`}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadarChart;
