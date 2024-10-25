import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionItemProps {
  question: string;
  answer: string;
}

interface QuestionListProps {
  questions: QuestionItemProps[];
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-white hover:bg-slate-50 transition-colors duration-200 rounded-lg">
      <div className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full"
        >
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold text-left text-slate-800">
              {question}
            </h3>
            <div className="ml-4">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-blue-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-400" />
              )}
            </div>
          </div>
        </button>
        {isExpanded && (
          <div className="mt-4 text-slate-600 leading-relaxed">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
};

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <div className="space-y-2 divide-y divide-slate-100">
      {questions.map((question, index) => (
        <QuestionItem 
          key={index} 
          question={question.question} 
          answer={question.answer} 
        />
      ))}
    </div>
  );
};

const FAQ = () => {
  const questions = [
    {
      question: "How can your platform help me prepare for the SAT?",
      answer: "Our platform provides comprehensive SAT preparation resources including study materials, practice tests, and personalized feedback - all completely free of charge. We believe quality education should be accessible to everyone."
    },
    {
      question: "Do I need to pay for any features?",
      answer: "No! Our entire platform is completely free. We're committed to making quality SAT preparation accessible to all students, so you'll never have to pay for any of our features or resources."
    },
    {
      question: "How often are the study materials updated?",
      answer: "Our study materials are regularly updated to reflect the latest changes in the SAT exam format and content. We ensure our resources stay current and effective to give you the best preparation experience."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is simple! Just click the 'Sign Up' button and create your free account. Once registered, you'll have immediate access to all our study materials and practice tests."
    },
    {
      question: "Can I access the platform from my mobile device?",
      answer: "Yes! Our platform is fully responsive and can be accessed from any device with an internet connection, including smartphones and tablets. Study wherever and whenever works best for you."
    },
    {
      question: "How can I track my progress?",
      answer: "Our platform includes comprehensive progress tracking tools that help you monitor your improvement, identify areas that need more focus, and visualize your journey toward your target SAT score."
    },
    {
      question: "Is there a limit to how many practice tests I can take?",
      answer: "Not at all! You can take as many practice tests as you'd like. We encourage regular practice to build confidence and familiarity with the exam format."
    }
  ];

  return (
    <div id="faq-section" className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-600">
          Have questions? We're here to help you make the most of our free SAT preparation platform.
        </p>
      </div>
      <QuestionList questions={questions} />
    </div>
  );
};

export default FAQ;