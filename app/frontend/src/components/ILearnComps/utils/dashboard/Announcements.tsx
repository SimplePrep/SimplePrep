import React from 'react'
import { BiLogoTelegram } from 'react-icons/bi'
import AnnouncementImg from '../../../assets/announcementImg.png';

interface  AnnouncementsProps {
    isDarkMode: boolean;
}

const Announcements:React.FC<AnnouncementsProps> = ({isDarkMode}) => {
    const textColor = isDarkMode ? 'text-slate-200' : 'text-slate-800';
    const iconColor = isDarkMode ? 'text-white' : 'text-indigo-600';
    const secondaryTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <div>
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
  )
}

export default Announcements