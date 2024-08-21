import React, { useState } from 'react'
import { GiProgression } from 'react-icons/gi';
import AnalyticsChart from '../analytics_components/AnalyticsChart';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';


const ProgressOverview: React.FC<{ isDarkMode: boolean; subject: string; progress: number; chapters: Array<{title: string, progress: number}> }> = ({ isDarkMode, subject, progress, chapters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const textColor = isDarkMode ? 'text-slate-200' : 'text-slate-800';
    const secondaryTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-600';
    const bgColor = isDarkMode ? 'bg-slate-700' : 'bg-white';
    const circleBgColor = isDarkMode ? 'text-slate-600' : 'text-gray-200';
    const circleProgressColor = isDarkMode ? 'text-indigo-400' : 'text-indigo-600';
    const chapterBgColor = isDarkMode ? 'bg-slate-600' : 'bg-gray-100';
    const numberBgColor = isDarkMode ? 'text-slate-300' : 'text-slate-700';
    const borderColor = isDarkMode ? 'border-slate-200' : 'border-slate-300';

    return (
        <div className={`p-4 ${bgColor} rounded-2xl shadow-lg`}>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                <div className='flex items-center'>
                    <h2 className={`text-xl font-bold ml-3 ${textColor}`}>{subject}</h2>
                </div>
                <div className='flex items-center'>
                    <span className={`${textColor} font-semibold mr-4`}>{progress}%</span>
                    {isOpen ? <BsChevronUp className={secondaryTextColor} /> : <BsChevronDown className={secondaryTextColor} />}
                </div>
            </div>
            {isOpen && (
                <div className='mt-4 space-y-3'>
                    {chapters.map((chapter, index) => (
                        <div key={index} className={`flex justify-between items-center p-3 ${chapterBgColor} rounded-xl`}>
                            <div className='flex items-center'>
                                <span className={`py-2 px-3  rounded-full border-[1px] mr-3 ${borderColor} ${secondaryTextColor}`}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className={`${textColor} font-medium`}>{chapter.title}</span>
                            </div>
                            <div className='flex items-center'>
                                <div className='relative w-10 h-10'>
                                    <svg className='absolute inset-0' viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                        <circle className={`${circleBgColor}`} strokeWidth="3" fill="none" cx="18" cy="18" r="16" />
                                        <circle className={`${circleProgressColor}`} strokeWidth="3" strokeDasharray={`${chapter.progress}, 100`} fill="none" cx="18" cy="18" r="16" strokeLinecap="round" />
                                    </svg>
                                    <div className={`absolute inset-0 flex items-center justify-center ${numberBgColor}`}>
                                        <AnalyticsChart width={48} height={48} textSize='text-lg' value={chapter.progress} maxValue={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


interface TutorialProgressTrackingProps {
    isDarkMode: boolean;
}

const TutorialProgressTracking:React.FC<TutorialProgressTrackingProps> = ({isDarkMode}) => {
    const textColor = isDarkMode ? 'text-slate-200' : 'text-slate-800';
    const iconColor = isDarkMode ? 'text-white' : 'text-indigo-600';
  return (
    <div>
        <div className='flex items-center gap-3 mb-6'>
            <GiProgression className={`${iconColor}`} size={24} />
            <h2 className={`text-lg font-bold ${textColor}`}>Tutorial Progress Tracking</h2>
        </div>
        <div className='space-y-4'>
            <ProgressOverview
                isDarkMode={isDarkMode}
                subject="Reading"
                progress={75}
                chapters={[
                    { title: 'Words in Context', progress: 75 },
                    { title: 'Main Idea', progress: 50 },
                    { title: 'Support Claims', progress: 40 },
                ]}
            />
            <ProgressOverview
                isDarkMode={isDarkMode}
                subject="Writing"
                progress={60}
                chapters={[
                    { title: 'Grammar', progress: 70 },
                    { title: 'Punctuation', progress: 55 },
                    { title: 'Clarity', progress: 45 },
                ]}
            />
        </div>
    </div>
  )
}

export default TutorialProgressTracking