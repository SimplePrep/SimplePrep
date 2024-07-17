import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { getChapters, getSections, getTutorial } from '../auth_utils/axios/axiosServices';

interface Chapter {
  id: number;
  title: string;
  order: number;
  tutorial: number;
}

interface Section {
  id: number;
  title: string;
  slug: string;
  chapter: number;
}

interface Tutorial {
  id: number;
  title: string;
}

interface TutorialPageProps {
  isDarkMode: boolean;
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

const TutorialPage: React.FC<TutorialPageProps> = ({ isDarkMode }) => {
  const { tutorialId, chapterId: urlChapterId, sectionSlug } = useParams<{ tutorialId: string, chapterId?: string, sectionSlug?: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const darkModeStyles = {
    mode: 'text-white transition-colors duration-300',
    linkHover: 'hover:text-white',
    activeSection: 'text-blue-500 text-md transition-colors duration-300',
    lineColor: 'bg-gray-500 transition-colors duration-300',
    dotHover: 'bg-gray-400 group-hover:bg-white transition-colors duration-300',
    activeChapter: 'font-bold text-white transition-colors duration-300',
    activeDot: 'bg-sky-600 transition-colors duration-300',
  };

  const lightModeStyles = {
    mode: 'text-[#001a72] transition-colors duration-300',
    linkHover: 'hover:text-[#001a72]',
    activeSection: 'text-[#001a72] text-md transition-colors duration-300',
    lineColor: 'bg-gray-300 transition-colors duration-300',
    dotHover: 'bg-gray-400 group-hover:bg-blue-700 transition-colors duration-300',
    activeChapter: 'font-bold text-[#001a72]  transition-colors duration-300',
    activeDot: 'bg-sky-600 transition-colors duration-300',
  };

  const styles = isDarkMode ? darkModeStyles : lightModeStyles;

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
    <div className="w-[1300px] mx-auto py-44 font-space-grotesk">
      <div className='flex justify-between gap-5'>
        <div className={`w-96 h-full py-4 sticky top-28 rounded-2xl ${styles.mode}`}>
          <p className='text-3xl font-bold p-5'>{tutorial?.title}</p>
          <ul className='space-y-2'>
            {chapters.map((chapter) => (
              <li key={chapter.id} className='flex flex-col'>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleChapter(chapter)}
                  className={`py-4 text-md font-medium px-5 flex items-center justify-between ${activeChapter?.id === chapter.id ? styles.activeChapter : 'text-gray-500'} ${styles.linkHover}`}
                >
                  <div className="flex items-center">
                    {chapter.title}
                  </div>
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
                      <MdOutlineKeyboardArrowUp />
                    ) : (
                      <MdOutlineKeyboardArrowDown />
                    )}
                  </motion.div>
                </motion.button>
                <motion.ul
                  initial={false}
                  animate={activeChapter?.id === chapter.id ? "open" : "closed"}
                  variants={{
                    open: {
                      clipPath: "inset(0% 0% 0% 0%)",
                      transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.7,
                        delayChildren: 0.1,
                        staggerChildren: 0.05
                      }
                    },
                    closed: {
                      clipPath: "inset(0% 0% 100% 0%)",
                      transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.3
                      }
                    }
                  }}
                  style={{ pointerEvents: activeChapter?.id === chapter.id ? "auto" : "none" }}
                  className="relative pl-6 ml-3 overflow-hidden"
                >
                  {activeChapter?.id === chapter.id && sections.map((section, index) => (
                    <motion.li
                      key={section.id}
                      variants={itemVariants}
                      className={`group py-3 text-lg flex items-center relative ${section.slug === location.pathname.split('/').pop() ? styles.activeSection : 'text-gray-400'} ${styles.linkHover}`}
                    >
                      <div className='flex flex-row items-center gap-5'>
                        <div className='relative flex flex-col items-center'>
                          <span className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                              section.slug === location.pathname.split('/').pop() 
                                ? styles.activeDot 
                                : 'bg-gray-400'
                            } ${styles.dotHover}`}></span>
                          {index < sections.length - 1 && (
                            <div className={`absolute top-2 w-[2px] h-9 ${styles.lineColor}`} />
                          )}
                        </div>
                        <Link 
                          to={`/demo/tutorials/${tutorialId}/${chapter.id}/${section.slug}`} 
                          className={`w-full flex justify-start ${section.slug === location.pathname.split('/').pop() ? 'text-sky-600 font-medium' : ''} ${styles.linkHover} ${isDarkMode ? 'text-[#adb6c8]' : ' text-[#506195]'}`}
                        >
                          {section.title}
                        </Link>
                      </div>
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
