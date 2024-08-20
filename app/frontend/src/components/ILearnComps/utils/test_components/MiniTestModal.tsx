import React, { useState, useEffect } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon } from 'react-icons/bs';
import { Question } from '../../../auth_utils/types';

interface UserAnswer {
    id: number;
    test_result: number;
    question: number;
    selected_option: string;
}

interface MiniTestProps {
    isOpen: boolean;
    onClose: () => void;
    questions: Question[];
    userAnswers: UserAnswer[];
}

const MiniTestModal: React.FC<MiniTestProps> = ({ isOpen, onClose, questions, userAnswers }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const darkModeClass = isDarkMode ? 'dark bg-gray-800 text-white' : 'bg-white text-black';
    const animationClass = fadeIn ? 'animate-fadeIn' : 'opacity-0';

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeIn(true);
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

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
        if (currentQuestionIndex < questions.length - 1) {
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

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 ${animationClass}`}>
            <div className={`relative top-20 max-w-[1400px] mx-auto p-5 border shadow-lg rounded-2xl ${darkModeClass}`}>
                <div className='flex p-5 justify-between items-center'>
                    <div className='mx-5 flex gap-10 items-center'>
                        <p className='font-bold text-2xl'>Test Preview</p>
                        <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500">
                            <BsMoon />
                        </button>
                    </div>
                    <div className='flex justify-end items-center gap-5'>
                        <button onClick={onClose} className='py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'>Exit</button>
                    </div>
                </div>
                <hr className="border-gray-300 border-[1px]" />
                <div className='flex flex-grow'>
                    <div className='w-[50%] border-r-2'>
                        <div className="p-14">
                            <p className='font-medium text-lg'>{currentQuestion.context}</p>
                        </div>
                    </div>
                    <div className='w-[50%]'>
                        <div className='p-14'>
                            <div className='flex gap-2 items-center'>
                                <p className='font-bold text-lg'>Question {currentQuestionIndex + 1}</p>
                            </div>
                            <p className='font-medium text-lg mt-3'>{currentQuestion.query}</p>
                            <div className='flex flex-col mt-7 gap-2'>
                                {answerChoices.map((choice, index) => (
                                    <button
                                        key={index}
                                        className={`py-2 px-4 border-2 rounded-lg font-semibold text-lg w-full text-left 
                                                    ${selectedChoice === choice.label && selectedChoice !== currentQuestion.correct_answer ? 'border-red-500' : ''}
                                                    ${currentQuestion.correct_answer === choice.label ? 'border-green-500' : 'hover:border-blue-500'}`}
                                    >
                                        {`(${choice.label})`} {choice.content}
                                    </button>
                                ))}
                            </div>
                            <button 
                                onClick={toggleExplanation} 
                                className="mt-5 py-2 px-4 border-2 rounded-lg hover:bg-[#00df9a] hover:border-blue-500 font-semibold text-lg"
                            >
                                {showExplanation ? 'Close Explanation' : 'Show Explanation'}
                            </button>
                            {showExplanation && renderExplanation(currentQuestion.explanation)}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between p-5">
                    <button
                        onClick={handlePreviousQuestion}
                        className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
                        disabled={currentQuestionIndex === 0}
                    >
                        <BsFillArrowLeftCircleFill className="inline mr-2" /> Previous
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
                        disabled={currentQuestionIndex === questions.length - 1}
                    >
                        Next <BsFillArrowRightCircleFill className="inline ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MiniTestModal;
