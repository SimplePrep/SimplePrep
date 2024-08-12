import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { getSection } from '../../../auth_utils/axios/axiosServices';

interface Section {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  chapter: number;
}

interface StudySpaceBodyProps {
  isDarkMode: boolean;
}

const chunkSize = 1; 

const StudySpaceBody: React.FC<StudySpaceBodyProps> = ({ isDarkMode }) => {
  const { sectionSlug } = useParams<{ sectionSlug: string }>();
  const navigate = useNavigate();
  const darkModeClass = isDarkMode ? 'text-slate-300 bg-gray-900' : 'bg-white text-gray-600';
  const [section, setSection] = useState<Section | null>(null);
  const [visibleChunks, setVisibleChunks] = useState(1);
  const contentEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      if (sectionSlug) {
        setLoading(true);
        setError(null);
        try {
          const sectionData = await getSection(sectionSlug);
          setSection(sectionData);
        } catch (error) {
          console.error('Error fetching section data:', error);
          setError('Failed to load content. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSectionData();
  }, [sectionSlug]);

  const handleLoadMore = () => {
    setVisibleChunks(prev => Math.min(prev + 1, Math.ceil(paragraphs.length / chunkSize)));
  };

  const handleFinish = () => {
    // Navigate back to the course path or wherever you'd like after finishing.
    if (section?.chapter) {
      navigate(`/demo/tutorials/course-paths/${section.chapter}`);
    } else {
      navigate('/demo/tutorials');
    }
  };

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

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  // Split the section content into paragraphs
  const paragraphs = section?.content.split('\n').filter(paragraph => paragraph.trim() !== '') || [];
  const currentContent = paragraphs.slice(0, visibleChunks * chunkSize);

  const isAllContentVisible = visibleChunks * chunkSize >= paragraphs.length;

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

export default StudySpaceBody;
