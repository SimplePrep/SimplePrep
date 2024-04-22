import React, {useState, useEffect} from 'react'
import {BsMoon} from 'react-icons/bs';
import AnalyticsChart from './AnalyticsChart';


interface TestEntry {
    id: number;
    title: string;
    date: string;
    type: 'Freemium' | 'Premium'; 
    score: number;
    testName: string;
    suggestions: string[];
  }

interface AnalysisProps {
    data : TestEntry;
    onClose: () => void;
}

const Analysis: React.FC<AnalysisProps> = ({data, onClose}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    const darkModeClass = isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black';
    const animationClass = fadeIn ? 'animate-fadeIn' : 'opacity-0';
    const bodyModeClass = isDarkMode ? 'bg-gray-600' : 'bg-[#f6fbff]';
    const toggleDarkMode = () => { 
    setIsDarkMode(!isDarkMode)
    };

    useEffect(() => {
        const timer = setTimeout(() => {
          setFadeIn(true);
        }, 300); // Delay in ms, adjust as needed
        return () => clearTimeout(timer);
      }, []);
    return (
        <div className={`fixed inset-0 bg-gray-600  bg-opacity-50 overflow-y-auto h-full w-full z-50  ${animationClass}`}>
            <div className={`relative top-20 mb-8 max-w-[1400px] mx-auto p-5 border shadow-lg rounded-2xl ${darkModeClass}`}>
                <div className='flex p-5 justify-between items-center'>
                    <div className='mx-5 flex gap-10 items-center'>
                    <p className='font-semibold  text-3xl'>Analysis of <span>{data.title}</span></p>
                    <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500">
                        <BsMoon />
                    </button>
                    </div>
                    <div className='flex justify-end items-center gap-5'>
                        <button onClick={onClose} className='py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'>Exit</button>
                    </div>
                </div>
                <hr className="border-gray-300 border-[1px]"/>
                <div className={`flex h-auto w-full  py-5 ${bodyModeClass}`}>
                    <div className='w-1/3 flex flex-col gap-10 p-2 items-center rounded-lg'>
                        <div className='p-2 border-r-2 justify-center items-center'>
                            <p className='text-3xl font-medium'>Reading</p>
                            <div className='flex items-center'>
                                <div className='py-5 relative flex flex-col gap-5 justify-center items-center'>
                                    <AnalyticsChart value={100} maxValue={100} />
                                    <p className=''><span className='font-bold'>22</span> Out of 27 Correct</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='py-5 relative flex flex-col gap-5 justify-center items-center w-full'>
                                    <AnalyticsChart value={26} maxValue={100} />
                                    <p className=''><span className='font-bold'>1</span> Out of 5 Correct</p>
                                </div>
                                <p className='text-lg font-medium'>Words in Context</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='py-5 relative flex flex-col gap-5 justify-center items-center w-full'>
                                    <AnalyticsChart value={36} maxValue={100} />
                                    <p className=''><span className='font-bold'>3</span> Out of 4 Correct</p>
                                </div>
                                <p className='text-lg font-medium'>Support Claim</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='py-5 relative flex flex-col gap-5 justify-center items-center w-full'>
                                    <AnalyticsChart value={36} maxValue={100} />
                                    <p className=''><span className='font-bold'>3</span> Out of 4 Correct</p>
                                </div>
                                <p className='text-lg font-medium'>Support Claim</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col gap-10 p-2 items-center rounded-lg'>
                        <div className='p-2 border-r-2 justify-center items-center'>
                            <p className='text-3xl font-medium'>Writing</p>
                            <div className='flex items-center'>
                                <div className='py-5 relative flex flex-col gap-5 justify-center items-center w-full '>
                                    <AnalyticsChart value={90} maxValue={100} />
                                    <p className=''><span className='font-bold'>22</span> Out of 27 Correct</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='py-5 relative flex flex-col gap-5 justify-center items-center w-full'>
                                    <AnalyticsChart value={26} maxValue={100} />
                                    <p className=''><span className='font-bold'>1</span> Out of 5 Correct</p>
                                </div>
                                <p className='text-lg font-medium'>Words in Context</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='py-5 relative flex flex-col gap-5 justify-center items-center w-full'>
                                    <AnalyticsChart value={36} maxValue={100} />
                                    <p className=''><span className='font-bold'>3</span> Out of 4 Correct</p>
                                </div>
                                <p className='text-lg font-medium'>Support Claim</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col gap-10 p-2 items-center rounded-lg'>
                        <div className='p-2 justify-center items-center'>
                            <h2 className='text-3xl font-medium'>Overall</h2>
                            <div className='py-5 flex flex-col gap-5 items-center w-full'>
                                <AnalyticsChart value={90} maxValue={100} />
                                <p><span className='font-bold'>44</span> Out of 54 Correct</p>
                            </div>
                            <p className='text-lg text-gray-600'>
                                Quick Note: Topics are sorted by importance based on your test performance.
                            </p>
                            <div className='pt-5 w-full'>
                                <h3 className='font-medium text-2xl'>Topics to Review:</h3>
                                <ul className='list-disc list-inside my-4'>
                                    <li>Words in Context <span className='text-sm text-gray-500'>- Misinterpreted meaning of phrase.</span></li>
                                    <li>Command of Evidence <span className='text-sm text-gray-500'>- Difficulty citing evidence.</span></li>
                                    <li>Support Claim <span className='text-sm text-gray-500'>- Need to strengthen argumentative support.</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Analysis