import React from 'react';
import { FaClipboardList, FaGgCircle } from 'react-icons/fa';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { VscDebugRestart } from 'react-icons/vsc';
import { Section } from '../../../auth_utils/types';

interface MixCardProps {
    isDarkMode: boolean;
    isComplete: boolean;
    isActive: boolean;
    position: 'left' | 'middle' | 'right';
    index: number;
    section: Section;
}

const MixCard: React.FC<MixCardProps> = ({ isDarkMode, isComplete, isActive, position, index, section }) => {
    const justifyStyle = position === 'left' ? 'justify-start' : position === 'right' ? 'justify-end' : 'justify-center';
    const boxShadowStyle = isActive ? (isDarkMode ? '0 4px 236px 0 rgba(16, 98, 251, .7)' : '0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -1px rgba(59, 130, 246, 0.06)') : 'none';
    
    return (
        <div className={`flex ${justifyStyle} mb-12`}>
            <div 
                className={`w-72 md:w-80 max-w-sm border-4 ${isComplete ? (isDarkMode ? 'border-green-600' : 'border-green-500') : (isDarkMode ? 'border-blue-600' : 'border-blue-500')} rounded-3xl`}
                style={{
                    boxShadow: boxShadowStyle,
                }}
                data-index={index}
            >
                <div className={`m-2 flex flex-col gap-5 md:gap-10 ${isDarkMode ? 'bg-[#1d263b]' : 'bg-white'} rounded-xl shadow-md`}>
                    <div className={`p-3 flex flex-row justify-between ${isComplete ? (isDarkMode ? 'bg-green-600' : 'bg-green-500') : (isDarkMode ? 'bg-gray-700' : 'bg-gray-200')} rounded-t-xl`}>
                        <div className='flex flex-row gap-1 items-center'>
                            <FaClipboardList color={isDarkMode ? "white" : (isComplete ? "white" : "#4A5568")} size={25} />
                            <p className={`${isDarkMode ? 'text-white' : (isComplete ? 'text-white' : 'text-gray-800')} font-semibold`}>Lesson {section.id}</p>
                        </div>
                        {isComplete ? <BsFillPatchCheckFill size={25} color={isDarkMode ? "white" : "white"} /> : <FaGgCircle size={25} color={isDarkMode ? "white" : "#4A5568"} />}
                    </div>
                    <p className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-800'} font-semibold text-sm md:text-md`}>{section.title}</p>
                    <button
                        className={`
                            m-3 py-3 px-4 rounded-xl border
                            font-semibold transition-all duration-300
                            ${isDarkMode 
                                ? 'border-slate-400 text-white hover:bg-gray-700' 
                                : 'border-gray-300 text-gray-900 hover:bg-gray-200'
                            }
                            ${isComplete
                                ? 'hover:bg-green-600 hover:text-white group'
                                : 'hover:bg-opacity-80'
                            }
                        `}
                    >
                        {isComplete ? (
                            <div className='flex flex-row gap-2 items-center justify-center'>
                                <p>Review</p>
                                <VscDebugRestart size={25} className="transition-transform duration-300 group-hover:rotate-180" />
                            </div>
                        ) : (
                            <p>Start</p>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MixCard;