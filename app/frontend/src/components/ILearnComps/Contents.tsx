import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const SkeletonCard = () => (
    <div className="p-6 bg-gray-100 rounded-lg border-2 border-gray-200 shadow-lg overflow-hidden relative">
        <div className="animate-pulse">
            <div className="flex justify-between items-center mb-6">
                <div className="h-6 w-8 bg-gray-300 rounded"></div>
            </div>
            <div className="h-7 w-3/4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-4"></div>
            <div className="flex flex-row gap-5 justify-between items-center">
                <div className="h-10 w-28 bg-gray-300 rounded"></div>
                <div className="h-10 w-28 bg-gray-300 rounded"></div>
            </div>
        </div>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </div>
);

interface ContentsProps {
    isDarkMode: boolean;
}

const Contents: React.FC<ContentsProps> = ({ isDarkMode }) => {

    const [tests, setTests] = useState<Test[]>([]);
    const [modules, setModules] = useState<{ [key: number]: Module[] }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const Mode = isDarkMode ? 'text-white' : 'text-gray-800';

    useEffect(() => {
        // Use sample data instead of fetching from API
        const sampleTests: Test[] = [
            { id: 1, title: 'SAT Reading Test' },
            { id: 2, title: 'SAT Writing Test' },
            { id: 3, title: 'SAT Math Test' },
            { id: 4, title: 'SAT Reading Test' },
            { id: 5, title: 'SAT Writing Test' },
            { id: 6, title: 'SAT Math Test' },
        ];

        const sampleModules: { [key: number]: Module[] } = {
            1: [
                {
                    id: 101,
                    test: 1,
                    title: 'Reading Comprehension',
                    description: 'Practice questions for reading comprehension.',
                    num_questions: 20,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
                {
                    id: 102,
                    test: 1,
                    title: 'Vocabulary in Context',
                    description: 'Questions focused on vocabulary usage.',
                    num_questions: 15,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
            ],
            2: [
                {
                    id: 201,
                    test: 2,
                    title: 'Grammar and Usage',
                    description: 'Questions on grammar rules and usage.',
                    num_questions: 25,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
            ],
            3: [
                {
                    id: 301,
                    test: 3,
                    title: 'Algebra Basics',
                    description: 'Basic algebraic equations and expressions.',
                    num_questions: 30,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
                {
                    id: 302,
                    test: 3,
                    title: 'Geometry Concepts',
                    description: 'Practice geometry problems.',
                    num_questions: 20,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
            ],
            4: [
                {
                    id: 301,
                    test: 3,
                    title: 'Algebra Basics',
                    description: 'Basic algebraic equations and expressions.',
                    num_questions: 30,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
                {
                    id: 302,
                    test: 3,
                    title: 'Geometry Concepts',
                    description: 'Practice geometry problems.',
                    num_questions: 20,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
            ],
            5: [
                {
                    id: 301,
                    test: 3,
                    title: 'Algebra Basics',
                    description: 'Basic algebraic equations and expressions.',
                    num_questions: 30,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
                {
                    id: 302,
                    test: 3,
                    title: 'Geometry Concepts',
                    description: 'Practice geometry problems.',
                    num_questions: 20,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
            ],
            6: [
                {
                    id: 301,
                    test: 3,
                    title: 'Algebra Basics',
                    description: 'Basic algebraic equations and expressions.',
                    num_questions: 30,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
                {
                    id: 302,
                    test: 3,
                    title: 'Geometry Concepts',
                    description: 'Practice geometry problems.',
                    num_questions: 20,
                    created_at: '2024-01-01',
                    updated_at: '2024-01-10',
                },
            ],
        };

        setTests(sampleTests);
        setModules(sampleModules);
        setIsLoading(false);
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            );
        }

        if (error) {
            return <div className="text-red-500">{error}</div>;
        }

        return (
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tests.map((test, index) => {
                    const borderColorClass = borderColorClasses[index % borderColorClasses.length];
                    const testModules = modules[test.id] || [];
                    return (
                        <div key={test.id} className={`p-6 bg-black rounded-lg border-2 ${borderColorClass} border-white shadow-lg`}>
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-xl text-purple-500">{test.id}</div>
                            </div>
                            <h5 className="text-white text-xl leading-tight font-medium mb-2">{test.title}</h5>
                            <p className="text-gray-400 text-base mb-4">
                                Test your skills with this practice test.
                            </p>
                            <div className='flex flex-row gap-5 flex-wrap justify-between items-center'>
                                {testModules.map((module, moduleIndex) => (
                                    <button
                                        key={module.id}
                                        onClick={() => handleModuleClick(test.id, module.id)}
                                        className='mt-auto py-2 px-4 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50'
                                    >
                                        {`Module ${moduleIndex + 1}`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

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

    const handleModuleClick = (testId: number, moduleId: number) => {
        navigate(`/test/${testId}/module/${moduleId}`);
    };

    return (
        <div className='max-w-[1200px] h-full mx-auto'>
            <div className='py-40 rounded-2xl'>
                <p className={`p-10 font-medium text-xl ${Mode}`}>Freemium English and Writing Practice tests</p>
                <div className='max-w-[1000px] mx-auto'>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contents;
