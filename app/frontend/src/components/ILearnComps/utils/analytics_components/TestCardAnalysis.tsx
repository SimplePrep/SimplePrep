import React from 'react';
import { FaEye, FaChartBar } from 'react-icons/fa';
import { MdOutlineChat } from "react-icons/md";


interface TestCardProps {
    id: number;
    title: string;
    date: string;
    score: number;
    borderColorIndex: number;
    onPreviewClick: () => void;
    onAnalyticsClick: () => void;
    onDiscussionClick: () => void;
  }
  
  

const borderColorClasses = [
    'border-purple-500',
    'border-pink-500',
    'border-blue-500',
    'border-green-500',
    'border-yellow-500',
    'border-orange-500',
  ];
  const TestCard: React.FC<TestCardProps> = ({
    id,
    title,
    date,
    score,
    borderColorIndex,
    onPreviewClick,
    onAnalyticsClick,
    onDiscussionClick,
  }) => {
    const borderColorClass = borderColorClasses[borderColorIndex % borderColorClasses.length];

    return (
        
    <div className={`p-6 bg-black rounded-lg border-2 ${borderColorClass} border-white shadow-lg`}>
        
        <h5 className="text-white text-xl leading-tight font-medium mb-2">{title}</h5>
        <p className="text-gray-400 text-base mb-4">Taken on {date}</p>
        <p className="text-gray-400 text-base mb-4">Score: {score}</p>
        <div className="flex justify-end space-x-4">
            <button
                className="flex items-center py-2 px-4 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                onClick={onPreviewClick}>
                <FaEye className="mr-2" />
                Preview
            </button>
            <button
                className="flex items-center py-2 px-4 bg-green-500 text-white text-lg rounded hover:bg-green-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
                onClick={onAnalyticsClick}>
                <FaChartBar className="mr-2" />
                Analytics
            </button>
        </div>
        <div className='mt-5 mr-10 flex justify-end items-center'>
            <button
                className="flex items-center py-2 px-4 bg-purple-600 text-white text-lg rounded hover:bg-purple-800 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
                onClick={onDiscussionClick}>
                <MdOutlineChat className='mr-2'/>
                Discussion
            </button>
        </div>
  </div>
      );
  };

  export default TestCard;