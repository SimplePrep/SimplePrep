import React, { useEffect, useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon } from 'react-icons/bs';
import { PiFlagThin } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getModules, getQuestionsByModuleId, submitAnswers } from '../../../auth_utils/axios/axiosServices';
import Modal from '../../../../pages/Authentication/Modal';
import { AppDispatch, RootState } from '../../../store';
import { auth } from '../../../auth_utils/firebaseConfig';
import LoaderWrapper from '../tools/LoaderWrapper';
import { Module, Question, UserAnswer } from '../../../auth_utils/types';
import { checkAuthenticated, loadUser } from '../../../auth_utils/actions/Actions';
import { clearModules, clearQuestions, clearUserAnswers, saveUserAnswers, setModules, setQuestions } from '../../../auth_utils/reducers/dataReducer';

const TestPageUI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, modules, userAnswers } = useSelector((state: RootState) => state.data);
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const user = auth.currentUser;
  const { testId, moduleId } = useParams<{ testId: string; moduleId: string }>();
  const [localQuestions, setLocalQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [localUserAnswers, setLocalUserAnswers] = useState<UserAnswer[]>([]);
  const navigate = useNavigate();

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
        dispatch(setQuestions({ moduleId, questions: fetchedQuestions }));
        setLocalQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    const fetchModule = async () => {
      if (!testId) return;
      try {
        const fetchedModules = await getModules(Number(testId));
        const module = fetchedModules.find((mod) => mod.id === Number(moduleId));
        dispatch(setModules({ testId, modules: fetchedModules }));
        setCurrentModule(module || null);
      } catch (error) {
        console.error('Error fetching module:', error);
      }
    };

    if (moduleId && testId) {
      if (!questions[moduleId]) {
        fetchQuestions();
      } else {
        setLocalQuestions(questions[moduleId]);
      }
      if (!modules[testId]) {
        fetchModule();
      } else {
        setCurrentModule(modules[testId].find((mod) => mod.id === Number(moduleId)) || null);
      }
    }
  }, [moduleId, testId, questions, modules, dispatch]);

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
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
      e.returnValue = confirmationMessage;

      if (moduleId) {
        sessionStorage.setItem(`userAnswers-${moduleId}`, JSON.stringify(localUserAnswers));
      }

      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [moduleId, localUserAnswers]);

  if (isLoading) {
    return (
      <LoaderWrapper
        size='35px'
        minLoadTime={2000}
        text="Loading Test Module..."
        isDarkMode={isDarkMode}
        onLoadComplete={handleLoadComplete}
      />
    );
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const darkModeClass = isDarkMode ? 'dark' : '';

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      if (!selectedChoice) {
        setUnansweredQuestions((prev) => [...prev, localQuestions[currentQuestionIndex].id]);
      } else {
        setUnansweredQuestions((prev) => prev.filter((id) => id !== localQuestions[currentQuestionIndex].id));
      }
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedChoice(localUserAnswers.find((answer) => answer.question === localQuestions[currentQuestionIndex - 1]?.id)?.selected_option || null);
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
      setSelectedChoice(localUserAnswers.find((answer) => answer.question === localQuestions[currentQuestionIndex + 1]?.id)?.selected_option || null);
    }
  };

  const handleAnswerSelection = (choice: string) => {
    setSelectedChoice(choice);
    const updatedAnswers = [...localUserAnswers];
    const answerIndex = updatedAnswers.findIndex((answer) => answer.question === localQuestions[currentQuestionIndex].id);

    if (answerIndex > -1) {
      updatedAnswers[answerIndex].selected_option = choice;
    } else {
      updatedAnswers.push({ id: 0, test_result: Number(testId), question: localQuestions[currentQuestionIndex].id, selected_option: choice });
    }

    setLocalUserAnswers(updatedAnswers);
    saveAnswers(updatedAnswers);
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
      <div className="">
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

  return (
    <div className={`w-full h-screen flex flex-col ${darkModeClass}`}>
      {showModal && <Modal message={'Submission Successful. Please visit Analytics page on Dashboard to review the test results!'} />}
      <div className="flex p-5 justify-between items-center">
        <div className="mx-5 flex gap-10 items-center">
          <p className="text-bold font-ubuntu text-2xl">{currentModule?.title}</p>
          <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500">
            <BsMoon />
          </button>
        </div>
        <div className="flex justify-end items-center gap-5">
          <p className="font-semibold text-lg">13:04</p>
          <button onClick={handleExit} className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg">Exit</button>
        </div>
      </div>
      <hr className="border-gray-300 border-[1px]" />
      <div className="flex flex-grow">
        <div className="w-[50%] border-r-2">
          <div className="p-14">
            <p className="font-medium text-lg">
              {handleParagraphSplit(currentQuestion.context)}
            </p>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="p-14">
            <div className="flex gap-2 items-center">
              <p className={`font-bold text-lg ${isCurrentQuestionUnanswered ? 'text-red-500' : ''}`}>{`Question ${currentQuestionIndex + 1} of ${localQuestions.length}`}</p>
              <span>
                <PiFlagThin size={30} className={`${isCurrentQuestionUnanswered ? 'text-red-500' : 'text-green-500'}`} />
              </span>
            </div>
            <p className="font-medium text-lg mt-3">{currentQuestion.query}</p>
            <div className="flex flex-col mt-7 gap-5">
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
        {currentQuestionIndex < localQuestions.length - 1 ? (
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