import React, { useEffect, useState } from 'react'
import { comingsoon } from '../utils'
import axiosInstance from '../utils/axios/axiosInterceptor';
import { getTests } from '../utils/axios/axiosServices';

interface Test {
    id: number;
    title: string;
}


const Contents:React.FC = () => {

    const [tests, setTests] = useState<Test[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>('');

    useEffect(() => {
        const fetchTests =async () => {
            try {
                const testList = await getTests();
                setTests(testList);
            } catch (error) {
                console.error('Error fetching tests: ', error);
            }
        }
    });

    
      const borderColorClasses = [
        'shadow-red-500', 
        'shadow-green-500', 
        'shadow-blue-500', 
        'shadow-yellow-500', 
        'shadow-pink-500', 
        'shadow-purple-500', 
        'shadow-indigo-500', 
        'shadow-orange-500', 
        'shadow-teal-500', 
        'shadow-gray-500',
        'shadow-cyan-500',
        'shadow-lime-500',
      ];
  return (
    <div className='max-w-[1400px] h-full mx-auto'>
        <div className='my-20  rounded-2xl'>
            <p className='p-10 font-medium text-xl text-slate-600'>Freemium English and Writing Practice tests</p>
            <div className='max-w-[1000px] mx-auto'>
            <div className="flex justify-center items-center space-x-4">
                <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {tests.map((test, index) => {
                        const borderColorClass = borderColorClasses[index % borderColorClasses.length];

                        return(
                            <div key={test.id} className={`p-6 bg-black rounded-lg border-2 ${borderColorClass} border-white shadow-lg`}>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-xl text-purple-500">{test.id}</div>
                                </div>
                                <h5 className="text-white text-xl leading-tight font-medium mb-2">{test.title}</h5>
                                <p className="text-gray-400 text-base mb-4">
                                Test your skills with this practice test.
                                </p>
                                <button className="mt-auto py-2 px-4 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                                    Practice
                                </button>
                            </div>
                         )
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className='rounded-2xl h-full pb-20'>
            <p className='p-10 font-medium text-xl text-slate-600'>Premium English and Writing Practice tests</p>
            <div className='max-w-[1000px] mx-auto shadow-xl shadow-teal-300 overflow-visible rounded-3xl'>
                <video className='pointer-events-none rounded-3xl' autoPlay muted loop playsInline={true} key={comingsoon}>
                    <source src={comingsoon} type='video/mp4' />
                </video>
            </div>
        </div>
    </div>
    
  )
}

export default Contents;