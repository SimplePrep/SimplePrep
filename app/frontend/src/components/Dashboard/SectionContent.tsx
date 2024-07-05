import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { getChapters } from '../utils/axios/axiosServices'; // Adjust the path as needed
import { Chapter, Section } from "../utils/types";

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
  const { tutorialId, chapterId, sectionId } = useParams<{ tutorialId: string, chapterId: string, sectionId: string }>();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      if (tutorialId) {
        try {
          const data = await getChapters(Number(tutorialId));
          setChapters(data);
          const chapter = data.find(c => c.id === Number(chapterId));
          setActiveChapter(chapter || null);
          if (chapter && sectionId) {
            const sectionIndex = chapter.sections.findIndex(sec => sec.id === Number(sectionId));
            setCurrentSectionIndex(sectionIndex !== -1 ? sectionIndex : null);
          }
        } catch (error) {
          console.error('Error fetching chapters:', error);
        }
      }
    };
    fetchChapters();
  }, [tutorialId, chapterId, sectionId]);

  const navigateToChapter = (index: number) => {
    const targetChapter = chapters[index];
    const targetPath = `/demo/tutorials/${tutorialId}/${targetChapter.id}`;
    navigate(targetPath);
    window.scrollTo(0, 0);
  };

  const navigateToSection = (chapterIndex: number, sectionIndex: number) => {
    const targetSection = chapters[chapterIndex]?.sections?.[sectionIndex];
    if (targetSection) {
      const targetPath = `/demo/tutorials/${tutorialId}/${chapters[chapterIndex].id}/${targetSection.id}`;
      navigate(targetPath);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousClick = () => {
    if (currentSectionIndex !== null && currentSectionIndex > 0) {
      navigateToSection(chapters.findIndex(ch => ch.id === activeChapter?.id), currentSectionIndex - 1);
    } else {
      const currentChapterIndex = chapters.findIndex(ch => ch.id === activeChapter?.id);
      if (currentChapterIndex > 0) {
        navigateToChapter(currentChapterIndex - 1);
      }
    }
  };

  const handleNextClick = () => {
    const sectionCount = activeChapter?.sections?.length ?? 0;
    if (currentSectionIndex !== null && currentSectionIndex < sectionCount - 1) {
      navigateToSection(chapters.findIndex(ch => ch.id === activeChapter?.id), currentSectionIndex + 1);
    } else {
      const currentChapterIndex = chapters.findIndex(ch => ch.id === activeChapter?.id);
      if (currentChapterIndex < chapters.length - 1) {
        navigateToChapter(currentChapterIndex + 1);
      }
    }
  };

  const modeClass = isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-gray-800';
  const section = sectionId ? activeChapter?.sections?.find(sec => sec.id === Number(sectionId)) : undefined;
  const contentToRender = section?.content;
  const titleToRender = section ? section.title : activeChapter?.title;

  return (
    <div className={`h-full rounded-2xl ${modeClass}`}>
      <div className='flex flex-col gap-6 justify-center items-center p-10'>
        <p className='text-center text-3xl font-bold'>{titleToRender}</p>
      </div>
      <div className='py-5'>
        {contentToRender?.split('\n').map((paragraph, index) => {
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
