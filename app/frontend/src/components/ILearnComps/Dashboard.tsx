import React, { useEffect, useState } from 'react';
import OverallPerformanceChart from './utils/dashboard/ScoreProgressionChart';
import WeaknessIdentification from './utils/dashboard/WeaknessIdentification';
import GoalSetting from './utils/dashboard/GoalSetting';
import CalendarTest from './utils/dashboard/CalendarTest';
import Announcements from './utils/dashboard/Announcements';
import SubscriptionPlan from './utils/dashboard/SubscriptionPlan';
import RecentActivities from './utils/dashboard/RecentActivities';
import TutorialProgressTracking from './utils/dashboard/TutorialProgressTracking';
import WelcomeCard from './utils/dashboard/WelcomeCard';

interface DashboardProps {
    isDarkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
    const bgColor = isDarkMode ? '' : '';
    const cardBg = isDarkMode ? 'bg-slate-800' : 'bg-white';
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
                        <RecentActivities isDarkMode={isDarkMode}/>
                    </div>

                    {/* Progress Tracking Section */}
                    <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor}`}>
                        <TutorialProgressTracking isDarkMode={isDarkMode}/>
                    </div>
                    <div className='col-span-3 space-y-8'>
                    <WeaknessIdentification isDarkMode={isDarkMode} performanceData={performanceData} />
                </div>
                </div>

                {/* Middle column */}
                <div className='col-span-6 space-y-8'>
                    <WelcomeCard/>
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
                        <Announcements  isDarkMode={isDarkMode}/>
                    </div>
                    <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor}`}>
                        <SubscriptionPlan isDarkMode={isDarkMode}/>
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
