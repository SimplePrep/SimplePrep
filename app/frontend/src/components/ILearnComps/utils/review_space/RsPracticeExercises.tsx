import React, { useState, useEffect } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsLightbulbFill } from 'react-icons/bs';
import { Question } from '../../../auth_utils/types';

interface UserAnswer {
    id: number;
    test_result: number;
    question: number;
    selected_option: string;
}

interface PracticeExercisesProps {
    isDarkMode: boolean;
}

const PracticeExercises: React.FC<PracticeExercisesProps> = ({ isDarkMode }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [showIntroduction, setShowIntroduction] = useState(true);

    const questions: Question[] = [
        {
            id: 1,
            test: 101,
            model: 'SAT',
            section: 'Reading',
            title: 'Main Idea Question',
            context: 'This is the context for question 1.',
            query: 'What is the main idea of the passage?',
            graph_img: '',  
            option_A: 'Option A',
            option_B: 'Option B',
            option_C: 'Option C',
            option_D: 'Option D',
            correct_answer: 'B',
            explanation: 'This is the explanation for why B is the correct answer.',
            likes: 5,
            dislikes: 1,
            created_at: '2024-08-23T12:34:56Z',
        },
        {
            id: 2,
            test: 102,
            model: 'SAT',
            section: 'Reading',
            title: 'Purpose Question',
            context: 'This is the context for question 2.',
            query: 'What is the purpose of the second paragraph?',
            graph_img: '',  
            option_A: 'Option A',
            option_B: 'Option B',
            option_C: 'Option C',
            option_D: 'Option D',
            correct_answer: 'A',
            explanation: 'This is the explanation for why A is the correct answer.',
            likes: 3,
            dislikes: 0,
            created_at: '2024-08-23T12:35:00Z',
        },
    ];

    const userAnswers: UserAnswer[] = [
        { id: 1, test_result: 1, question: 1, selected_option: 'A' },
        { id: 2, test_result: 1, question: 2, selected_option: 'C' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeIn(true);
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = userAnswers.find(answer => answer.question === currentQuestion.id);
    const selectedChoice = userAnswer ? userAnswer.selected_option : null;

    const answerChoices = [
        { label: 'A', content: currentQuestion.option_A },
        { label: 'B', content: currentQuestion.option_B },
        { label: 'C', content: currentQuestion.option_C },
        { label: 'D', content: currentQuestion.option_D },
    ];

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setShowExplanation(false);
        }
    };

    const handleNextQuestion = () => {
        if (showIntroduction) {
            setShowIntroduction(false);
        } else if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowExplanation(false);
        }
    };

    const toggleExplanation = () => {
        setShowExplanation(!showExplanation);
    };

    const renderExplanation = (explanation: string) => {
        const sections = explanation.split('\n');
        return (
            <div className="mt-5 font-medium text-md">
                {sections.map((section, index) => (
                    <p key={index} className={index === 0 ? 'font-bold text-lg' : 'mt-2'}>
                        {section}
                    </p>
                ))}
            </div>
        );
    };
    const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-white';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-800';

    return (
        <div className={`min-h-screen  ${fadeIn ? 'animate-fadeIn' : 'opacity-0'} ${bgColor} ${textColor}`}>
            <div className={`relative top-20 max-w-[1400px] mx-auto p-5 ${bgColor} shadow-2xl rounded-3xl transition-all duration-300 border`}>
                <div className='flex p-3 justify-between items-center'>
                    <div className='mx-5 flex gap-10 items-center'>
                        <h1 className={`font-bold text-2xl ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Practice Exercises</h1>
                    </div>
                    {!showIntroduction && (
                        <div className={`text-md font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </div>
                    )}
                </div>
                <hr className={`border-[1px] ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />

                {showIntroduction ? (
                    <div className="p-14 text-center">
                        <h2 className={`text-3xl font-semibold mb-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Welcome to the Practice Exercises</h2>
                        <p className="text-xl leading-relaxed max-w-2xl mx-auto">
                            These exercises will help you improve your understanding and application of key concepts.
                            Take your time to answer each question carefully. After completing a question, you can
                            view an explanation to understand the reasoning behind the correct answer.
                        </p>
                        <button 
                            onClick={handleNextQuestion} 
                            className={`mt-10 py-3 px-8 ${isDarkMode ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white text-lg font-semibold rounded-full transition-colors shadow-lg hover:shadow-xl`}
                        >
                            Start Practice
                        </button>
                    </div>
                ) : (
                    <div className='flex flex-grow mt-6'>
                        <div className={`w-[50%] border-r-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pr-8`}>
                            <div className={`p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl shadow-inner`}>
                                <h3 className={`font-bold text-xl mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Context</h3>
                                <p className='font-medium text-lg leading-relaxed'>{currentQuestion.context}</p>
                            </div>
                        </div>
                        <div className='w-[50%] pl-8'>
                            <div className='p-8'>
                                <h3 className={`font-bold text-xl mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Question {currentQuestionIndex + 1}</h3>
                                <p className='font-medium text-md mb-6'>{currentQuestion.query}</p>
                                <div className='flex flex-col gap-3'>
                                    {answerChoices.map((choice, index) => (
                                        <button
                                            key={index}
                                            className={`py-3 px-6 border-2 rounded-xl font-semibold text-md w-full text-left transition-all duration-200
                                                        ${selectedChoice === choice.label && selectedChoice !== currentQuestion.correct_answer 
                                                            ? isDarkMode ? 'bg-red-900 border-red-700' : 'bg-red-100 border-red-500' 
                                                            : ''}
                                                        ${currentQuestion.correct_answer === choice.label 
                                                            ? isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-100 border-green-500' 
                                                            : isDarkMode ? 'hover:bg-indigo-900 hover:border-indigo-400' : 'hover:bg-indigo-50 hover:border-indigo-500'}`}
                                        >
                                            <span className="mr-3 font-bold">{choice.label}</span> {choice.content}
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    onClick={toggleExplanation} 
                                    className={`mt-8 py-2 px-5 ${isDarkMode ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-yellow-400 hover:bg-yellow-500'} text-gray-800 rounded-full transition-colors shadow-md hover:shadow-lg flex items-center justify-center font-semibold text-lg`}
                                >
                                    <BsLightbulbFill className="mr-2" />
                                    {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                                </button>
                                {showExplanation && (
                                    <div className={`mt-6 p-6 ${isDarkMode ? 'bg-yellow-900' : 'bg-yellow-50'} rounded-2xl shadow-inner`}>
                                        {renderExplanation(currentQuestion.explanation)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
                {!showIntroduction && (
                    <div className="flex justify-between p-5 mt-8">
                        <button
                            onClick={handlePreviousQuestion}
                            className={`py-3 px-6 rounded-full font-semibold text-lg flex items-center 
                                        ${currentQuestionIndex === 0 
                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                                            : isDarkMode ? 'bg-indigo-700 text-white hover:bg-indigo-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'} 
                                        transition-colors shadow-md hover:shadow-lg`}
                            disabled={currentQuestionIndex === 0}
                        >
                            <BsFillArrowLeftCircleFill className="mr-2" /> Previous
                        </button>
                        <button
                            onClick={handleNextQuestion}
                            className={`py-3 px-6 rounded-full font-semibold text-lg flex items-center 
                                        ${currentQuestionIndex === questions.length - 1 
                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                                            : isDarkMode ? 'bg-indigo-700 text-white hover:bg-indigo-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'} 
                                        transition-colors shadow-md hover:shadow-lg`}
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            Next <BsFillArrowRightCircleFill className="ml-2" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PracticeExercises;
