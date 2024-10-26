import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Timer, Target, Sparkles } from 'lucide-react';
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
                ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}
                shadow-md p-6 animate-pulse
            `}
        >
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-200/10" />
                    <div>
                        <div className="h-6 w-32 rounded bg-gray-200/10" />
                        <div className="h-4 w-24 rounded bg-gray-200/10 mt-2" />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="h-16 rounded-xl bg-gray-200/10" />
                    <div className="h-16 rounded-xl bg-gray-200/10" />
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
    const [isHovered, setIsHovered] = useState(false);
    const [activeModule, setActiveModule] = useState<number | null>(null);
    const animationDelay = `${index * 150}ms`;

    return (
        <div
            style={{ animationDelay }}
            className={`
                relative overflow-hidden
                rounded-lg backdrop-blur-sm
                transition-all duration-500 ease-out
                animate-fadeSlideIn
                ${isDarkMode 
                    ? 'bg-gray-800/40 hover:bg-gray-800/60' 
                    : 'bg-white/80 hover:bg-white'}
                transform hover:scale-[1.01]
                group cursor-pointer
                border border-transparent
                ${isDarkMode ? 'hover:border-gray-700' : 'hover:border-gray-200'}
                shadow-md
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient overlay */}
            <div className={`
                absolute inset-0 transition-opacity duration-500
                bg-gradient-to-br 
                ${isDarkMode 
                    ? 'from-blue-500/10 to-purple-500/10' 
                    : 'from-blue-50/50 to-purple-50/50'}
                ${isHovered ? 'opacity-100' : 'opacity-0'}
            `} />

            <div className="relative p-4">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                    <div className={`
                        p-2 rounded-lg
                        transition-all duration-300
                        ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100/80'}
                        group-hover:scale-105
                    `}>
                        <BookOpen className={`
                            w-5 h-5
                            ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}
                        `} />
                    </div>
                    <h3 className={`
                        text-lg font-semibold
                        ${isDarkMode ? 'text-white' : 'text-gray-900'}
                    `}>
                        {test.title}
                    </h3>
                </div>

                {/* Modules */}
                <div className="space-y-2">
                    {modules.map((module) => (
                        <button
                            key={module.id}
                            onClick={() => onModuleSelect(test.id, module.id)}
                            onMouseEnter={() => setActiveModule(module.id)}
                            onMouseLeave={() => setActiveModule(null)}
                            className={`
                                w-full text-left p-3 rounded-lg
                                transition-all duration-300 ease-out
                                group/module relative
                                ${isDarkMode 
                                    ? 'hover:bg-blue-500/10 bg-gray-700/30' 
                                    : 'hover:bg-blue-50/50 bg-gray-50/50'}
                                ${activeModule === module.id ? 'scale-[1.01]' : ''}
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <span className={`
                                            font-medium text-base
                                            ${isDarkMode ? 'text-white' : 'text-gray-900'}
                                        `}>
                                            {module.title}
                                        </span>
                                    </div>
                                    <div className={`
                                        text-sm
                                        ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                                    `}>
                                        {module.description}
                                    </div>
                                </div>

                                {/* Module stats */}
                                <div className="flex items-center space-x-4">
                                    <Timer className="w-4 h-4 text-gray-400" />
                                    <ChevronRight className={`
                                        w-4 h-4 transition-all duration-300
                                        text-gray-400 group-hover/module:text-blue-500
                                        transform group-hover/module:translate-x-1
                                    `} />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Practice: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const [tests, setTests] = useState<Test[]>([]);
    const [modules, setModules] = useState<{ [key: number]: Module[] }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchDataWithTimeout = async (timeout: number) => {
        return Promise.race([
            (async () => {
                const testData: Test[] = await getTests();
                const modulesData: { [key: number]: Module[] } = {};

                for (const test of testData) {
                    const moduleData: Module[] = await getModules(test.id);
                    modulesData[test.id] = moduleData;
                }

                setTests(testData);
                setModules(modulesData);
                setIsLoading(false);
            })(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), timeout)
            )
        ]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                await fetchDataWithTimeout(5000); // 5 seconds timeout
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to fetch data.');
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
                {/* Header */}
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

                {/* Display Error Message */}
                {error && (
                    <div className="text-center mb-6">
                        <p className="text-red-600 text-lg font-semibold">{error}</p>
                    </div>
                )}

                {/* Test Grid */}
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

export default Practice;
