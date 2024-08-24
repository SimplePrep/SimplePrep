import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaChartLine, FaChevronDown, FaChevronUp, FaTools, FaBookOpen } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';

interface ReviewSpacePeerInsightProps {
    isDarkMode: boolean;
}

const ReviewSpacePeerInsight: React.FC<ReviewSpacePeerInsightProps> = ({ isDarkMode }) => {
    const [expandedApproach, setExpandedApproach] = useState<number | null>(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const theme = {
        bg: isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
        text: isDarkMode ? 'text-gray-200' : 'text-gray-800',
        card: isDarkMode ? 'bg-gray-800' : 'bg-white',
        highlight: isDarkMode ? 'bg-gray-600' : 'bg-blue-100',
        border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
        button: isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600',
        icon: isDarkMode ? 'text-yellow-500' : 'text-yellow-600',
    };

    const topic = "Algorithm Optimization in Large Datasets";
    const peerApproaches = [
        { name: "Alice", approach: "I implemented a hybrid approach combining QuickSort for smaller partitions and MergeSort for larger ones. This balanced speed and memory efficiency." },
        { name: "Bob", approach: "My solution focused on an in-place HeapSort algorithm. I optimized the heapify process to reduce the number of comparisons." },
        { name: "Charlie", approach: "I used an external merge sort algorithm, which allowed me to handle datasets larger than the available memory by using disk storage efficiently." }
    ];
    const keyInsights = [
        "Consider hybrid approaches that combine strengths of different algorithms.",
        "In-place sorting algorithms can significantly reduce memory usage.",
        "For extremely large datasets, consider external sorting methods.",
        "Optimize comparison operations to improve overall performance."
    ];

    const toggleApproach = (index: number) => {
        setExpandedApproach(expandedApproach === index ? null : index);
    };

    return (
        <div className={`min-h-screen ${theme.bg} ${theme.text} py-28 px-4 sm:px-6 lg:px-8 ${fadeIn ? 'animate-fadeIn' : 'opacity-0'}`}>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Peer Insight</h1>

                <div className={`rounded-lg shadow-md p-6 mb-8 ${theme.card}`}>
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <MdLibraryBooks className="mr-2 text-indigo-500" />
                        Introduction to the Topic
                    </h2>
                    <p className="text-md mb-4">
                        {topic} is a crucial aspect of computer science, particularly when working with large datasets. This peer insight will explore how top peers approached the challenge of optimizing sorting algorithms for large datasets while minimizing memory usage.
                    </p>
                </div>

                <div className={`rounded-lg shadow-md p-6 mb-8 ${theme.card}`}>
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <FaLightbulb className={`mr-2 ${theme.icon}`} />
                        Top Peer Approaches
                    </h2>
                    {peerApproaches.map((peer, index) => (
                        <div
                            key={index}
                            className={`rounded-lg p-4 mb-4 ${theme.highlight} cursor-pointer transition-all duration-300 ease-in-out`}
                            onClick={() => toggleApproach(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">{peer.name}'s Approach</h3>
                                {expandedApproach === index ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            <p className={`text-md mt-2 ${expandedApproach === index ? 'block' : 'hidden'}`}>
                                {peer.approach}
                            </p>
                        </div>
                    ))}
                </div>

                <div className={`rounded-lg shadow-md p-6 mb-8 ${theme.card}`}>
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <FaChartLine className="mr-2 text-green-500" />
                        Key Insights
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                        {keyInsights.map((insight, index) => (
                            <li key={index}>{insight}</li>
                        ))}
                    </ul>
                </div>

                <div className={`rounded-lg shadow-md p-6 ${theme.card}`}>
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <FaTools className="mr-2 text-red-500" />
                        Applying These Insights
                    </h2>
                    <ol className="list-decimal list-inside space-y-4 text-md leading-relaxed">
                        <li>Analyze the trade-offs between time complexity and space complexity in your current algorithm.</li>
                        <li>Experiment with hybrid approaches, combining strengths of different sorting methods.</li>
                        <li>Profile your code to identify bottlenecks and optimize comparison operations.</li>
                        <li>Consider the characteristics of your data when choosing or designing an algorithm.</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default ReviewSpacePeerInsight;
