import React from 'react'
import { BsBarChartFill, BsFillCalendar2WeekFill, BsFillClipboard2CheckFill } from 'react-icons/bs';

interface SubscriptionPlanProps {
    isDarkMode: boolean;
}

const SubscriptionPlan:React.FC<SubscriptionPlanProps> = ({isDarkMode}) => {
    const textColor = isDarkMode ? 'text-slate-200' : 'text-slate-800';
    const iconColor = isDarkMode ? 'text-white' : 'text-indigo-600';
    const secondaryTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-600';
    const accentColor = isDarkMode ? 'text-indigo-500' : 'text-indigo-600';
  return (
    <div>
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
  )
}

export default SubscriptionPlan;