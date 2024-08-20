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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Question List</h2>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
            <MdOutlineCancel size={30}/>
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
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
                className={`w-12 h-12 ${bgColor} text-gray-900  flex items-center justify-center rounded-md border-2 hover:border-red-800`}
                onClick={() => onSelectQuestion(index)}
              >
                {questionNumber}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-md"></div>
            <p className="dark:text-white">Answered</p>
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-md"></div>
            <p className="dark:text-white">Marked</p>
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-md"></div>
            <p className="dark:text-white">Current</p>
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border dark:bg-gray-700 rounded-md"></div>
            <p className="dark:text-white">Unanswered</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionListModal;
