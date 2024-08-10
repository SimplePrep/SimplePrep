import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaGgCircle } from 'react-icons/fa';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { VscDebugRestart } from 'react-icons/vsc';
import { Section } from '../../../auth_utils/types';

interface MixCardProps {
    isDarkMode: boolean;
    isComplete: boolean;
    isActive: boolean;
    position: 'left' | 'middle' | 'right';
    verticalPosition: number;
    index: number;
    section: Section;
}

const MixCard: React.FC<MixCardProps> = ({ isDarkMode, isComplete, isActive, position, verticalPosition, index, section }) => {
    const navigate = useNavigate(); // Use useNavigate for redirection
    const justifyStyle = position === 'left' ? 'justify-start' : position === 'right' ? 'justify-end' : 'justify-center';
    const boxShadowStyle = isActive ? (isDarkMode ? '0 4px 236px 0 rgba(16, 98, 251, .7)' : '0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -1px rgba(59, 130, 246, 0.06)') : 'none';

    const handleClick = () => {
        navigate(`/tutorials/section-space/${section.slug}`);
    };

    return (
        <div className={`flex ${justifyStyle} mb-12`} style={{ position: 'relative', zIndex: 1 }}>
            <div 
                className={`MixCard w-72 md:w-80 max-w-sm border-4 ${isComplete ? (isDarkMode ? 'border-green-500' : 'border-green-500') : (isDarkMode ? 'border-blue-500' : 'border-blue-500')} rounded-3xl`}
                style={{
                    boxShadow: boxShadowStyle,
                }}
                data-index={index}
            >
                <div className={`m-2 flex flex-col gap-5 md:gap-10 ${isDarkMode ? 'bg-[#1e293b]' : 'bg-white'} rounded-xl shadow-md`}>
                    <div className={`p-3 flex flex-row justify-between ${isComplete ? (isDarkMode ? 'bg-green-600' : 'bg-green-500') : (isDarkMode ? 'bg-gray-700' : 'bg-gray-200')} rounded-t-xl`}>
                        <div className='flex flex-row gap-1 items-center'>
                            <FaClipboardList color={isDarkMode ? "white" : (isComplete ? "white" : "#4A5568")} size={25} />
                            <p className={`${isDarkMode ? 'text-white' : (isComplete ? 'text-white' : 'text-gray-800')} font-semibold`}>Lesson {section.id}</p>
                        </div>
                        {isComplete ? <BsFillPatchCheckFill size={25} color={isDarkMode ? "white" : "white"} /> : <FaGgCircle size={25} color={isDarkMode ? "white" : "#4A5568"} />}
                    </div>
                    <p className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-800'} font-semibold text-sm md:text-md`}>{section.title}</p>
                    <button
                        onClick={handleClick} // Attach the handleClick function to the button's onClick event
                        className={`
                            m-3 py-3 px-4 rounded-xl
                            font-semibold transition-all duration-300
                            ${isComplete
                                ? `${isDarkMode ? 'bg-green-600 hover:bg-green-800' : 'bg-green-500 hover:bg-green-400'} text-white`
                                : `${isDarkMode 
                                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                                  }`
                            }
                        `}
                        style={{ position: 'relative', zIndex: 2 }}
                    >
                        {isComplete ? (
                            <div className='flex flex-row gap-2 items-center justify-center group'>
                                <p>Review</p>
                                <VscDebugRestart size={25} className="transition-transform duration-300 group-hover:rotate-[-360deg]" />
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
