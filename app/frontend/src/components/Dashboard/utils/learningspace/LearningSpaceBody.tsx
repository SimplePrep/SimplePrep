import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

interface LearningSpaceBodyProps {
  isDarkMode: boolean;
}

const exampleContent = [
  "Section 1: Introduction",
  "The SAT Reading Test presents a unique challenge in assessing a student's vocabulary knowledge and reading comprehension abilities. One question type that combines these skills is the vocabulary-in-context question.",
  "In these questions, students are given a sentence with a blank, and they must choose the word or phrase that best fits the meaning and context of the sentence. Mastering this question type is crucial, as it not only demonstrates a student's proficiency with vocabulary but also their ability to analyze written passages and make logical inferences based on context clues.",
  "To excel at vocabulary-in-context questions, students must possess a robust vocabulary foundation and the ability to interpret nuanced meanings, connotations, and tones effectively. Additionally, they must have strong reading comprehension skills to understand the sentence's context fully and identify the precise word or phrase that fits seamlessly into the given passage.",
  "This tutorial will provide a comprehensive guide to tackling vocabulary-in-context questions successfully, breaking down the process into clear, actionable steps. We'll explore strategies for analyzing context, interpreting nuances, and making informed choices, all while offering numerous examples and practice opportunities to reinforce these essential skills.",
  "By the end of this tutorial, students will have a thorough understanding of how to approach these questions systematically, enabling them to demonstrate their vocabulary knowledge and reading comprehension abilities effectively on the SAT Reading Test."
  // Additional paragraphs...
];
const chunkSize = 1;
const LearningSpaceBody: React.FC<LearningSpaceBodyProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { tutorialId } = useParams<{ tutorialId: string }>();
  const darkModeClass = isDarkMode ? 'text-slate-300 bg-gray-900' : 'bg-white text-gray-600';
  const [visibleChunks, setVisibleChunks] = useState(1);
  const contentEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = () => {
    setVisibleChunks(prev => Math.min(prev + 1, Math.ceil(exampleContent.length / chunkSize)));
  };

  const handleFinish = () => {
    if (tutorialId) {
      navigate(`/demo/tutorials/course-paths/${tutorialId}`);
    } else {
      navigate('/demo/tutorials');
    }
  };

  const currentContent = exampleContent.slice(0, visibleChunks * chunkSize);

  useEffect(() => {
    if (contentEndRef.current && scrollContainerRef.current) {
      const contentEndPosition = contentEndRef.current.getBoundingClientRect().bottom;
      const scrollContainerPosition = scrollContainerRef.current.getBoundingClientRect().bottom;

      if (contentEndPosition > scrollContainerPosition) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [visibleChunks]);

  const isAllContentVisible = visibleChunks * chunkSize >= exampleContent.length;

  return (
    <div className={`fixed h-screen ml-[30%] w-[70%] ${darkModeClass} hidden md:block`}>
      <div className='flex flex-col h-full'>
        <div ref={scrollContainerRef} className='flex-grow overflow-y-auto space-y-4 mb-16 mt-10 px-20 py-20'>
            <AnimatePresence>
                {currentContent.map((paragraph, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    >
                    <p className="mb-6 text-lg font-semibold leading-relaxed">
                        {paragraph}
                    </p>
                    {index < currentContent.length - 1 && (
                        <div className="flex justify-center items-center my-14">
                        <SmallWavyDivider isDarkMode={isDarkMode} />
                        </div>
                    )}
                    </motion.div>
                ))}
            </AnimatePresence>
          <div ref={contentEndRef} />
        </div>
        <div className="fixed bottom-3 right-5">
          <AnimatePresence>
            {isAllContentVisible && (
              <motion.button
                key="finishButton" // Ensure a unique key for animation
                onClick={handleFinish}
                className={`bg-blue-600 w-auto p-2 sm:px-6 border-[1px] rounded-xl font-semibold text-base ${isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-800 text-white'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                Finish
              </motion.button>
            )}
            {!isAllContentVisible && (
              <motion.button
                key="continueButton" // Ensure a unique key for animation
                onClick={handleLoadMore}
                className={`bg-blue-600 w-auto p-2 sm:px-6 border-[1px] rounded-xl font-semibold text-base ${isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-800 text-white'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                Continue
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const SmallWavyDivider: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const dividerColor = isDarkMode ? '#ffffff' : '#4B5563';

  return (
    <div className='flex flex-row items-center justify-center gap-4'>
      <div className='py-[1.5px] px-4 bg-blue-600 rounded-2xl'/>
      <div className='py-[1.5px] px-4 bg-yellow-500 rounded-2xl'/>
      <div className='py-[1.5px] px-4 bg-cyan-300 rounded-2xl'/>
    </div>
  );
};

export default LearningSpaceBody;