import React from 'react';
import { motion } from 'framer-motion';

interface ReviewSpaceCheatSheetProps {
  isDarkMode: boolean;
}

const ReviewSpaceCheatSheet: React.FC<ReviewSpaceCheatSheetProps> = ({ isDarkMode }) => {
  const topic = "Introduction to React Hooks";
  const content = [
    {
      subtitle: "What are React Hooks?",
      text: "React Hooks are a feature introduced in React 16.8 that allow you to use state and other React features without writing a class component. They let you 'hook into' React state and lifecycle features from function components."
    },
    {
      subtitle: "useState Hook",
      text: "The useState hook is used for adding state to functional components. It returns an array with two elements: the current state value and a function to update it. This allows you to use state without converting your component to a class."
    },
    {
      subtitle: "useEffect Hook",
      text: "The useEffect hook is used for side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes. This hook lets you perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM."
    },
    {
      subtitle: "Rules of Hooks",
      text: "There are two important rules to remember when using hooks: 1) Only call hooks at the top level of your component, not inside loops, conditions, or nested functions. 2) Only call hooks from React function components or custom hooks, not regular JavaScript functions."
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} py-20 px-4 sm:py-12 sm:px-6`}>
      <div className="max-w-3xl mx-auto p-4 sm:p-8 md:p-10 lg:p-12">
        <h1 className={`text-xl sm:text-4xl font-semibold mb-6 sm:mb-8 text-center ${isDarkMode ? 'text-gray-200' : 'text-indigo-700'}`}>
          {topic}
        </h1>
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {content.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`bg-opacity-50 p-4 sm:p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              <h2 className={`text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'} transition-colors duration-200`}>
                {section.subtitle}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                {section.text}
              </p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSpaceCheatSheet;
