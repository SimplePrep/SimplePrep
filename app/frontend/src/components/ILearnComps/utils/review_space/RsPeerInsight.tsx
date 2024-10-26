import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    Target,
    TrendingUp,
    Award,
    Clock,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Brain,
    GraduationCap,
    Star
} from 'lucide-react';


interface ReviewSpacePeerInsightProps {
    isDarkMode: boolean;
}

interface PeerApproach {
    name: string;
    score: string;
    approach: string;
    studyHours: string;
    topTips: string[];
}

const ReviewSpacePeerInsight: React.FC<ReviewSpacePeerInsightProps> = ({ isDarkMode }) => {
    const [expandedApproach, setExpandedApproach] = useState<number | null>(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const theme = {
        bg: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
        text: isDarkMode ? 'text-gray-200' : 'text-gray-800',
        card: isDarkMode ? 'bg-gray-800' : 'bg-white',
        highlight: isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50',
        border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
        accent: isDarkMode ? 'text-blue-400' : 'text-blue-600',
        icon: isDarkMode ? 'text-blue-400' : 'text-blue-600',
        score: isDarkMode ? 'text-green-400' : 'text-green-600'
    };

    const topic = "SAT Math: Advanced Problem Solving Strategies";
    
    const peerApproaches: PeerApproach[] = [
        {
            name: "Sarah",
            score: "1580 (Math: 800)",
            approach: "I focused on understanding the underlying concepts rather than memorizing formulas. For each topic, I created mind maps connecting different concepts and practiced with increasingly difficult problems.",
            studyHours: "3-4 hours daily for 3 months",
            topTips: [
                "Always solve practice problems under timed conditions",
                "Review mistakes immediately after each practice test",
                "Create a formula sheet in your own words"
            ]
        },
        {
            name: "Michael",
            score: "1550 (Math: 790)",
            approach: "I used the College Board Official SAT Study Guide and focused heavily on practice tests. After each test, I categorized my mistakes and created specific drills for my weak areas.",
            studyHours: "2 hours daily for 4 months",
            topTips: [
                "Take at least 8 full practice tests",
                "Time yourself on individual sections",
                "Focus on your weak areas first"
            ]
        },
        {
            name: "Emma",
            score: "1540 (Math: 780)",
            approach: "I combined online resources with textbook practice. Khan Academy's SAT prep was particularly helpful for tracking my progress and getting personalized practice.",
            studyHours: "2-3 hours daily for 3 months",
            topTips: [
                "Use multiple study resources",
                "Practice mental math daily",
                "Learn to recognize pattern questions"
            ]
        }
    ];

    const keyStrategies = [
        "Identify and focus on your weak areas first",
        "Practice with official SAT questions only",
        "Time yourself consistently during practice",
        "Review every mistake thoroughly",
        "Master the calculator-permitted and no-calculator sections separately"
    ];

    const commonMistakes = [
        "Rushing through 'easy' questions",
        "Not reading the entire question carefully",
        "Forgetting to check answers for reasonableness",
        "Not managing time effectively during the test"
    ];

    const toggleApproach = (index: number) => {
        setExpandedApproach(expandedApproach === index ? null : index);
    };

    return (
        <div className={`min-h-screen ${theme.bg} ${theme.text} py-28 px-6 font-sans ${fadeIn ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-12">
                    <GraduationCap className={`${theme.icon} w-12 h-12 mr-4`} />
                    <div className="text-center">
                        <h1 className="text-5xl font-extrabold tracking-tight mb-2 font-serif">SAT Success Stories</h1>
                        <p className="text-lg italic opacity-75">Learn from those who excelled</p>
                    </div>
                </div>

                <div className={`rounded-lg shadow-lg p-8 mb-8 ${theme.card}`}>
                    <div className="flex items-center mb-4">
                        <Target className={`${theme.icon} w-7 h-7 mr-3`} />
                        <h2 className="text-3xl font-bold tracking-tight">Current Topic Focus</h2>
                    </div>
                    <p className="text-xl font-medium mb-4 ml-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                        {topic}
                    </p>
                    <div className="flex items-center text-sm ml-10">
                        <Brain className={`${theme.icon} w-4 h-4 mr-2`} />
                        <p className="italic">Learn from peers who achieved their target scores through effective study strategies.</p>
                    </div>
                </div>

                <div className={`rounded-lg shadow-lg p-8 mb-8 ${theme.card}`}>
                    <div className="flex items-center mb-8">
                        <Award className={`${theme.icon} w-7 h-7 mr-3`} />
                        <h2 className="text-3xl font-bold tracking-tight">Top Scorer Approaches</h2>
                    </div>
                    {peerApproaches.map((peer, index) => (
                        <div
                            key={index}
                            className={`rounded-lg p-6 mb-4 ${theme.highlight} cursor-pointer transition-all duration-300 hover:shadow-md`}
                            onClick={() => toggleApproach(index)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="flex items-center">
                                        <Star className={`${theme.icon} w-6 h-6 mr-2`} />
                                        <h3 className="text-2xl font-bold tracking-tight">{peer.name}'s Strategy</h3>
                                    </div>
                                    <p className={`${theme.score} font-semibold text-lg mt-2 font-mono tracking-wide`}>
                                        Score: {peer.score}
                                    </p>
                                </div>
                                {expandedApproach === index ? 
                                    <ChevronUp className="w-6 h-6" /> : 
                                    <ChevronDown className="w-6 h-6" />
                                }
                            </div>
                            {expandedApproach === index && (
                                <div className="mt-6 space-y-4 ml-8">
                                    <p className="text-base leading-relaxed">{peer.approach}</p>
                                    <div className="flex items-center text-base font-medium">
                                        <Clock className={`${theme.icon} w-5 h-5 mr-2`} />
                                        <p className="font-mono">{peer.studyHours}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="font-bold mb-3 flex items-center text-lg">
                                            <BookOpen className={`${theme.icon} w-5 h-5 mr-2`} />
                                            Top Tips
                                        </h4>
                                        <ul className="space-y-2 ml-7">
                                            {peer.topTips.map((tip, tipIndex) => (
                                                <li key={tipIndex} className="text-base leading-relaxed flex items-start">
                                                    <span className={`${theme.accent} mr-2`}>•</span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className={`rounded-lg shadow-lg p-8 ${theme.card}`}>
                        <div className="flex items-center mb-6">
                            <TrendingUp className={`${theme.icon} w-7 h-7 mr-3`} />
                            <h2 className="text-2xl font-bold tracking-tight">Key Strategies</h2>
                        </div>
                        <ul className="space-y-3 ml-4">
                            {keyStrategies.map((strategy, index) => (
                                <li key={index} className="flex items-start text-base leading-relaxed">
                                    <span className={`${theme.accent} mr-2 font-bold`}>{index + 1}.</span>
                                    {strategy}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`rounded-lg shadow-lg p-8 ${theme.card}`}>
                        <div className="flex items-center mb-6">
                            <AlertCircle className={`${theme.icon} w-7 h-7 mr-3`} />
                            <h2 className="text-2xl font-bold tracking-tight">Common Mistakes to Avoid</h2>
                        </div>
                        <ul className="space-y-3 ml-4">
                            {commonMistakes.map((mistake, index) => (
                                <li key={index} className="flex items-start text-base leading-relaxed">
                                    <span className={`text-red-500 mr-2 font-bold`}>!</span>
                                    {mistake}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSpacePeerInsight;