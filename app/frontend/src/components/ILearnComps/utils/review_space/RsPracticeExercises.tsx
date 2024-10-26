import React, { useState, useEffect } from 'react';

interface Question {
    id: number;
    test: number;
    model: string;
    section: string;
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

interface PracticeExercisesProps {
    isDarkMode: boolean;
}

const PracticeExercises: React.FC<PracticeExercisesProps> = ({ isDarkMode }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [showIntroduction, setShowIntroduction] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Sample questions data - in real app, this would likely come from props or API
    const questions: Question[] = [
        {
            id: 1,
            test: 101,
            model: 'SAT',
            section: 'Reading',
            title: 'Main Idea Question',
            context: 'This is the context for question 1.',
            query: 'What is the main idea of the passage?',
            graph_img: '',
            option_A: 'Option A',
            option_B: 'Option B',
            option_C: 'Option C',
            option_D: 'Option D',
            correct_answer: 'B',
            explanation: 'This is the explanation for why B is the correct answer.',
            likes: 5,
            dislikes: 1,
            created_at: '2024-08-23T12:34:56Z',
        },
        {
            id: 2,
            test: 102,
            model: 'SAT',
            section: 'Reading',
            title: 'Purpose Question',
            context: 'This is the context for question 2.',
            query: 'What is the purpose of the second paragraph?',
            graph_img: '',
            option_A: 'Option A',
            option_B: 'Option B',
            option_C: 'Option C',
            option_D: 'Option D',
            correct_answer: 'A',
            explanation: 'This is the explanation for why A is the correct answer.',
            likes: 3,
            dislikes: 0,
            created_at: '2024-08-23T12:35:00Z',
        },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeIn(true);
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    const currentQuestion = questions[currentQuestionIndex];

    const answerChoices = [
        { label: 'A', content: currentQuestion.option_A },
        { label: 'B', content: currentQuestion.option_B },
        { label: 'C', content: currentQuestion.option_C },
        { label: 'D', content: currentQuestion.option_D },
    ];

    const handleAnswerSelect = (choice: string) => {
        if (!hasCheckedAnswer) {
            setSelectedAnswer(choice);
        }
    };

    const handleCheckAnswer = () => {
        if (selectedAnswer) {
            setHasCheckedAnswer(true);
            setIsCorrect(selectedAnswer === currentQuestion.correct_answer);
            if (selectedAnswer === currentQuestion.correct_answer) {
                setShowExplanation(true);
            }
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            resetQuestionState();
        }
    };

    const handleNextQuestion = () => {
        if (showIntroduction) {
            setShowIntroduction(false);
        } else if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            resetQuestionState();
        }
    };

    const resetQuestionState = () => {
        setSelectedAnswer(null);
        setHasCheckedAnswer(false);
        setShowExplanation(false);
        setIsCorrect(false);
    };

    const toggleExplanation = () => {
        if (hasCheckedAnswer) {
            setShowExplanation(!showExplanation);
        }
    };

    const getBaseStyles = () => ({
        container: `min-h-screen ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 font-sans ${
            isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'
        }`,
        card: `relative top-20 w-full max-w-[1400px] mx-auto p-8 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-xl`,
        button: `px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isDarkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
        }`,
        disabledButton: `px-6 py-3 rounded-lg font-semibold bg-gray-300 text-gray-500 cursor-not-allowed`,
    });

    const styles = getBaseStyles();

    if (showIntroduction) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className="text-center p-8">
                        <h1 className="text-4xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            Welcome to Practice Exercises
                        </h1>
                        <p className="text-xl mb-8 leading-relaxed font-light">
                            These exercises will help you improve your understanding and application of key concepts.
                            Take your time to answer each question carefully.
                        </p>
                        <button onClick={handleNextQuestion} className={`${styles.button} text-lg px-8 py-4`}>
                            Start Practice
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Practice Exercises</h1>
                    <span className="text-lg font-medium px-4 py-2 rounded-full bg-indigo-100 text-indigo-700">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Context Section */}
                    <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <h2 className="text-2xl font-bold mb-6 tracking-tight">Context</h2>
                        <p className="text-lg leading-relaxed">{currentQuestion.context}</p>
                    </div>

                    {/* Question Section */}
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4 tracking-tight">Question {currentQuestionIndex + 1}</h2>
                        <p className="mb-8 text-lg leading-relaxed">{currentQuestion.query}</p>

                        <div className="space-y-4">
                            {answerChoices.map((choice) => {
                                let buttonStyle = `w-full p-4 text-left rounded-xl border-2 transition-all duration-200 text-lg font-medium hover:shadow-md ${
                                    isDarkMode ? 'border-gray-600' : 'border-gray-300'
                                }`;

                                if (selectedAnswer === choice.label) {
                                    buttonStyle += isDarkMode 
                                        ? ' bg-indigo-700/50 border-indigo-500 shadow-lg shadow-indigo-500/20' 
                                        : ' bg-indigo-50 border-indigo-500 shadow-lg shadow-indigo-500/10';
                                }

                                if (hasCheckedAnswer) {
                                    if (choice.label === currentQuestion.correct_answer) {
                                        buttonStyle += isDarkMode 
                                            ? ' bg-green-900/50 border-green-500 shadow-lg shadow-green-500/20' 
                                            : ' bg-green-50 border-green-500 shadow-lg shadow-green-500/10';
                                    } else if (selectedAnswer === choice.label) {
                                        buttonStyle += isDarkMode 
                                            ? ' bg-red-900/50 border-red-500 shadow-lg shadow-red-500/20' 
                                            : ' bg-red-50 border-red-500 shadow-lg shadow-red-500/10';
                                    }
                                }

                                return (
                                    <button
                                        key={choice.label}
                                        onClick={() => handleAnswerSelect(choice.label)}
                                        className={buttonStyle}
                                        disabled={hasCheckedAnswer}
                                    >
                                        <span className="font-bold mr-3 text-xl">{choice.label}</span>
                                        {choice.content}
                                    </button>
                                );
                            })}
                        </div>

                        {!hasCheckedAnswer && selectedAnswer && (
                            <button
                                onClick={handleCheckAnswer}
                                className={`mt-8 w-full p-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                                    isDarkMode ? 'bg-green-600 hover:bg-green-500 shadow-lg shadow-green-500/30' : 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20'
                                } text-white`}
                            >
                                Check Answer
                            </button>
                        )}

                        {hasCheckedAnswer && (
                            <div className={`mt-8 p-6 rounded-xl shadow-lg ${
                                isCorrect 
                                    ? isDarkMode ? 'bg-green-900/50 text-white shadow-green-500/20' : 'bg-green-50 text-green-800 shadow-green-500/10'
                                    : isDarkMode ? 'bg-red-900/50 text-white shadow-red-500/20' : 'bg-red-50 text-red-800 shadow-red-500/10'
                            }`}>
                                <p className="text-lg font-bold tracking-tight">
                                    {isCorrect ? 'Correct! Well done! 🎉' : 'Incorrect. Keep practicing! 💪'}
                                </p>
                            </div>
                        )}

                        {hasCheckedAnswer && (
                            <button
                                onClick={toggleExplanation}
                                className={`mt-8 w-full p-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                                    isDarkMode ? 'bg-yellow-600 hover:bg-yellow-500 shadow-lg shadow-yellow-500/30' : 'bg-yellow-400 hover:bg-yellow-500 shadow-lg shadow-yellow-500/20'
                                } text-gray-900`}
                            >
                                {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                            </button>
                        )}

                        {showExplanation && (
                            <div className={`mt-6 p-6 rounded-xl ${
                                isDarkMode ? 'bg-gray-700/50' : 'bg-yellow-50'
                            }`}>
                                <p className="text-lg leading-relaxed">{currentQuestion.explanation}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between mt-12">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={currentQuestionIndex === 0 ? styles.disabledButton : styles.button}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className={currentQuestionIndex === questions.length - 1 ? styles.disabledButton : styles.button}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PracticeExercises;