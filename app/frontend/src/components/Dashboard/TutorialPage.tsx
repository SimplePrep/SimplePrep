import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Chapter, Section, Tutorial } from '../utils/types';
import { getChapters, getSections, getTutorial } from '../utils/axios/axiosServices';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";

interface TutorialPageProps {
  isDarkMode: boolean;
}

const TutorialPage: React.FC<TutorialPageProps> = ({ isDarkMode }) => {
  const { tutorialId, chapterId: urlChapterId, sectionSlug } = useParams<{ tutorialId: string, chapterId?: string, sectionSlug?: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

        if (chaptersData.length > 0) {
          const targetChapter = urlChapterId 
            ? chaptersData.find(chapter => chapter.id === Number(urlChapterId)) 
            : chaptersData[0];
          
          if (targetChapter) {
            setActiveChapter(targetChapter);
            const sectionsData = await getSections(targetChapter.id);
            setSections(sectionsData);

            if (!sectionSlug && sectionsData.length > 0) {
              const firstSection = sectionsData[0];
              navigate(`/demo/tutorials/${tutorialId}/${targetChapter.id}/${firstSection.slug}`, { replace: true });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching tutorial or chapters:', error);
      }
    };
    fetchTutorialData();
  }, [tutorialId, urlChapterId, sectionSlug, navigate]);

  const toggleChapter = async (chapter: Chapter) => {
    if (activeChapter?.id === chapter.id) {
      setActiveChapter(null);
      setSections([]);
    } else {
      setActiveChapter(chapter);
      const sectionsData = await getSections(chapter.id);
      setSections(sectionsData);
      if (sectionsData.length > 0) {
        navigate(`/demo/tutorials/${tutorialId}/${chapter.id}/${sectionsData[0].slug}`);
      }
    }
  };

  return (
    <div className={`w-full py-10 gap-10`}>
      <div className='flex justify-between'>
        <div className={`w-96 h-full py-4 sticky top-28 rounded-2xl shadow-lg ${Mode}`}>
          <p className='mx-10 text-4xl font-bold font-sans p-5'>{tutorial?.title}</p>
          <hr className='border-gray-300 border-[2px]' />
          <ul className='space-y-2 mt-4'>
            {chapters.map((chapter) => (
              <li key={chapter.id} className='flex flex-col'>
                <button
                  className={`py-4 text-xl font-medium px-2 flex items-center ${activeChapter?.id === chapter.id ? 'text-blue-600' : ''} ${linkHoverClass}`}
                  onClick={() => toggleChapter(chapter)}
                >
                  {chapter.title}
                  {activeChapter?.id === chapter.id ? (
                    <MdOutlineKeyboardArrowUp className="ml-auto" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="ml-auto" />
                  )}
                </button>
                {activeChapter?.id === chapter.id && sections.map((section) => (
                  <Link
                    to={`/demo/tutorials/${tutorialId}/${chapter.id}/${section.slug}`}
                    key={section.id}
                    className={`pl-12 pr-3 py-4 flex items-center ${
                      section.slug === location.pathname.split('/').pop() ? activeSectionClass : linkHoverClass
                    } font-medium transition-colors duration-150`}
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