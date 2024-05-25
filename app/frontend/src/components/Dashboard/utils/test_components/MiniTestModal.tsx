// MiniTestModal.tsx
import React, { useState, useEffect } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon } from 'react-icons/bs';
import { Question, UserAnswer } from '../../types';

interface MiniTestProps {
    isOpen: boolean;
    onClose: () => void;
    questions: Question[];
    userAnswers: UserAnswer[];
}

const MiniTestModal: React.FC<MiniTestProps> = ({ isOpen, onClose, questions, userAnswers }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    const [fadeIn, setFadeIn] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    useEffect(() => {
        if (questions.length > 0) {
            const currentQuestion = questions[currentQuestionIndex];
            const userAnswer = userAnswers.find(answer => answer.questionId === currentQuestion.id);
            setSelectedChoice(userAnswer ? userAnswer.selectedChoice : null);
        }
    }, [currentQuestionIndex, questions, userAnswers]);

    if (!isOpen) return null;

    const currentQuestion = questions[currentQuestionIndex];
    const answerChoices = [
        { label: 'A', content: currentQuestion.option_A },
        { label: 'B', content: currentQuestion.option_B },
        { label: 'C', content: currentQuestion.option_C },
        { label: 'D', content: currentQuestion.option_D },
    ];

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
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
                                                    ${selectedChoice === choice.label ? 'border-blue-500' : 'hover:border-blue-500'}
                                                    ${currentQuestion.correct_answer === choice.label ? 'bg-green-200' : ''}
                                                    ${selectedChoice === choice.label && currentQuestion.correct_answer !== choice.label ? 'bg-red-200' : ''}`}
                                        onClick={() => setSelectedChoice(choice.label)}
                                    >
                                        {`(${choice.label})`} {choice.content}
                                    </button>
                                ))}
                            </div>
                            <p className='mt-5 font-medium text-md'>Explanation: {currentQuestion.explanation}</p>
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
