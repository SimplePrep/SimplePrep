import React from 'react';
import { Question } from '../../../auth_utils/types';
import { MdOutlineCancel } from "react-icons/md";

interface QuestionListModalProps {
  questions: Question[];
  answeredQuestions: number[];
  remarkedQuestions: number[];
  currentQuestionIndex: number;
  onClose: () => void;
  onSelectQuestion: (index: number) => void;
}

const QuestionListModal: React.FC<QuestionListModalProps> = ({
  questions,
  answeredQuestions,
  remarkedQuestions,
  currentQuestionIndex,
  onClose,
  onSelectQuestion,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-3/4 max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold dark:text-white">Question List</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            <MdOutlineCancel size={24} className="sm:size-[30px]"/>
          </button>
        </div>
        
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 sm:gap-2">
          {questions.map((_, index) => {
            const questionNumber = index + 1;
            let bgColor = 'bg-white';
            if (remarkedQuestions.includes(questions[index].id)) {
              bgColor = 'bg-yellow-500';
            } else if (answeredQuestions.includes(questions[index].id)) {
              bgColor = 'bg-green-500';
            } else if (questionNumber === currentQuestionIndex + 1) {
              bgColor = 'bg-blue-500';
            }
            return (
              <button
                key={index}
                className={`w-full aspect-square ${bgColor} text-gray-900 flex items-center justify-center rounded-md border-2 hover:border-red-800 text-xs sm:text-sm p-0.5`}
                onClick={() => onSelectQuestion(index)}
              >
                {questionNumber}
              </button>
            );
          })}
        </div>
        
        <div className="grid grid-cols-2 sm:flex sm:justify-between items-center mt-4 gap-2 sm:gap-0">
          {[
            { color: 'bg-green-500', label: 'Answered' },
            { color: 'bg-yellow-500', label: 'Marked' },
            { color: 'bg-blue-500', label: 'Current' },
            { color: 'bg-white border dark:bg-gray-700', label: 'Unanswered' }
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 sm:w-4 sm:h-4 ${color} rounded-md`}></div>
              <p className="dark:text-white text-xs sm:text-base">{label}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionListModal;