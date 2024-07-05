import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, Variants, useSpring } from 'framer-motion';
import { Chapter, Section, Tutorial } from '../utils/types';
import { getChapters, getSections, getTutorial } from '../utils/axios/axiosServices';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";

interface TutorialPageProps {
  isDarkMode: boolean;
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const TutorialPage: React.FC<TutorialPageProps> = ({ isDarkMode }) => {
  const { tutorialId, chapterId: urlChapterId, sectionSlug } = useParams<{ tutorialId: string, chapterId?: string, sectionSlug?: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const Mode = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const linkHoverClass = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const activeSectionClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';

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
        window.scrollTo(0, 0);  // Add smooth scrolling effect
      }
    }
  };

  return (
    <div className="w-full py-24 gap-10">
      <div className='flex justify-between'>
        <div className={`w-96 h-full py-4 sticky top-28 rounded-2xl shadow-lg ${Mode}`}>
          <p className='mx-10 text-4xl font-bold p-5'>{tutorial?.title}</p>
          <hr className='border-gray-300' />
          <ul className='space-y-2 mt-4'>
            {chapters.map((chapter) => (
              <li key={chapter.id} className='flex flex-col'>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleChapter(chapter)}
                  className={`py-4 text-xl font-medium px-5 flex items-center ${activeChapter?.id === chapter.id ? 'text-blue-600' : ''} ${linkHoverClass}`}
                >
                  {chapter.title}
                  <motion.div
                    variants={{
                      open: { rotate: 180 },
                      closed: { rotate: 0 }
                    }}
                    animate={activeChapter?.id === chapter.id ? "open" : "closed"}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                  >
                    {activeChapter?.id === chapter.id ? (
                      <MdOutlineKeyboardArrowUp className="ml-auto" />
                    ) : (
                      <MdOutlineKeyboardArrowDown className="ml-auto" />
                    )}
                  </motion.div>
                </motion.button>
                <motion.ul
                  initial={false}
                  animate={activeChapter?.id === chapter.id ? "open" : "closed"}
                  variants={{
                    open: {
                      clipPath: "inset(0% 0% 0% 0% round 10px)",
                      transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.7,
                        delayChildren: 0.3,
                        staggerChildren: 0.05
                      }
                    },
                    closed: {
                      clipPath: "inset(10% 50% 90% 50% round 10px)",
                      transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.3
                      }
                    }
                  }}
                  style={{ pointerEvents: activeChapter?.id === chapter.id ? "auto" : "none" }}
                >
                  {activeChapter?.id === chapter.id && sections.map((section) => (
                    <motion.li
                      key={section.id}
                      variants={itemVariants}
                      className={`pl-12 pr-3 py-4 flex items-center ${
                        section.slug === location.pathname.split('/').pop() ? activeSectionClass : linkHoverClass
                      }`}
                    >
                      <Link to={`/demo/tutorials/${tutorialId}/${chapter.id}/${section.slug}`} className="w-full">
                        {section.title}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
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
