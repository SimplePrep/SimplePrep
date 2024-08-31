import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { getSection, updateUserProgressSection } from '../../../auth_utils/axios/axiosServices';
import { Section } from '../../../auth_utils/types';

interface StudySpaceBodyProps {
  isDarkMode: boolean;
  onProgressChange: (currentStep: number) => void;
}

const chunkSize = 1;

const StudySpaceBody: React.FC<StudySpaceBodyProps> = ({ isDarkMode, onProgressChange }) => {
  const { tutorialId, sectionSlug } = useParams<{ tutorialId: string; sectionSlug: string }>();
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

  useEffect(() => {
    const totalParagraphs = section?.content.split('\n').filter(paragraph => paragraph.trim() !== '').length || 0;
    const calculatedStep = Math.ceil((visibleChunks / totalParagraphs) * 5);
    onProgressChange(calculatedStep);
  }, [visibleChunks, section, onProgressChange]);

  const handleLoadMore = () => {
    setVisibleChunks(prev => Math.min(prev + 1, paragraphs.length));
  };

  const handleFinish = async () => {
    if (section?.chapter && tutorialId) {
      try {
        await updateUserProgressSection(parseInt(tutorialId), {
          chapter_id: section.chapter,
          section_id: section.id,
          completed: true,
        });
        console.log('Section marked as complete.');
        navigate(`/demo/tutorials/course-paths/${section.chapter}`);
      } catch (error) {
        console.error('Error updating section progress:', error);
        setError('Failed to update progress. Please try again.');
      }
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

  const paragraphs = section?.content.split('\n').filter(paragraph => paragraph.trim() !== '') || [];
  const currentContent = paragraphs.slice(0, visibleChunks * chunkSize);

  const isAllContentVisible = visibleChunks * chunkSize >= paragraphs.length;

  if (loading) {
    return <div className={`fixed h-screen ml-[30%] w-[70%] ${darkModeClass} flex items-center justify-center`}>Loading...</div>;
  }

  if (error) {
    return <div className={`fixed h-screen ml-[30%] w-[70%] ${darkModeClass} flex items-center justify-center`}>{error}</div>;
  }

  if (!section || paragraphs.length === 0) {
    return <div className={`fixed h-screen ml-[30%] w-[70%] ${darkModeClass} flex items-center justify-center`}>No content available.</div>;
  }

  return (
    <div className={`fixed h-screen  w-full md:w-[70%] ${darkModeClass}`}>
      <div className='flex flex-col h-full'>
        <div ref={scrollContainerRef} className='flex-grow overflow-y-auto space-y-4 mb-16 mt-10 px-6 sm:px-12 lg:px-20 py-10 sm:py-16'>
          <AnimatePresence>
            {currentContent.map((paragraph, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
              >
                <p className="mb-6 text-base sm:text-lg font-semibold leading-relaxed">
                  {paragraph}
                </p>
                {index < currentContent.length - 1 && (
                  <div className="flex justify-center items-center my-10 sm:my-14">
                    <SmallWavyDivider isDarkMode={isDarkMode} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={contentEndRef} />
        </div>
        <div className="fixed bottom-3 right-3 sm:right-5">
          <AnimatePresence>
            {isAllContentVisible ? (
              <motion.button
                key="finishButton"
                onClick={handleFinish}
                className={`bg-blue-600 w-auto p-2 sm:px-6 border-[1px] rounded-xl font-semibold text-sm sm:text-base ${isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-800 text-white'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                Finish
              </motion.button>
            ) : (
              <motion.button
                key="continueButton"
                onClick={handleLoadMore}
                className={`bg-blue-600 w-auto p-2 sm:px-6 border-[1px] rounded-xl font-semibold text-sm sm:text-base ${isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-800 text-white'}`}
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
  return (
    <div className='flex flex-row items-center justify-center gap-4'>
      <div className='py-[1.5px] px-4 bg-blue-600 rounded-2xl'/>
      <div className='py-[1.5px] px-4 bg-yellow-500 rounded-2xl'/>
      <div className='py-[1.5px] px-4 bg-cyan-300 rounded-2xl'/>
    </div>
  );
};

export default StudySpaceBody;