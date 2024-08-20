import React, { useEffect, useState } from 'react';
import { BsFillCalendar2WeekFill, BsFillClipboard2CheckFill, BsBarChartFill, BsChevronDown, BsChevronUp, BsFillExclamationTriangleFill, BsArrowRight } from 'react-icons/bs';
import QuoteImg from '../assets/quoteImg.png';
import AnnouncementImg from '../assets/announcementImg.png';
import { VscLayersActive } from 'react-icons/vsc';
import { BiLogoTelegram } from "react-icons/bi";
import AnalyticsChart from './utils/analytics_components/AnalyticsChart';
import { GiProgression } from 'react-icons/gi';
import OverallPerformanceChart from './utils/dashboard/ScoreProgressionChart';
import WeaknessIdentification from './utils/dashboard/WeaknessIdentification';
import GoalSetting from './utils/dashboard/GoalSetting';
import CalendarTest from './utils/dashboard/CalendarTest';

interface DashboardProps {
    isDarkMode: boolean;
}

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

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
    const bgColor = isDarkMode ? '' : '';
    const cardBg = isDarkMode ? 'bg-slate-800' : 'bg-white';
    const textColor = isDarkMode ? 'text-slate-200' : 'text-slate-800';
    const secondaryTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-600';
    const iconColor = isDarkMode ? 'text-white' : 'text-indigo-600';
    const accentColor = isDarkMode ? 'text-indigo-500' : 'text-indigo-600';
    const borderColor = isDarkMode ? 'border-slate-600' : 'border-slate-200';

    const testDates = [
        new Date(2024, 7, 25), // August 25, 2024
        new Date(2024, 8, 15), // September 15, 2024
        // Add more dates as needed
      ];

    const performanceData = [
        {
            subject: 'Reading',
            chapters: [
                { title: 'Words in Context', score: 75 },
                { title: 'Main Idea', score: 50 },
                { title: 'Support Claims', score: 40 },
            ],
        },
        {
            subject: 'Writing',
            chapters: [
                { title: 'Grammar', score: 70 },
                { title: 'Punctuation', score: 55 },
                { title: 'Clarity', score: 45 },
            ],
        },
    ];


    return (
        <div className={`max-w-[1400px] mx-auto min-h-screen px-8 py-24 font-poppins ${bgColor}`}>
            <div className='grid grid-cols-12 gap-8'>
                {/* Left column */}
                <div className='col-span-3 space-y-8'>
                    <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor}`}>
                        <div className='flex flex-row gap-3 items-center mb-6'>
                            <VscLayersActive size={25} className={`${iconColor}`} />
                            <h2 className={`text-xl font-bold ${textColor}`}>Recent Activity</h2>
                        </div>
                        <div className='space-y-4'>
                            {[
                                { title: 'DSAT Reading', subtitle: 'Words In Context: Section 1', date: 'Aug 16, 2024' },
                                { title: 'DSAT Writing', subtitle: 'Boundaries', date: 'Aug 18, 2024' },
                                { title: 'DSAT Math', subtitle: 'Algebra Fundamentals', date: 'Aug 19, 2024' },
                            ].map((item, index) => (
                                <div key={index} className='flex items-start space-x-4'>
                                    <div className={`p-2 ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} rounded-lg`}>
                                        <BsFillClipboard2CheckFill size={16} className={`${iconColor}`} />
                                    </div>
                                    <div>
                                        <h3 className={`text-sm font-semibold ${textColor}`}>{item.title}</h3>
                                        <p className={`text-xs ${secondaryTextColor}`}>{item.subtitle}</p>
                                        <p className='text-xs text-indigo-600 mt-1'>Completed on {item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Tracking Section */}
                    <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor}`}>
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
                    <div className='col-span-3 space-y-8'>
                    <WeaknessIdentification isDarkMode={isDarkMode} performanceData={performanceData} />
                </div>
                </div>

                {/* Middle column */}
                <div className='col-span-6 space-y-8'>
                    <div className='bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-lg text-white'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h1 className='text-3xl font-bold mb-4'>Welcome Back, Alijon!</h1>
                                <div className='bg-white/20 p-4 rounded-xl backdrop-blur-sm'>
                                    <h2 className='font-bold text-xl mb-2'>Quote of the day</h2>
                                    <p className='text-sm italic'>
                                        "Success is not final; Failure is not fatal: It is the Courage to continue that counts" - Winston S. Churchill
                                    </p>
                                </div>
                            </div>
                            <img src={QuoteImg} alt="Quote Image" className='w-40 h-40 object-cover rounded-xl' />
                        </div>
                    </div>
                    <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor}`}>
                        <div className="w-full">
                            <OverallPerformanceChart isDarkMode={isDarkMode} />
                        </div>
                    </div>  
                    <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor}`}>
                        <div className="w-full">
                            <GoalSetting isDarkMode={isDarkMode}/>
                        </div>
                    </div>  
                </div>

                {/* Right column */}
                <div className='col-span-3 space-y-8'>
                    <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor}`}>
                        <div className='flex items-center space-x-3 mb-6'>
                            <img src={AnnouncementImg} className='w-10 h-10' alt="" />
                            <h2 className={`text-xl font-bold ${textColor}`}>Announcements</h2>
                        </div>
                        <div className='space-y-4'>
                            {[
                                { title: 'New Analytics Feature', content: 'You can now use the analytics tab to track your progress.', date: 'Aug 16, 2024' },
                                { title: 'Weakest Points Tracker', content: 'New feature to identify and focus on your weak areas.', date: 'Aug 18, 2024' },
                            ].map((item, index) => (
                                <div key={index} className={`pb-4 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-0`}>
                                    <div className='flex items-center space-x-3 mb-2'>
                                        <div className={`p-2 ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} rounded-lg`}>
                                            <BiLogoTelegram size={16} className={`${iconColor}`} />
                                        </div>
                                        <h3 className={`text-sm font-semibold ${textColor}`}>{item.title}</h3>
                                    </div>
                                    <p className={`text-sm ${secondaryTextColor} mb-2`}>{item.content}</p>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-xs text-slate-500'>{item.date}</p>
                                        <button className='text-xs font-medium text-indigo-600 hover:underline'>Learn more</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor}`}>
                        <h2 className={`text-xl font-bold mb-4 ${textColor}`}>Your Subscription</h2>
                        <div className={`${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} p-4 rounded-xl mb-4`}>
                            <div className="flex justify-between items-center mb-2">
                                <span className={`${textColor} font-semibold`}>Premium Plan</span>
                                <span className={`${accentColor} font-bold`}>Active</span>
                            </div>
                            <div className={`w-full bg-gray-200 rounded-full h-2.5 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-300'}`}>
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <p className={`text-xs mt-2 ${secondaryTextColor}`}>23 days remaining</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <BsFillCalendar2WeekFill className={`${iconColor} mr-3`} />
                                <span className={`${textColor} text-sm`}>Next billing date: Sept 12, 2024</span>
                            </div>
                            <div className="flex items-center">
                                <BsBarChartFill className={`${iconColor} mr-3`} />
                                <span className={`${textColor} text-sm`}>Unlimited access to all courses</span>
                            </div>
                            <div className="flex items-center">
                                <BsFillClipboard2CheckFill className={`${iconColor} mr-3`} />
                                <span className={`${textColor} text-sm`}>Priority support included</span>
                            </div>
                        </div>
                        <button className={`mt-4 w-full py-2 px-4 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white rounded-lg transition-colors`}>
                            Manage Subscription
                        </button>
                    </div>
                    <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor}`}>
                        <CalendarTest testDates={testDates} isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
