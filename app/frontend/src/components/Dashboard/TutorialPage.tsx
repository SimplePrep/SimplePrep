import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { Chapter, Section, Tutorial } from '../utils/types';
import { getChapters, getSections, getTutorial } from '../utils/axios/axiosServices';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";

interface TutorialPageProps {
  isDarkMode: boolean;
}

const TutorialPage: React.FC<TutorialPageProps> = ({ isDarkMode }) => {
  const { tutorialId } = useParams<{ tutorialId: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);

  const Mode = isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-gray-800';
  const linkHoverClass = isDarkMode ? 'hover:text-gray-100 hover:bg-[#353535]' : 'hover:bg-slate-200';
  const activeSectionClass = isDarkMode ? 'bg-[#353535]' : 'bg-slate-300';

  useEffect(() => {
    const fetchTutorialData = async () => {
      try {
        const tutorialData = await getTutorial(Number(tutorialId));
        setTutorial(tutorialData);
        const chaptersData = await getChapters(Number(tutorialId));
        setChapters(chaptersData);
      } catch (error) {
        console.error('Error fetching tutorial or chapters:', error);
      }
    };
    fetchTutorialData();
  }, [tutorialId]);

  const toggleChapter = async (chapter: Chapter) => {
    if (activeChapter?.id === chapter.id) {
      setActiveChapter(null);
      setSections([]);
    } else {
      setActiveChapter(chapter);
      const sectionsData = await getSections(chapter.id);
      setSections(sectionsData);
    }
  };

  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <div className={`w-full py-10 gap-10`}>
      <div className='flex justify-between'>
        <div className={`w-96 h-screen py-4 sticky top-28 rounded-2xl shadow-lg ${Mode}`}>
          <p className='mx-10 text-4xl font-bold font-sans p-5'>{tutorial?.title}</p>
          <hr className='border-gray-300' />
          <ul className='space-y-2 mt-4'>
            {chapters.map((chapter) => (
              <li key={chapter.id} className='flex flex-col'>
                <Link
                  to={`/demo/tutorials/${tutorialId}/${chapter.id}`}
                  className={`py-4 text-xl font-medium mx-5 flex items-center rounded-md ${activeChapter?.id === chapter.id ? 'text-blue-600' : ''} ${linkHoverClass}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleChapter(chapter);
                  }}
                >
                  {chapter.title}
                  {activeChapter?.id === chapter.id ? (
                    <MdOutlineKeyboardArrowUp className="ml-auto" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="ml-auto" />
                  )}
                </Link>
                {activeChapter?.id === chapter.id && sections.map((section) => (
                  <Link
                    to={`/demo/tutorials/${tutorialId}/${chapter.id}/${section.slug}`}
                    key={section.id}
                    className={`pl-12 pr-3 py-4 flex items-center ${
                      section.slug === currentUrl.split('/').pop() ? activeSectionClass : linkHoverClass
                    } font-medium rounded-md transition-colors duration-150`}
                  >
                    {section.title}
                  </Link>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 max-w-5xl mx-auto rounded-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
