import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaLightbulb } from 'react-icons/fa';

interface ReviewSpaceTestApproachProps {
    isDarkMode: boolean;
}

const ReviewSpaceTestApproach: React.FC<ReviewSpaceTestApproachProps> = ({ isDarkMode }) => {
    const [studentSteps, setStudentSteps] = useState<string>('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [comparisonResult, setComparisonResult] = useState<string | null>(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const handleStepsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setStudentSteps(e.target.value);
    };

    const handleSubmit = () => {
        // Simulate AI analysis
        const aiFeedback = "Your approach is solid, but consider focusing more on the context clues surrounding the target word.";
        const aiComparison = "Top peers focus first on identifying the context clues, then eliminate the least likely options before making a final choice.";

        setFeedback(aiFeedback);
        setComparisonResult(aiComparison);
    };

    const theme = {
        background: isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
        text: isDarkMode ? 'text-gray-200' : 'text-gray-800',
        cardBackground: isDarkMode ? 'bg-gray-800' : 'bg-white',
        inputBackground: isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800',
        border: isDarkMode ? 'border-gray-600' : 'border-gray-300',
        buttonBackground: isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600',
        feedbackBackground: isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800',
        comparisonBackground: isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800',
        iconColor: isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
    };

    return (
        <div className={`min-h-screen ${theme.background} ${theme.text} py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-center">Test Your Approach</h1>

                <div className={`${theme.cardBackground} rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg`}>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Introduction</h2>
                    <p className="text-base sm:text-lg mb-4">
                        In this section, you will outline your approach to solving specific SAT question types. Your approach will be compared to those of top peers, and you'll receive feedback on how to refine your strategy.
                    </p>
                </div>

                <div className={`${theme.cardBackground} rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg`}>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Describe Your Approach</h2>
                    <p className="text-base sm:text-lg mb-4">
                        Please describe the steps you follow when answering a "Words in Context" question on the SAT.
                    </p>
                    <textarea
                        className={`w-full p-4 ${theme.inputBackground} border ${theme.border} rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                        rows={6}
                        placeholder="Describe your approach here..."
                        value={studentSteps}
                        onChange={handleStepsChange}
                    ></textarea>
                    <button
                        className={`w-full sm:w-auto py-2 px-4 ${theme.buttonBackground} text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        onClick={handleSubmit}
                    >
                        Submit Your Approach
                    </button>
                </div>

                {feedback && (
                    <div className={`${theme.cardBackground} rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg`}>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                            <FaLightbulb className={`mr-2 ${theme.iconColor}`} />
                            Feedback
                        </h2>
                        <div className={`p-4 rounded-lg ${theme.feedbackBackground} transition-all duration-300`}>
                            <FaCheckCircle className="inline mr-2" />
                            {feedback}
                        </div>
                    </div>
                )}

                {comparisonResult && (
                    <div className={`${theme.cardBackground} rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg`}>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                            <FaLightbulb className={`mr-2 ${theme.iconColor}`} />
                            Comparison with Top Peers
                        </h2>
                        <div className={`p-4 rounded-lg ${theme.comparisonBackground} transition-all duration-300`}>
                            {comparisonResult}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSpaceTestApproach;