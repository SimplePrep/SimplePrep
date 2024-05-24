// MiniTestModal.tsx
import React, { useState, useEffect } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon } from 'react-icons/bs';
import {Question, UserAnswer} from '../../types';
interface MiniTestProps {
    isOpen: boolean;
    onClose: () => void;
    questions: Question[];
    userAnswers: UserAnswer[];
}

const MiniTestModal: React.FC<MiniTestProps> = ({ isOpen, onClose, questions, userAnswers }) => {
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    const [fadeIn, setFadeIn] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(false);
    const darkModeClass = isDarkMode ? 'dark' : 'bg-white text-black';
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

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 ${animationClass}`}>
            <div className={`relative top-20 max-w-[1400px] mx-auto p-5 border  shadow-lg rounded-2xl ${darkModeClass}`}>
                <div className='flex p-5 justify-between items-center'>
                    <div className='mx-5 flex gap-10 items-center'>
                        <p className='text-bold font-ubuntu text-2xl'>Quiz</p>
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
                            <p className='font-medium text-lg'>
                                Studies have shown that people’s perception of pain can be diminished and their healing processes accelerated if those individuals believe that a medical treatment will be helpful. In an experiment testing the efficacy of an experimental analgesic lotion for treating minor scrapes and burns, researchers found that the lotion did not appear to significantly affect participants’ pain levels or healing times. However, a similar experiment found that the same lotion led to significant reductions in the pain level of study participants and resulted in faster healing. The difference in the outcomes of the two experiments was likely due to the fact that _______
                            </p>
                        </div>
                    </div>
                    <div className='w-[50%]'>
                        <div className='p-14'>
                            <div className='flex gap-2 items-center'>
                                <p className='font-bold text-lg'>Question 1</p>
                            </div>
                            <p className='font-medium text-lg mt-3'>Which choice most logically completes the text?</p>
                            <div className='flex flex-col mt-7 gap-2'>
                                {questions.map((question, index) => (
                                    <button
                                        key={index}
                                        className={`py-2 px-4 border-2 rounded-lg font-semibold text-lg w-full text-left 
                                                    ${selectedChoice === question.correct_answer ? 'border-[#00df9a]' : 'hover:border-blue-500'}`}
                                        onClick={() => setSelectedChoice(question.correct_answer)}
                                    >
                                        {`(${question.correct_answer})`} {question.query}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between p-5">
                    <button
                        onClick={() => { /* Implement previous question logic */ }}
                        className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
                    >
                        <BsFillArrowLeftCircleFill className="inline mr-2" /> Previous
                    </button>
                    <button
                        onClick={() => { /* Implement next question logic */ }}
                        className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
                    >
                        Next <BsFillArrowRightCircleFill className="inline ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MiniTestModal;
