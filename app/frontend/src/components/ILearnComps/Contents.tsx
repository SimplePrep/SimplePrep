import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';
import { getModules, getTests } from '../auth_utils/axios/axiosServices';

interface Test {
    id: number;
    title: string;
}

interface Module {
    id: number;
    test: number;
    title: string;
    description: string;
    num_questions: number;
    created_at: string;
    updated_at: string;
}

const SkeletonTestCard: React.FC<{ isDarkMode: boolean; index: number }> = ({ isDarkMode, index }) => {
    const animationDelay = `${index * 150}ms`;

    return (
        <div
            style={{ animationDelay }}
            className={`
                relative overflow-hidden rounded-lg
                transition-all duration-500 ease-out
                animate-fadeSlideIn
                ${isDarkMode ? 'bg-gray-800/40' : 'bg-white/80'}
                shadow-md
            `}
        >
            <div className="p-4 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                    <div className={`
                        p-2 rounded-lg
                        ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'}
                        w-9 h-9
                    `} />
                    <div className={`
                        h-6 w-32 rounded
                        ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'}
                    `} />
                </div>
                <div className="space-y-2">
                    {[1, 2].map((_, i) => (
                        <div
                            key={i}
                            className={`
                                w-full p-3 rounded-lg
                                ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-100'}
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-2 flex-1">
                                    <div className={`
                                        h-5 w-1/3 rounded
                                        ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}
                                    `} />
                                    <div className={`
                                        h-4 w-2/3 rounded
                                        ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}
                                    `} />
                                </div>
                                <div className="flex items-center space-x-4">
                                    {[1, 2].map((_, j) => (
                                        <div
                                            key={j}
                                            className={`
                                                h-4 w-8 rounded
                                                ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}
                                            `}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TestCard: React.FC<{
    test: Test;
    modules: Module[];
    isDarkMode: boolean;
    onModuleSelect: (testId: number, moduleId: number) => void;
    index: number;
}> = ({ test, modules, isDarkMode, onModuleSelect, index }) => {
    return (
        <div className={`
            relative overflow-hidden rounded-lg p-6
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
            shadow-md transition-transform duration-500 hover:scale-105
        `}>
            <div className="flex items-center space-x-3 mb-4">
                <BookOpen className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {test.title}
                </h3>
            </div>
            <div className="space-y-4">
                {modules.map((module, i) => (
                    <button
                        key={module.id}
                        onClick={() => onModuleSelect(test.id, module.id)}
                        className={`
                            py-2 px-4 rounded-full bg-blue-500 text-white text-sm
                            hover:bg-blue-600 transition-colors duration-300
                        `}
                    >
                        {module.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

const Contents: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const [tests, setTests] = useState<Test[]>([]);
    const [modules, setModules] = useState<{ [key: number]: Module[] }>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const testData = await getTests();
                setTests(testData);
                
                const modulesData: { [key: number]: Module[] } = {};
                for (const test of testData) {
                    const moduleData = await getModules(test.id);
                    modulesData[test.id] = moduleData;
                }
                setModules(modulesData);
            } catch (error) {
                setError('Failed to fetch data.');
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`
            min-h-screen transition-all duration-500
            ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}
            py-28
        `}>
            <style>
                {`
                    @keyframes fadeSlideIn {
                        0% {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .animate-fadeSlideIn {
                        animation: fadeSlideIn 0.8s ease-out forwards;
                        opacity: 0;
                    }
                `}
            </style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative space-y-2 mb-12 animate-fadeSlideIn">
                    <div className="flex items-center space-x-3 mb-2">
                        <Sparkles className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <h1 className={`
                            text-3xl font-bold tracking-tight
                            ${isDarkMode ? 'text-white' : 'text-gray-900'}
                        `}>
                            Digital SAT Practice
                        </h1>
                    </div>
                    <p className={`
                        text-lg max-w-2xl
                        ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                        Master the digital SAT format with our adaptive practice tests. Each test includes two modules tailored to your skill level.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {isLoading ? (
                        Array(4).fill(0).map((_, idx) => (
                            <SkeletonTestCard 
                                key={idx} 
                                isDarkMode={isDarkMode} 
                                index={idx} 
                            />
                        ))
                    ) : (
                        tests.map((test, index) => (
                            <TestCard
                                key={test.id}
                                test={test}
                                modules={modules[test.id] || []}
                                isDarkMode={isDarkMode}
                                onModuleSelect={(testId, moduleId) => navigate(`/test/${testId}/module/${moduleId}`)}
                                index={index}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contents;
