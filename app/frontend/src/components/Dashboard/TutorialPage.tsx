import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { Section, Tutorial } from '../utils/types';
import { getSections, getTutorial } from '../utils/axios/axiosServices';

interface TutorialPageProps {
  isDarkMode: boolean;
}

const TutorialPage: React.FC<TutorialPageProps> = ({ isDarkMode }) => {
  const { tutorialId, sectionSlug } = useParams<{ tutorialId: string, sectionSlug: string }>();
  const [sections, setSections] = useState<Section[]>([]);
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const navigate = useNavigate();

  const Mode = isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-gray-800';
  const linkHoverClass = isDarkMode ? 'hover:text-gray-100 hover:bg-[#353535]' : 'hover:bg-slate-200';
  const activeSectionClass = isDarkMode ? 'bg-[#353535]' : 'bg-slate-300';

  useEffect(() => {
    const fetchTutorialData = async () => {
      try {
        const tutorialData = await getTutorial(Number(tutorialId));
        setTutorial(tutorialData);
        const sectionsData = await getSections(Number(tutorialId));
        setSections(sectionsData);
        if (sectionSlug) {
          const active = sectionsData.find((section: Section) => section.slug === sectionSlug);
          setActiveSection(active || null);
        }
        console.log('Fetched tutorial:', tutorialData);
        console.log('Fetched sections:', sectionsData);
      } catch (error) {
        console.error('Error fetching tutorial or sections:', error);
      }
    };

    fetchTutorialData();
  }, [tutorialId, sectionSlug]);

  useEffect(() => {
    if (sections.length > 0 && !activeSection && sectionSlug) {
      const active = sections.find((section: Section) => section.slug === sectionSlug);
      setActiveSection(active || null);
      console.log('Set active section:', active);
    }
  }, [sections, sectionSlug, activeSection]);

  const currentIndex = sections.findIndex(section => section.slug === activeSection?.slug);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  return (
    <div className="w-full py-10 gap-10">
      <div className="flex justify-between">
        <div className={`w-96 h-screen py-4 sticky top-28 rounded-2xl shadow-lg ${Mode}`}>
          <p className="mx-10 text-4xl font-bold font-sans p-5">{tutorial?.title}</p>
          <hr className="border-gray-300" />
          <ul className="space-y-2 mt-4">
            {sections.map((section) => (
              <li key={section.id} className="flex flex-col">
                <Link
                  to={`/demo/tutorials/${tutorialId}/${section.slug}`}
                  className={`py-4 text-xl font-medium mx-5 flex items-center rounded-md ${activeSection?.slug === section.slug ? activeSectionClass : ''} ${linkHoverClass}`}
                  onClick={() => setActiveSection(section)}
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 max-w-5xl mx-auto rounded-2xl">
          <Outlet context={{ activeSection }} />
          <div className="flex justify-between mt-4">
            {prevSection && (
              <button
                onClick={() => navigate(`/demo/tutorials/${tutorialId}/${prevSection.slug}`)}
                className="py-2 px-4 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              >
                Previous
              </button>
            )}
            {nextSection && (
              <button
                onClick={() => navigate(`/demo/tutorials/${tutorialId}/${nextSection.slug}`)}
                className="py-2 px-4 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ml-auto"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
