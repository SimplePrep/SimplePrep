import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { getSection, getSections } from "../utils/axios/axiosServices";
import { Section } from "../utils/types";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

interface ParagraphProps {
  text: string | null;
  isHighlighted?: boolean;
}

const Paragraph: React.FC<ParagraphProps> = ({ text, isHighlighted = false }) => {
  return (
    <p className={`text-lg leading-relaxed max-w-prose mx-auto ${isHighlighted ? "bg-slate-200 rounded-lg p-4 text-black" : ""} mb-6`}>
      {text}
    </p>
  );
};

const SectionContent: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const { tutorialId, chapterId, sectionSlug } = useParams<{ tutorialId: string, chapterId: string, sectionSlug: string }>();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchSectionAndSections = async () => {
      if (sectionSlug && chapterId) {
        setLoading(true);
        setError(null);
        try {
          const [sectionData, sectionsData] = await Promise.all([
            getSection(sectionSlug),
            getSections(parseInt(chapterId))
          ]);
          setSection(sectionData);
          setSections(sectionsData);
          setCurrentSectionIndex(sectionsData.findIndex(sec => sec.slug === sectionSlug));
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load content. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSectionAndSections();
  }, [sectionSlug, chapterId]);

  const navigateToSection = (chapterId: string, index: number) => {
    const targetSection = sections[index];
    if (targetSection) {
      const targetPath = `/demo/tutorials/${tutorialId}/${chapterId}/${targetSection.slug}`;
      navigate(targetPath);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousClick = () => {
    if (currentSectionIndex !== null && currentSectionIndex > 0) {
      navigateToSection(chapterId!, currentSectionIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentSectionIndex !== null && currentSectionIndex < sections.length - 1) {
      navigateToSection(chapterId!, currentSectionIndex + 1);
    }
  };

  const modeClass = isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-gray-800';
  const contentToRender = section?.content || '';
  const titleToRender = section?.title || '';
  const descriptionToRender = section?.description || '';

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={sectionSlug}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`min-h-screen rounded-2xl ${modeClass} p-10`}
      >
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50" style={{ scaleX }} />
        <div className='flex flex-col gap-6 justify-center items-center pb-10'>
          <h1 className='text-center text-4xl font-bold mb-4'>{titleToRender}</h1>
          <p className='text-center text-lg mb-6'>{descriptionToRender}</p>
        </div>
        <div className='py-5 rounded-lg shadow-md p-6'>
          {contentToRender.split('\n').map((paragraph, index) => {
            const isHighlighted = paragraph.includes("**");
            return <Paragraph key={index} text={paragraph.replace(/\*\*/g, "")} isHighlighted={isHighlighted} />;
          })}
        </div>
        <div className='p-5 flex justify-between items-center mt-6'>
          <motion.button
            onClick={handlePreviousClick}
            disabled={currentSectionIndex === 0}
            className="py-2 px-6 border-2 rounded-xl hover:bg-blue-500 hover:text-white font-semibold text-lg disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BsFillArrowLeftCircleFill className="inline mr-2" /> Previous
          </motion.button>
          <motion.button
            onClick={handleNextClick}
            disabled={currentSectionIndex === sections.length - 1}
            className="py-2 px-6 border-2 rounded-xl hover:bg-blue-500 hover:text-white font-semibold text-lg disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Next <BsFillArrowRightCircleFill className="inline ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SectionContent;
