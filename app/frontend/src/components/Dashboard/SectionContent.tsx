import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { getSection, getSections } from "../utils/axios/axiosServices";
import { Section } from "../utils/types";

interface ParagraphProps {
  text: string | null;
  isHighlighted?: boolean;
}

const Paragraph: React.FC<ParagraphProps> = ({ text, isHighlighted = false }) => {
  return (
    <p className={`text-xl leading-relaxed max-w-prose mx-auto text-indent ${isHighlighted ? "bg-slate-200 rounded-xl p-4 text-black " : ""}`} style={{ marginBottom: '30px' }}>
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

  useEffect(() => {
    console.log('Route params:', { tutorialId, chapterId, sectionSlug });

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
    <div className={`h-full rounded-2xl ${modeClass} p-10`}>
      <div className='flex flex-col gap-6 justify-center items-center pb-10'>
        <h1 className='text-center text-4xl font-bold mb-4'>{titleToRender}</h1>
        <p className='text-center text-lg mb-6'>{descriptionToRender}</p>
      </div>
      <div className='py-5  rounded-lg shadow-md p-6'>
        {contentToRender.split('\n').map((paragraph, index) => {
          const isHighlighted = paragraph.includes("**");
          return <Paragraph key={index} text={paragraph} isHighlighted={isHighlighted} />;
        })}
      </div>
      <div className='p-5 flex justify-between items-center mt-6'>
        <button
          onClick={handlePreviousClick}
          disabled={currentSectionIndex === 0}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg disabled:opacity-50"
        >
          <BsFillArrowLeftCircleFill className="inline mr-2" /> Previous
        </button>
        <button
          onClick={handleNextClick}
          disabled={currentSectionIndex === sections.length - 1}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg disabled:opacity-50"
        >
          Next <BsFillArrowRightCircleFill className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SectionContent;
