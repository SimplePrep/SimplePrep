import { BsFillClipboard2CheckFill } from 'react-icons/bs'
import { VscLayersActive } from 'react-icons/vsc'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Activity{
    id: number;
    tutorial_title: string;
    chapter_title: string;
    section_title: string;
    completed_at:  string;
}

interface RecentActivitiesProps {
    isDarkMode: boolean;
}

const RecentActivities:React.FC<RecentActivitiesProps> = ({ isDarkMode }) => {
    const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
    const textColor = isDarkMode ? 'text-slate-200' : 'text-slate-800';
    const iconColor = isDarkMode ? 'text-white' : 'text-indigo-600';
    const secondaryTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-600';

    useEffect(() => {
        axios.get('/api/recent-completed-sections/')
            .then(response => {
                setRecentActivities(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the recent activities!", error);
            });
    }, []);

    return (
        <div>
            <div className='flex flex-row gap-3 items-center mb-6'>
                <VscLayersActive size={25} className={`${iconColor}`} />
                <h2 className={`text-xl font-bold ${textColor}`}>Recent Activity</h2>
            </div>
            <div className='space-y-4'>
                {recentActivities.map((item, index) => (
                    <div key={index} className='flex items-start space-x-4'>
                        <div className={`p-2 ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} rounded-lg`}>
                            <BsFillClipboard2CheckFill size={16} className={`${iconColor}`} />
                        </div>
                        <div>
                            <h3 className={`text-sm font-semibold ${textColor}`}>{item.tutorial_title}</h3>
                            <p className={`text-xs ${secondaryTextColor}`}>{item.chapter_title}: {item.section_title}</p>
                            <p className='text-xs text-indigo-600 mt-1'>Completed on {item.completed_at}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivities;
