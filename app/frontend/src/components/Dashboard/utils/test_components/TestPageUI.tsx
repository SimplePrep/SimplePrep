import React, { useEffect, useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon} from 'react-icons/bs';
import {PiFlagThin} from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { getModules, getQuestionsByModuleId } from '../../../utils/axios/axiosServices';
import { useAuth } from '../../../utils/AuthProvider';


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

const TestPageUI = () => {
  const {user} = useAuth();
  const { testId, moduleId } = useParams<{ testId: string; moduleId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
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
    // Check if the user is authenticated
    const checkAuth = async () => {
      if (user && user.emailVerified) {
        // User is authenticated, do nothing
      } else {
        // User is not authenticated, navigate to the login page
        navigate('/login');
      }
    };
  
    checkAuth();
  }, [navigate]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  };

  const darkModeClass = isDarkMode ? 'dark' : '';

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedChoice(null);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(null);
    }
  };

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


  return (
    <div className={`w-full h-screen flex flex-col ${darkModeClass}`}>
      <div className='flex p-5 justify-between items-center'>
        <div className='mx-5 flex gap-10 items-center'>
          <p className='text-bold font-ubuntu text-2xl'>{currentModule?.title}</p>
          <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500">
            <BsMoon />
          </button>
        </div>
        <div className='flex justify-end items-center gap-5'>
          <p className='font-semibold text-lg'>13:04</p>
          <button className='py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'>Exit</button>
        </div>
      </div>
      <hr className="border-gray-300 border-[1px]"/>
      <div className='flex flex-grow'>
        <div className='w-[50%] border-r-2'>
          <div className="p-14">
            <p className='font-medium text-lg'>
              {currentQuestion.context}
            </p>
          </div>
        </div>
        <div className='w-[50%]'>
          <div className='p-14'>
            <div className='flex gap-2 items-center'>
              <p className='font-bold text-lg'>{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
              <span><PiFlagThin size={30}/></span>
            </div>
            <p className='font-medium text-lg mt-3'>{currentQuestion.query}</p>
            <div className='flex flex-col mt-7 gap-2'>
            {answerChoices.map((choice, index) => (
              <button
                key={index}
                className={`py-2 px-4 border-2 rounded-lg font-semibold text-lg w-full text-left 
                            ${selectedChoice === choice.label ? 'border-[#00df9a]' : 'hover:border-blue-500'}`}
                onClick={() => setSelectedChoice(choice.label)}
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
        <button 
          onClick={handleNextQuestion}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
        >
          Next <BsFillArrowRightCircleFill className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TestPageUI;

