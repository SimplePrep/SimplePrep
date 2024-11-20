import React, { useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon, BsSun } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../pages/Authentication/Modal';
import { AppDispatch, RootState } from '../../../store';
import LoaderWrapper from '../tools/LoaderWrapper';
import { Question, UserAnswer, Module } from '../../../auth_utils/types';
import { clearModules, clearQuestions, clearUserAnswers, saveUserAnswers, setModules, setQuestions } from '../../../auth_utils/reducers/dataReducer';
import QuestionListModal from './QuestionListModal'; // Import the new component
import { getModules, getQuestionsByModuleId, submitAnswers } from '../../../auth_utils/axios/axiosServices';
import { HiOutlineSave } from "react-icons/hi";
import { checkAuthenticated, loadUser } from '../../../auth_utils/actions/Actions';
import { auth } from '../../../auth_utils/firebaseConfig';
import { setTheme } from '../../../auth_utils/reducers/authReducer';

const TestPageUI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, modules, userAnswers } = useSelector((state: RootState) => state.data);
  const { theme } = useSelector((state: RootState) => state.auth);
  const user = auth.currentUser;
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const { testId, moduleId } = useParams<{ testId: string; moduleId: string }>();
  const [localQuestions, setLocalQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [localUserAnswers, setLocalUserAnswers] = useState<UserAnswer[]>([]);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false); // Modified: default is false (modal hidden)
  const [remarkedQuestions, setRemarkedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await dispatch(checkAuthenticated());
        await dispatch(loadUser());
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };
    checkAuthStatus();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!moduleId) return;
  
      try {
        const fetchedQuestions = await getQuestionsByModuleId(Number(moduleId));
        if (fetchedQuestions && fetchedQuestions.length > 0) {
          dispatch(setQuestions({ moduleId, questions: fetchedQuestions }));
          setLocalQuestions(fetchedQuestions);
        } else {
          console.warn(`No questions found for moduleId: ${moduleId}`);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
  
    const fetchModules = async () => {
      if (!testId) return;
  
      try {
        const fetchedModules = await getModules(Number(testId));
        const current = fetchedModules.find((mod) => mod.id === Number(moduleId));
        if (fetchedModules && current) {
          dispatch(setModules({ testId, modules: fetchedModules }));
          setCurrentModule(current);
        } else {
          console.warn(`No modules found for testId: ${testId}`);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
  
    if (moduleId && testId) {
      fetchQuestions();
      fetchModules();
    } else {
      console.error("Missing testId or moduleId for fetching data.");
    }
  }, [moduleId, testId, dispatch]);
  
  
    useEffect(() => {
      if (moduleId && questions[moduleId]) { // Check if moduleId is defined
        setLocalQuestions(questions[moduleId]);
      }
    }, [questions, moduleId]);
  
  
  useEffect(() => {
    if (moduleId) {
      if (userAnswers[moduleId]) {
        setLocalUserAnswers(userAnswers[moduleId]);
      } else {
        const savedAnswers = sessionStorage.getItem(`userAnswers-${moduleId}`);
        if (savedAnswers) {
          const parsedAnswers = JSON.parse(savedAnswers);
          setLocalUserAnswers(parsedAnswers);
          dispatch(saveUserAnswers({ moduleId, answers: parsedAnswers }));
        }
      }
    }
  }, [moduleId, userAnswers, dispatch]);
  

  useEffect(() => {
    if (moduleId) {
      if (userAnswers[moduleId]) {
        setLocalUserAnswers(userAnswers[moduleId]);
      } else {
        const savedAnswers = sessionStorage.getItem(`userAnswers-${moduleId}`);
        if (savedAnswers) {
          const parsedAnswers = JSON.parse(savedAnswers);
          setLocalUserAnswers(parsedAnswers);
          dispatch(saveUserAnswers({ moduleId, answers: parsedAnswers }));
        }
      }
    }
  }, [moduleId, userAnswers, dispatch]);

  const saveAnswers = (answers: UserAnswer[]) => {
    if (moduleId) {
      dispatch(saveUserAnswers({ moduleId, answers }));
      sessionStorage.setItem(`userAnswers-${moduleId}`, JSON.stringify(answers));
    }
  };

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    let isReloading = false;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (moduleId) {
        sessionStorage.setItem(`userAnswers-${moduleId}`, JSON.stringify(localUserAnswers));
      }
    };

    const handleUnload = () => {
      if (!isReloading && moduleId) {
        sessionStorage.removeItem(`userAnswers-${moduleId}`);
        dispatch(clearUserAnswers(moduleId));
      }
    };

    const handleReload = () => {
      isReloading = true;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    window.addEventListener('reload', handleReload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
      window.removeEventListener('reload', handleReload);
    };
  }, [moduleId, localUserAnswers, dispatch]);

  useEffect(() => {
    const currentAnswer = localUserAnswers.find(
      (answer) => answer.question === localQuestions[currentQuestionIndex]?.id
    );
    setSelectedChoice(currentAnswer ? currentAnswer.selected_option : null);
  }, [currentQuestionIndex, localUserAnswers, localQuestions]);

  if (isLoading) {
    return (
      <LoaderWrapper
        size='250px'
        minLoadTime={2000}
        text="Loading Test Module..."
        isDarkMode={false}
        onLoadComplete={handleLoadComplete}
      />
    );
  }

  const toggleDarkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      if (!selectedChoice) {
        setUnansweredQuestions((prev) => [...prev, localQuestions[currentQuestionIndex].id]);
      } else {
        setUnansweredQuestions((prev) => prev.filter((id) => id !== localQuestions[currentQuestionIndex].id));
      }
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < localQuestions.length - 1) {
      if (!selectedChoice) {
        setUnansweredQuestions((prev) => [...prev, localQuestions[currentQuestionIndex].id]);
      } else {
        setUnansweredQuestions((prev) => prev.filter((id) => id !== localQuestions[currentQuestionIndex].id));
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerSelection = (choice: string) => {
    setSelectedChoice(choice);
    const updatedAnswers = localUserAnswers.map((answer) =>
      answer.question === localQuestions[currentQuestionIndex].id
        ? { ...answer, selected_option: choice }
        : answer
    );

    if (!updatedAnswers.find((answer) => answer.question === localQuestions[currentQuestionIndex].id)) {
      updatedAnswers.push({
        id: 0,
        test_result: Number(testId),
        question: localQuestions[currentQuestionIndex].id,
        selected_option: choice,
      });
    }

    // Remove question from remarkedQuestions if it is answered
    setRemarkedQuestions(remarkedQuestions.filter(id => id !== localQuestions[currentQuestionIndex].id));

    setLocalUserAnswers(updatedAnswers);
    saveAnswers(updatedAnswers);
  };

  const handleMarkQuestion = () => {
    const currentQuestionId = localQuestions[currentQuestionIndex].id;
    if (remarkedQuestions.includes(currentQuestionId)) {
      setRemarkedQuestions(remarkedQuestions.filter(id => id !== currentQuestionId));
    } else {
      setRemarkedQuestions([...remarkedQuestions, currentQuestionId]);
      // Remove from answered state if marked
      setLocalUserAnswers(localUserAnswers.filter(answer => answer.question !== currentQuestionId));
    }
  };

  const handleSubmit = async () => {
    const validUserAnswers = localUserAnswers.filter((answer) => answer.selected_option !== null);
    if (validUserAnswers.length < localQuestions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const formattedAnswers = validUserAnswers.map((answer) => ({
      questionId: answer.question,
      selectedChoice: answer.selected_option,
    }));

    try {
      await submitAnswers(user!.uid, Number(moduleId), formattedAnswers, navigate);
      console.log('Dummy submission:', formattedAnswers);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/demo');
      }, 4000);
      if (moduleId && testId) {
        dispatch(clearQuestions(moduleId));
        dispatch(clearModules(testId));
        dispatch(clearUserAnswers(moduleId));
        sessionStorage.removeItem(`userAnswers-${moduleId}`);
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  const handleParagraphSplit = (context: string) => {
    const sections = context?.split('\n');
    return (
      <div>
        {sections?.map((section, index) => (
          <p key={index} className={index === 0 ? '' : 'mt-2'}>
            {section}
          </p>
        ))}
      </div>
    );
  };

  const currentQuestion = localQuestions[currentQuestionIndex] || { query: '', option_A: '', option_B: '', option_C: '', option_D: '' };
  const answerChoices = [
    { label: 'A', content: currentQuestion.option_A },
    { label: 'B', content: currentQuestion.option_B },
    { label: 'C', content: currentQuestion.option_C },
    { label: 'D', content: currentQuestion.option_D },
  ];
  const isCurrentQuestionUnanswered = unansweredQuestions.includes(currentQuestion.id);

  const handleExit = () => {
    if (moduleId) {
      dispatch(clearUserAnswers(moduleId));
      sessionStorage.removeItem(`userAnswers-${moduleId}`);
    }
    navigate('/demo');
  };

  const darkModeClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'

  const handleTogglePreview = () => {
    setIsVisible(!isVisible);
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsVisible(false);
  };

  return (
    <div className={`w-full min-h-screen flex flex-col ${darkModeClass}`}>
      {showModal && <Modal message={'Submission Successful. Please visit Analytics page on Dashboard to review the test results!'} />}
      
      {/* Header Section - Consistent across mobile and desktop */}
      <div className="relative flex p-2 sm:p-3 justify-between items-center">
      {/* Left section - Module Title and Theme Toggle */}
      <div className="mx-2 sm:mx-5 flex gap-2 sm:gap-3 items-center">
        <p className="text-bold font-ubuntu text-base sm:text-2xl">Test 1 Module 1</p>
        <button
          onClick={toggleDarkMode}
          className="text-sm sm:text-lg p-2 sm:p-3 border-2 rounded-full hover:bg-[#00df9a] hover:text-white hover:border-blue-800 
          max-sm:hidden" // Hide on mobile screens
        >
          {theme === 'dark' ? <BsSun /> : <BsMoon />}
        </button>
      </div>

      {/* Center section - Preview Button */}
      <div className="absolute left-1/2 ml-3 sm:ml-0 transform -translate-x-1/2 flex flex-col items-center">
        <button
          onClick={handleTogglePreview}
          className='flex flex-row items-center gap-1 sm:gap-2 py-1 px-3 sm:py-2 sm:px-6 border-2 rounded-full 
          hover:bg-[#00df9a] hover:text-white font-semibold text-sm sm:text-lg hover:border-blue-800'
        >
          <p>Preview</p>
          {isVisible ? <BsChevronUp /> : <BsChevronDown />}
        </button>
      </div>

      {/* Right section - Exit Button */}
      <div className="mx-2 sm:mx-5 flex justify-end items-center gap-2 sm:gap-5">
        {/* Mobile Theme Toggle - Only visible on mobile */}
        <button
          onClick={toggleDarkMode}
          className="sm:hidden text-sm p-2 border-2 rounded-full hover:bg-[#00df9a] hover:text-white hover:border-blue-800"
        >
          {theme === 'dark' ? <BsSun /> : <BsMoon />}
        </button>
        
        <button
          onClick={handleExit}
          className="py-1 px-3 sm:py-2 sm:px-6 border-2 rounded-full hover:bg-[#00df9a] hover:text-white font-semibold text-sm sm:text-lg hover:border-blue-800"
        >
          Exit
        </button>
      </div>
    </div>
      
      <hr className={`border-[1.5px] ${theme === 'dark' ? 'border-white' : 'border-gray-300'}`} />
      
      {/* Main Content - Responsive Layout */}
      <div className="flex flex-col lg:flex-row h-full flex-grow">
        {/* Context Section - Full width on mobile, half width on desktop */}
        <div className="w-full lg:w-[50%] lg:border-r-2 order-1 lg:order-none">
          <div className={`h-full p-3 sm:p-5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div className={`h-full p-3 sm:p-10 rounded-2xl overflow-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
              <p className="font-medium text-sm sm:text-lg">
                {handleParagraphSplit(currentQuestion.context)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Question Section - Full width on mobile, half width on desktop */}
        <div className="w-full lg:w-[50%] order-2 lg:order-none">
          <div className={`p-3 sm:p-5 h-full flex flex-col ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div className={`p-3 sm:p-10 rounded-2xl overflow-auto h-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex gap-1 sm:gap-2 items-center">
                <p className={`font-bold text-sm sm:text-lg ${isCurrentQuestionUnanswered ? 'text-red-500' : ''}`}>
                  {`Question ${currentQuestionIndex + 1} of ${localQuestions.length}`}
                </p>
                <button 
                  onClick={handleMarkQuestion} 
                  className={`flex flex-row gap-1 sm:gap-2 p-1 sm:p-2 rounded-lg ${
                    remarkedQuestions.includes(currentQuestion.id) 
                    ? 'bg-yellow-400 text-white' 
                    : 'hover:bg-yellow-400 hover:text-white'
                  }`}
                >
                  <HiOutlineSave size={20} className="sm:w-[25px] sm:h-[25px]" />
                  <p className='text-xs sm:text-lg'>Mark</p>
                </button>
              </div>
              
              <p className="font-medium text-sm sm:text-lg mt-2 sm:mt-3">{currentQuestion.query}</p>
              
              <div className="flex flex-col mt-4 sm:mt-7 gap-3 sm:gap-5">
                {answerChoices.map((choice, index) => (
                  <button
                    key={index}
                    className={`py-2 px-3 sm:py-3 sm:px-4 border-2 rounded-lg font-semibold text-sm sm:text-lg w-full text-left 
                      ${selectedChoice === choice.label ? 'border-[#00df9a]' : 'hover:border-blue-500'} 
                      dark:hover:border-blue-600`}
                    onClick={() => handleAnswerSelection(choice.label)}
                  >
                    {`(${choice.label})`} {choice.content}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Section - Consistent across mobile and desktop */}
      <div className={`flex justify-between p-3 sm:p-5 border-t-[3px] ${theme === 'dark' ? 'border-white' : 'border-gray-300'}`}>
        <button
          onClick={handlePreviousQuestion}
          className="py-1 px-3 sm:py-2 sm:px-6 border-2 rounded-full hover:bg-[#00df9a] hover:text-white dark:hover:bg-[#00df9a] font-semibold text-sm sm:text-lg hover:border-blue-800"
        >
          <BsFillArrowLeftCircleFill className="inline mr-1 sm:mr-2 text-sm sm:text-base" /> Previous
        </button>
        
        {currentQuestionIndex < localQuestions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            className="py-1 px-3 sm:py-2 sm:px-6 border-2 rounded-full hover:bg-[#00df9a] hover:text-white dark:hover:bg-[#00df9a] font-semibold text-sm sm:text-lg hover:border-blue-800"
          >
            Next <BsFillArrowRightCircleFill className="inline ml-1 sm:ml-2 text-sm sm:text-base" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="py-1 px-3 sm:py-2 sm:px-6 border-2 rounded-full hover:bg-[#00df9a] hover:text-white dark:hover:bg-[#00df9a] font-semibold text-sm sm:text-lg hover:border-blue-800"
          >
            Submit
          </button>
        )}
      </div>
      
      {/* Question List Modal - Unchanged */}
      {isVisible && (
        <QuestionListModal
          questions={localQuestions}
          answeredQuestions={localUserAnswers.map((answer) => answer.question)}
          remarkedQuestions={remarkedQuestions}
          currentQuestionIndex={currentQuestionIndex}
          onClose={() => setIsVisible(false)}
          onSelectQuestion={handleSelectQuestion}
        />
      )}
    </div>
  );
};

export default TestPageUI;
