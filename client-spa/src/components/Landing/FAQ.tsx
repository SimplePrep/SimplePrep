import React, {useState} from 'react';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface QuestionItemProps {
    question: string;
    answer: string;
}

interface QuestionListProps {
    questions: QuestionItemProps[];
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, answer }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleAnswer = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <li>
        <div className="mt-10 flex items-center justify-between">
          <button onClick={toggleAnswer}><p className='text-lg font-bold'>{question}</p></button>
          <button onClick={toggleAnswer}>
            {isExpanded ? <span><FontAwesomeIcon icon={faCircleXmark} size='2x'/></span> : <span><FontAwesomeIcon icon={faCircleCheck} size='2x' /></span>}
          </button>
          
        </div>
        {isExpanded && <p className="mt-5 text-lg text-slate-500">{answer}</p>}
        <hr/>
      </li>
    );
};

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
    return (
      <ul className="space-y-4">
        {questions.map((question, index) => (
          <QuestionItem key={index} question={question.question} answer={question.answer} />
        ))}
      </ul>
    );
};




const FAQ = () => {

    const questions = [
        {
          question: "How can your platform help me prepare for the SAT?",
          answer: "Our platform offers SAT preparation resources such as study materials, practice tests, and personalized feedback to help students prepare for the SAT online exam."
        }, 
        {
          question: "Is there a free trial?",
          answer: "Answer2"
        }, 
        {
          question: "How often are the study materials updated?",
          answer: "Answer1"
        }, 
        {
          question: "What is your cancellation policy?",
          answer: "Answer1"
        }, 
        {
          question: "How do I sign up for an account?",
          answer: "Answer1"
        }, 
        {
          question: "What payment methods do you accept?",
          answer: "Answer1"
        }, 
        {
          question: "Can I access the platform from my mobile device?",
          answer: "Answer1"
        }, 
        {
          question: "Can I track my progress and see my scores?",
          answer: "Answer1"
        }, 
      ]

  return (
    <div className='max-w-[1240px] mx-auto w-full my-24  items-center'>
        <div className='flex flex-col gap-5'>
            <h1 className='text-6xl font-bold lg:4xl md:3xl text-center'>Frequently Asked Questions</h1>
            <p className='text-center font-medium text-2xl'>Have questions? We are here to help.</p>
        </div>
        <div className='mt-20 w-[90%] mx-auto items-center justify-center'>
            <QuestionList questions={questions} />
        </div>
    </div>
  )
}

export default FAQ