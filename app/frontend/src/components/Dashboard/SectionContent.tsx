import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon } from 'react-icons/bs';
import { Section } from '../utils/types';
import { getSections } from '../utils/axios/axiosServices';

interface ParagraphProps {
    text: string | null;
    isHighlighted?: boolean; // New prop to indicate highlighting
  }
  
  const Paragraph: React.FC<ParagraphProps> = ({ text, isHighlighted = false }) => {
    return (
      <p className={`text-xl leading-relaxed max-w-prose mx-auto text-indent ${isHighlighted ? "bg-slate-200 rounded-xl p-4 text-black " : ""}`} style={{ marginBottom: '30px' }}>
        {text}
      </p>
    );
  };
  
interface SectionContentProps {
  isDarkMode: boolean;
}

const SectionContent: React.FC<SectionContentProps> = ({ isDarkMode }) => {
  const { tutorialId, sectionSlug } = useParams<{ tutorialId: string, sectionSlug: string }>();
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSections(Number(tutorialId));
        setSections(data);
        const currentSection = data.find(section => section.slug === sectionSlug) || null;
        setActiveSection(currentSection);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, [tutorialId, sectionSlug]);

  if (!activeSection) {
    return <div>Loading...</div>;
  }

  const modeClass = isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-gray-800';
  const contentToRender = activeSection.content;
  const titleToRender = activeSection.title;

  const currentIndex = sections.findIndex(section => section.slug === activeSection.slug);

  const navigateToSection = (index: number) => {
    const targetSection = sections[index];
    const targetPath = `/demo/tutorials/${tutorialId}/${targetSection.slug}`;
    navigate(targetPath);
    window.scrollTo(0, 0);
  };

  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      navigateToSection(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < sections.length - 1) {
      navigateToSection(currentIndex + 1);
    }
  };

  return (
    <div className={`h-full rounded-2xl ${modeClass}`}>
      <div className='flex flex-col gap-6 justify-center items-center p-10'>
        <p className='text-center text-3xl font-bold'>{titleToRender}</p>
      </div>
      <div className='py-5'>
        {contentToRender.split('\n').map((paragraph, index) => {
          const isHighlighted = paragraph.includes("**");
          return <Paragraph key={index} text={paragraph} isHighlighted={isHighlighted} />;
        })}
      </div>
      <div className='p-5 flex justify-between items-center'>
        <button
          onClick={handlePreviousClick}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
        >
          <BsFillArrowLeftCircleFill className="inline mr-2" /> Previous
        </button>
        <button
          onClick={handleNextClick}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
        >
          Next <BsFillArrowRightCircleFill className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SectionContent;
