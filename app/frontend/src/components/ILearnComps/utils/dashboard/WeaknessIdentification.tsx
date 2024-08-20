import React, { useEffect, useState } from 'react';
import { BsFillExclamationTriangleFill, BsArrowRight, BsLightningChargeFill } from 'react-icons/bs';
import { FaBookOpen } from 'react-icons/fa';

interface WeaknessIdentificationProps {
    isDarkMode: boolean;
    performanceData: {
        subject: string;
        chapters: Array<{ title: string, score: number }>;
    }[];
}

const WeaknessIdentification: React.FC<WeaknessIdentificationProps> = ({ isDarkMode, performanceData }) => {
    const [weakAreas, setWeakAreas] = useState<Array<{ subject: string, chapter: string, score: number, severity: 'mild' | 'moderate' | 'severe' }>>([]);

    useEffect(() => {
        const identifiedWeakAreas: Array<{ subject: string, chapter: string, score: number, severity: 'mild' | 'moderate' | 'severe' }> = performanceData.flatMap(subjectData => 
            subjectData.chapters
                .filter(chapter => chapter.score < 60)
                .map(chapter => ({
                    subject: subjectData.subject,
                    chapter: chapter.title,
                    score: chapter.score,
                    severity: chapter.score < 40 ? 'severe' as const : chapter.score < 50 ? 'moderate' as const : 'mild' as const
                }))
        ).sort((a, b) => a.score - b.score);
    
        setWeakAreas(identifiedWeakAreas);
    }, [performanceData]);

    const textColor = isDarkMode ? 'text-slate-200' : 'text-slate-800';
    const secondaryTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-600';
    const cardBg = isDarkMode ? 'bg-slate-800' : 'bg-white';
    const borderColor = isDarkMode ? 'border-slate-600' : 'border-slate-200';
    const hoverBg = isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200';

    const getSeverityColor = (severity: 'mild' | 'moderate' | 'severe') => {
        switch (severity) {
            case 'mild': return 'bg-yellow-500';
            case 'moderate': return 'bg-orange-500';
            case 'severe': return 'bg-red-500';
            default: return '';
        }
    };

    return (
        <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor}`}>
            <div className='flex items-center gap-3 mb-6'>
                <BsFillExclamationTriangleFill className='text-red-600' size={24} />
                <h2 className={`text-xl font-bold ${textColor}`}>Areas for Improvement</h2>
            </div>
            {weakAreas.length > 0 ? (
                <div className='space-y-4'>
                    {weakAreas.map((area, index) => (
                        <div key={index} className={`p-1 rounded-xl transition-all duration-300 ${hoverBg}`}>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-3'>
                                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(area.severity)}`}></div>
                                    <span className={`font-semibold ${textColor}`}>
                                        {area.subject} - {area.chapter}
                                    </span>
                                </div>
                                <span className={`text-sm font-medium ${secondaryTextColor}`}>
                                    Score: {area.score}%
                                </span>
                            </div>
                            <div className='mt-3 flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <FaBookOpen size={25} className='text-indigo-500' />
                                    <span className={`text-xs ${secondaryTextColor}`}>Review Material</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <BsLightningChargeFill size={25} className='text-yellow-500' />
                                    <span className={`text-xs ${secondaryTextColor}`}>Practice Exercises</span>
                                </div>
                                <button className='text-sm font-medium text-indigo-600 hover:underline flex items-center'>
                                    Improve Now <BsArrowRight className='ml-2' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-8'>
                    <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className={`${textColor} text-lg font-semibold`}>Great job!</p>
                    <p className={`${secondaryTextColor} text-center mt-2`}>No weak areas identified. Keep up the good work!</p>
                </div>
            )}
        </div>
    );
};

export default WeaknessIdentification;