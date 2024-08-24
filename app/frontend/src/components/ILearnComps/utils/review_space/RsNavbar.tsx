import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { BsLightningChargeFill, BsMoon, BsSun } from 'react-icons/bs';
import { FaBookOpen, FaLightbulb, FaUsers } from 'react-icons/fa';
import { RxExit } from "react-icons/rx";
import Logo from '../../../assets/logo-icon.png';

const ReviewBarLinks = [
    {
        title: 'Review Material',
        path: 'review-material',
        icon: <FaBookOpen size={25} className='text-indigo-600 hover:text-indigo-700' />
    },
    {
        title: 'Practice Exercises',
        path: 'practice-exercises',
        icon:  <BsLightningChargeFill size={25} className={'text-yellow-500 hover:text-yellow-600'} />
    },
    {
        title: 'Peer Insight',
        path: 'peer-insight',
        icon: <FaUsers size={25} className='text-teal-500 hover:text-teal-600' />
    },
    {
        title: 'Test your approach',
        path: 'test-approach',
        icon: <FaLightbulb size={25} className='text-green-500 hover:text-green-600' />
    }
]

interface ReviewSpaceNavbarProps {
    toggleDarkMode: () => void;
    isDarkMode: boolean;
}

const ReviewSpaceNavbar: React.FC<ReviewSpaceNavbarProps> = ({ toggleDarkMode, isDarkMode }): React.ReactElement => {
    const navigate = useNavigate();
    const { tutorialId } = useParams<{ tutorialId: string }>();

    const handleExitClick = () => {
        if (tutorialId) {
            navigate(`/demo/tutorials/course-paths/${tutorialId}`);
        } else {
            navigate('/demo/tutorials');
        }
    };

    const bgGradient = isDarkMode
        ? 'bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 text-white'
        : 'bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-800';

    const iconColor = isDarkMode ? 'text-indigo-500' : 'text-indigo-600';

    return (
        <div className={`fixed left-0 w-full z-40 ${bgGradient} shadow-lg font-space-grotesk`}>
            {/* Desktop version */}
            <div className='hidden md:flex items-center justify-between px-8 py-3'>
                <div className='flex items-center gap-3'>
                    <img src={Logo} alt="SimplePrep Logo" className='w-12 h-12 rounded-full' />
                    <p className="text-2xl font-extrabold">Review Space</p>
                </div>
                <div className='flex items-center gap-8'>
                    <div className={`flex items-center gap-2 rounded-xl transition`}>
                        {ReviewBarLinks.map((link) => (
                            <NavLink
                                    to={link.path}
                                    key={link.title}
                                    className={({ isActive }) => {
                                        const activeClass = isActive
                                        ? `text-lg font-bold leading-tight border-b-[2.5px] border-blue-600 px-4 py-2 cursor-pointer ${isDarkMode ? 'text-white' : 'text-[#001a72]'}`
                                        : `text-lg font-bold leading-tight border-b-[2.5px] border-transparent px-4 py-2 cursor-pointer ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#001a72]'}`
                                        return activeClass;
                                    }}
                                    >
                                    {({ isActive }) => (
                                        <div className='flex flex-row justify-center items-center gap-2'>
                                        <span style={{ color: isDarkMode ? (isActive ? 'white' : '#cbd5e1') : (isActive ? '#001a72' : '#1161fb') }}>
                                            {link.icon}
                                        </span>
                                        {link.title}
                                        </div>
                                    )}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <button 
                        onClick={toggleDarkMode} 
                        className="text-lg p-2 rounded-full transition-colors duration-200 ease-in-out"
                        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDarkMode ? <BsSun size={26} className='text-slate-200 hover:text-indigo-700' /> : <BsMoon size={24} className='hover:text-slate-400' />}
                    </button>
                    <button 
                        onClick={handleExitClick} 
                        className="text-lg p-2 rounded-full transition-colors duration-200 ease-in-out"
                        aria-label="Exit to course path"
                    >
                        <RxExit size={26} className={`${isDarkMode ? 'text-slate-200' : ''} hover:text-indigo-700`} />
                    </button>
                </div>
            </div>

            {/* Mobile version */}
            <div className='md:hidden px-4 py-3 flex flex-col items-center'>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-3'>
                        <img src={Logo} alt="SimplePrep Logo" className='w-10 h-10' />
                        <p className="text-lg font-extrabold">Review Space</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <button onClick={toggleDarkMode} className="text-lg p-2 rounded-full">
                            {isDarkMode ? <BsSun size={22} className={iconColor} /> : <BsMoon size={22} className={iconColor} />}
                        </button>
                        <button onClick={handleExitClick} className="text-lg p-2 rounded-full">
                            <RxExit size={22} className={iconColor} />
                        </button>
                    </div>
                </div>
                <div className='flex justify-around w-full mt-4'>
                    <div className={`flex flex-col items-center gap-1 p-2 rounded-xl transition`}>
                        <FaBookOpen size={22} className={iconColor} />
                        <span className="text-sm font-semibold">Review</span>
                    </div>
                    <div className={`flex flex-col items-center gap-1 p-2 rounded-xl transition`}>
                        <BsLightningChargeFill size={22} className={iconColor} />
                        <span className="text-sm font-semibold">Practice</span>
                    </div>
                    <div className={`flex flex-col items-center gap-1 p-2 rounded-xl transition`}>
                        <FaUsers size={22} className={iconColor} />
                        <span className="text-sm font-semibold">Insight</span>
                    </div>
                    <div className={`flex flex-col items-center gap-1 p-2 rounded-xl transition`}>
                        <FaLightbulb size={22} className={iconColor} />
                        <span className="text-sm font-semibold">Test</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSpaceNavbar;
