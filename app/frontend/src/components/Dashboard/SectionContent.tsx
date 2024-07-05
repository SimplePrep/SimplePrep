import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { getSection } from '../utils/axios/axiosServices';
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

  useEffect(() => {
    const fetchSection = async () => {
      if (sectionSlug) {
        try {
          const sectionData = await getSection(sectionSlug);
          setSection(sectionData);
          console.log('Section state:', sectionData); // Add this line to log the state
          setSections((prevSections) => {
            const updatedSections = [...prevSections];
            const sectionIndex = updatedSections.findIndex(sec => sec.slug === sectionSlug);
            if (sectionIndex !== -1) {
              updatedSections[sectionIndex] = sectionData;
            } else {
              updatedSections.push(sectionData);
            }
            setCurrentSectionIndex(updatedSections.findIndex(sec => sec.slug === sectionSlug));
            return updatedSections;
          });
        } catch (error) {
          console.error('Error fetching section:', error);
        }
      }
    };
    fetchSection();
  }, [sectionSlug]);

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
    } else {
      // logic for navigating to the previous chapter's last section if needed
    }
  };

  const handleNextClick = () => {
    if (currentSectionIndex !== null && currentSectionIndex < sections.length - 1) {
      navigateToSection(chapterId!, currentSectionIndex + 1);
    } else {
      // logic for navigating to the next chapter's first section if needed
    }
  };

  const modeClass = isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-gray-800';
  const contentToRender = section?.content || ''; // Ensure there's a fallback for the content
  const titleToRender = section ? section.title : '';

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
