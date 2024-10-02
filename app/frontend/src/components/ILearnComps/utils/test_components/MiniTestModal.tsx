import React, { useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon } from 'react-icons/bs';
import { FaCheck, FaLightbulb, FaTimes } from 'react-icons/fa';

interface Question {
    id: number;
    test: number;
    model: string;  // Corresponds to the module (e.g., Reading, Writing)
    section: string;  // Corresponds to the topic (e.g., Inference, Main Idea)
    title: string;
    context: string;
    query: string;
    graph_img: string;
    option_A: string;
    option_B: string;
    option_C: string;
    option_D: string;
    correct_answer: string;
    explanation: string;
    likes: number;
    dislikes: number;
    created_at: string;
}

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

interface OptionProps {
    label: string;
    content: string;
    isSelected: boolean;
    isCorrect: boolean;
    onClick: () => void;
}

const Option: React.FC<OptionProps> = ({ label, content, isSelected, isCorrect, onClick }) => {
  let bgColor = 'bg-gray-50 hover:bg-gray-100';
  let borderColor = '';
  let textColor = 'text-gray-700';
  let icon = null;

  if (isCorrect) {
    bgColor = 'bg-green-50';
    borderColor = 'border-l-4 border-green-500';
    textColor = 'text-green-600';
    icon = <FaCheck className="text-green-500" />;
  } else if (isSelected) {
    bgColor = 'bg-red-50';
    borderColor = 'border-l-4 border-red-500';
    textColor = 'text-red-600';
    icon = <FaTimes className="text-red-500" />;
  }

  return (
    <div 
      className={`flex items-center justify-between p-4 mb-2 cursor-pointer transition-all duration-100 rounded-lg ${bgColor} ${borderColor}`}
      onClick={onClick}
    >
      <span className={`text-lg ${textColor} font-medium`}>
        {`(${label}) ${content}`}
      </span>
      <div className="flex items-center">
        {icon}
        <div className={`ml-2 w-5 h-5 rounded-full border-2 ${
          isSelected 
            ? 'border-blue-500 bg-blue-500'
            : 'border-gray-300'
        }`}>
          {isSelected && (
            <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
          )}
        </div>
      </div>
    </div>
  );
};

const MiniTestModal: React.FC<MiniTestProps> = ({ isOpen, onClose, questions, userAnswers }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [localUserAnswers, setLocalUserAnswers] = useState<UserAnswer[]>(userAnswers);

    const darkModeClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
    const buttonText = isDarkMode ? 'text-gray-300' : 'text-gray-800';
    const buttonBaseClasses = 'py-2 px-6 border-2 rounded-xl font-semibold text-lg transition-all';
    const buttonHoverClasses = 'hover:bg-blue-600 hover:text-white';
    const buttonBorderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = localUserAnswers.find(answer => answer.question === currentQuestion.id);
    const selectedChoice = userAnswer ? userAnswer.selected_option : null;

    const answerChoices = [
        { label: 'A', content: currentQuestion.option_A },
        { label: 'B', content: currentQuestion.option_B },
        { label: 'C', content: currentQuestion.option_C },
        { label: 'D', content: currentQuestion.option_D },
    ];

    const handleOptionClick = (label: string) => {
        const updatedAnswers = [...localUserAnswers];
        const existingAnswerIndex = updatedAnswers.findIndex(answer => answer.question === currentQuestion.id);
        
        if (existingAnswerIndex !== -1) {
            updatedAnswers[existingAnswerIndex].selected_option = label;
        } else {
            updatedAnswers.push({
                id: Math.random(),
                test_result: 0,
                question: currentQuestion.id,
                selected_option: label
            });
        }
        
        setLocalUserAnswers(updatedAnswers);
    };

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

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 font-inter`}>
            <div className={`relative top-20 max-w-[1400px] mx-auto border shadow-lg rounded-xl ${darkModeClass}`}>
                <div className='relative flex justify-between items-center py-3 px-5'>
                    <div className='mx-2 flex gap-10 items-center'>
                        <p className='font-bold text-2xl'>Test Preview</p>
                        <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-2xl hover:bg-blue-500 hover:border-blue-600">
                            <BsMoon />
                        </button>
                    </div>

                    {/* Module and Topic Info */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <p className="font-semibold text-xl">{currentQuestion.model} - {currentQuestion.section}</p>
                    </div>

                    <div className='flex items-center gap-5'>
                        <button 
                            onClick={onClose} 
                            className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonBorderColor} ${buttonText}`}
                        >
                            Exit
                        </button>
                    </div>
                </div>
                <hr className="border-gray-300 border-[1px]" />
                <div className={`h-full flex flex-grow border-b-2 ${isDarkMode ? 'border-gray-200' : 'border-gray-300'}`}>
                    <div className={`w-[50%] border-r-2 p-5 ${isDarkMode ? 'bg-gray-700 border-' : 'bg-gray-200 border-white'}`}>
                        <div className={`h-full p-5 rounded-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                            <p className='font-medium text-lg'>{currentQuestion.context}</p>
                        </div>
                    </div>
                    <div className={`w-[50%] p-5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div className= {`h-full p-5 rounded-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                            <div className={`rounded-xl  ${isDarkMode ? 'bg-gray-900' : ''}`}>
                                <p className='font-bold text-lg'>Question {currentQuestionIndex + 1}</p>
                            </div>
                            <p className='font-medium text-lg mt-3'>{currentQuestion.query}</p>
                            <div className='mt-7'>
                                {answerChoices.map((choice, index) => (
                                    <Option
                                        key={index}
                                        label={choice.label}
                                        content={choice.content}
                                        isSelected={selectedChoice === choice.label}
                                        isCorrect={currentQuestion.correct_answer === choice.label}
                                        onClick={() => handleOptionClick(choice.label)}
                                    />
                                ))}
                            </div>
                            <div className="mt-5">
                            <button 
                                    onClick={toggleExplanation} 
                                    className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonBorderColor} ${buttonText}`}
                                >
                                    <FaLightbulb className="inline mr-2" />
                                    {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                                </button>
                            </div>
                            {showExplanation && renderExplanation(currentQuestion.explanation)}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between p-5">
                    <button
                        onClick={handlePreviousQuestion}
                        className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonBorderColor} ${buttonText}`}
                        disabled={currentQuestionIndex === 0}
                    >
                        <BsFillArrowLeftCircleFill className="inline mr-2" /> Previous
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonBorderColor} ${buttonText}`}
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
