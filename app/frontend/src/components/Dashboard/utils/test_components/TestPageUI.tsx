import React, { useEffect, useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon } from 'react-icons/bs';
import { PiFlagThin } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { getModules, getQuestionsByModuleId, submitAnswers, submitTestResult, submitUserAnswers } from '../../../utils/axios/axiosServices';
import { useAuth } from '../../../utils/AuthProvider';
import Modal from '../../../../pages/Authentication/Modal';

interface Question {
  id: number;
  model: string;
  section: string;
  title: string;
  context: string;
  query: string;
  graph_img?: string;
  option_A: string;
  option_B: string;
  option_C: string;
  option_D: string;
  correct_answer: string;
  likes: number;
  dislikes: number;
  created_at: string;
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

interface UserAnswer {
  questionId: number;
  selectedChoice: string | null;
}

const TestPageUI = () => {
  const { user } = useAuth();
  const { testId, moduleId } = useParams<{ testId: string; moduleId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestionsByModuleId(Number(moduleId));
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    const fetchModule = async () => {
      try {
        const modules = await getModules(Number(testId));
        const module = modules.find((mod) => mod.id === Number(moduleId));
        setCurrentModule(module || null);
      } catch (error) {
        console.error('Error fetching module:', error);
      }
    };

    fetchQuestions();
    fetchModule();
  }, [moduleId, testId]);

  useEffect(() => {
    const checkAuth = async () => {
      if (user && user.emailVerified) {
        // User is authenticated and email is verified
      } else {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, user]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const darkModeClass = isDarkMode ? 'dark' : '';

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      if (!selectedChoice) {
        setUnansweredQuestions(prev => [...prev, questions[currentQuestionIndex].id]);
      } else {
        setUnansweredQuestions(prev => prev.filter(id => id !== questions[currentQuestionIndex].id));
      }
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedChoice(userAnswers.find(answer => answer.questionId === questions[currentQuestionIndex - 1].id)?.selectedChoice || null);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      if (!selectedChoice) {
        setUnansweredQuestions(prev => [...prev, questions[currentQuestionIndex].id]);
      } else {
        setUnansweredQuestions(prev => prev.filter(id => id !== questions[currentQuestionIndex].id));
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(userAnswers.find(answer => answer.questionId === questions[currentQuestionIndex + 1].id)?.selectedChoice || null);
    }
  };

  const handleAnswerSelection = (choice: string) => {
    setSelectedChoice(choice);
    const updatedAnswers = [...userAnswers];
    const answerIndex = updatedAnswers.findIndex((answer) => answer.questionId === questions[currentQuestionIndex].id);

    if (answerIndex > -1) {
      updatedAnswers[answerIndex].selectedChoice = choice;
    } else {
      updatedAnswers.push({ questionId: questions[currentQuestionIndex].id, selectedChoice: choice });
    }

    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const validUserAnswers = userAnswers.filter(answer => answer.selectedChoice !== null) as { questionId: number; selectedChoice: string }[];
    if (validUserAnswers.length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    await submitAnswers(user!.uid, Number(moduleId), validUserAnswers, navigate);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate('/demo');
    }, 4000);}

  const handleParagraphSplit = (context: string) => {
    const sections = context.split('\n');
    return (
      <div className=''>
        {sections.map((section, index) => (
          <p key={index === 0 ? '' : 'mt-2'}>
            {section}
          </p>
        ))}
      </div>
    )
  }

  if (!questions.length) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answerChoices = [
    { label: 'A', content: currentQuestion.option_A },
    { label: 'B', content: currentQuestion.option_B },
    { label: 'C', content: currentQuestion.option_C },
    { label: 'D', content: currentQuestion.option_D },
  ];
  const isCurrentQuestionUnanswered = unansweredQuestions.includes(currentQuestion.id);

  const handleExit = ()=> {
    navigate('/demo')
  }
  
  return (
    <div className={`w-full h-screen flex flex-col ${darkModeClass}`}>
      {showModal && <Modal message={'Submission Successful. Please visit Analytics page on Dashboard to review the test results!'}/>}
    <div className='flex p-5 justify-between items-center'>
      <div className='mx-5 flex gap-10 items-center'>
        <p className='text-bold font-ubuntu text-2xl'>{currentModule?.title}</p>
        <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500">
          <BsMoon />
        </button>
      </div>
      <div className='flex justify-end items-center gap-5'>
        <p className='font-semibold text-lg'>13:04</p>
        <button onClick={handleExit} className='py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'>Exit</button>
      </div>
    </div>
    <hr className="border-gray-300 border-[1px]" />
    <div className='flex flex-grow'>
      <div className='w-[50%] border-r-2'>
        <div className="p-14">
          <p className='font-medium text-lg'>
            {handleParagraphSplit(currentQuestion.context)}
          </p>
        </div>
      </div>
      <div className='w-[50%]'>
        <div className='p-14'>
          <div className='flex gap-2 items-center'>
            <p className={`font-bold text-lg ${isCurrentQuestionUnanswered ? 'text-red-500' : ''}`}>{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
            <span>
                <PiFlagThin size={30} className={`${isCurrentQuestionUnanswered ? 'text-red-500' : 'text-green-500'}`} />
            </span>
          </div>
          <p className='font-medium text-lg mt-3'>{currentQuestion.query}</p>
          <div className='flex flex-col mt-7 gap-5'>
            {answerChoices.map((choice, index) => (
              <button
                key={index}
                className={`py-3 px-4 border-2 rounded-lg font-semibold text-lg w-full text-left 
                          ${selectedChoice === choice.label ? 'border-[#00df9a]' : 'hover:border-blue-500'}`}
                onClick={() => handleAnswerSelection(choice.label)}
              >
                {`(${choice.label})`} {choice.content}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-between p-5">
      <button
        onClick={handlePreviousQuestion}
        className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
      >
        <BsFillArrowLeftCircleFill className="inline mr-2" /> Previous
      </button>
      {currentQuestionIndex < questions.length - 1 ? (
        <button
          onClick={handleNextQuestion}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
        >
          Next <BsFillArrowRightCircleFill className="inline ml-2" />
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
        >
          Submit
        </button>
      )}
    </div>
  </div>
  );
};

export default TestPageUI;
