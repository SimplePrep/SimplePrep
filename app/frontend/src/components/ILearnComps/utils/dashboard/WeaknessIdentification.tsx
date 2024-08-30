import React, { useEffect, useState } from 'react';
import { BsFillExclamationTriangleFill, BsArrowRight, BsLightningChargeFill } from 'react-icons/bs';
import { FaBookOpen, FaUsers, FaLightbulb } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { useNavigate, useParams } from 'react-router-dom';

interface SkillCardProps {
    icon: IconType;
    title: string;
    color: string;
    isDarkMode: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon: Icon, title, color, isDarkMode }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-32 h-40 sm:w-48 sm:h-60 ${color} rounded-xl sm:rounded-2xl shadow-xl flex flex-col items-center justify-center cursor-pointer transition-transform duration-150 ease-in-out relative z-10 ${
            isDarkMode ? 'bg-opacity-90' : 'bg-opacity-100'
        }`}
    >
        <Icon className="text-white drop-shadow-lg" size={40} />
        <span className="mt-4 text-white font-semibold text-sm sm:text-lg text-center px-2 drop-shadow-lg">
            {title}
        </span>
    </motion.div>
);


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    ChapterTitle: string;
    isDarkMode: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, ChapterTitle, isDarkMode }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const bgGradient = isDarkMode
        ? 'from-slate-800 via-slate-850 to-slate-900'
        : 'from-white via-gray-100 to-gray-200';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
    const closeButtonBgColor = isDarkMode ? 'bg-red-500 text-white' : 'bg-red-500 text-white';
    const getStartedButtonBgColor = isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white';

    const handleNavigateToReview = () => {
        if (ChapterTitle) {
            navigate(`/review-space/${ChapterTitle}`);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className={`flex flex-col bg-gradient-to-br ${bgGradient} p-6 sm:p-8 rounded-2xl max-w-md sm:max-w-4xl w-full shadow-2xl backdrop-blur-lg`}
                >
                    <h2 className={`text-2xl sm:text-3xl font-extrabold ${textColor} mb-6 sm:mb-8 text-center tracking-wide`}>
                        Elevate Your Skills: {ChapterTitle}
                    </h2>
                    <motion.div
                        className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 mb-12 sm:mb-16 relative z-10"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: {
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    delayChildren: 0.2,
                                    staggerChildren: 0.15,
                                },
                            },
                        }}
                    >
                        <SkillCard
                            icon={FaBookOpen}
                            title="CheatSheet"
                            color="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:bg-indigo-700"
                            isDarkMode={isDarkMode}
                        />
                        <SkillCard
                            icon={BsLightningChargeFill}
                            title="Practice Exercises"
                            color="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:bg-yellow-600"
                            isDarkMode={isDarkMode}
                        />
                        <SkillCard
                            icon={FaUsers}
                            title="Peer Insight"
                            color="bg-gradient-to-r from-teal-500 to-teal-600 hover:bg-teal-600"
                            isDarkMode={isDarkMode}
                        />
                        <SkillCard
                            icon={FaLightbulb}
                            title="Test Your Approach"
                            color="bg-gradient-to-r from-green-500 to-green-600 hover:bg-green-600"
                            isDarkMode={isDarkMode}
                        />

                        <svg
                            className="absolute w-full h-full pointer-events-none z-0"
                            style={{
                                top: '20%',
                                left: '-10%',
                                width: '120%',
                                height: '60%',
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 10,50 Q 30,10 50,50 T 90,50"
                                fill="transparent"
                                stroke={isDarkMode ? 'white' : 'black'}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="4"
                            />
                        </svg>
                    </motion.div>
                    <div className="flex flex-row items-center gap-5 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNavigateToReview}
                            className={`py-2 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-opacity-90 transition-colors duration-300 text-base sm:text-lg font-semibold shadow-lg  ${getStartedButtonBgColor}`}
                        >
                            Get Started
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className={`py-2 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-opacity-90 transition-colors duration-300 text-base sm:text-lg font-semibold shadow-lg ${closeButtonBgColor}`}
                        >
                            Close
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

interface WeaknessIdentificationProps {
    isDarkMode: boolean;
    performanceData: {
        subject: string;
        chapters: Array<{ title: string; score: number }>;
    }[];
}

const WeaknessIdentification: React.FC<WeaknessIdentificationProps> = ({ isDarkMode, performanceData }) => {
    const [weakAreas, setWeakAreas] = useState<Array<{ subject: string; chapter: string; score: number; severity: 'mild' | 'moderate' | 'severe' }>>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

    useEffect(() => {
        const identifiedWeakAreas: Array<{ subject: string; chapter: string; score: number; severity: 'mild' | 'moderate' | 'severe' }> = performanceData.flatMap(subjectData => 
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

    const handleImproveClick = (chapter: string) => {
        setSelectedChapter(chapter);
        setIsModalOpen(true);
    };

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
                                <button
                                    className='text-sm font-medium text-indigo-600 hover:underline flex items-center'
                                    onClick={() => handleImproveClick(area.chapter)}
                                >
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
            <Modal  isDarkMode={isDarkMode} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ChapterTitle={selectedChapter || ''} />
        </div>
    );
};

export default WeaknessIdentification;
