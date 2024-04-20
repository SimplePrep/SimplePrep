import React, { useState, useEffect} from 'react';
import { Link, Outlet, useParams, useLocation} from 'react-router-dom';
import Section, { sections } from './Section';
import { MdOutlineKeyboardArrowUp,  MdOutlineKeyboardArrowDown } from "react-icons/md";

// Assuming `sections` might now include a `subSections` array similar to `subNav` in your sidebar example

interface TutorialPageProps {
  isDarkMode: boolean;
}

const TutorialPage:React.FC<TutorialPageProps> = ({isDarkMode}) => {
  const { tutorialId } = useParams<{ tutorialId: string }>();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);

  const Mode = isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-gray-800';
  const linkHoverClass = isDarkMode ? 'hover:text-gray-100 hover:bg-[#353535]' : 'hover:bg-slate-200';
  const activeSubSectionClass = isDarkMode ? 'bg-[#353535]' : 'bg-slate-300';

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const location = useLocation();
  const currentUrl = location.pathname;


  return (
    <div className={`w-full py-10 gap-10`}>
      <div className='flex justify-between'>
        <div className={`w-96  h-screen py-4 sticky top-28 rounded-2xl shadow-lg ${Mode}`}>
          <p className='mx-10 text-4xl font-bold font-sans p-5'>English</p>
          <hr className='border-gray-300' />
          <ul className='space-y-2 mt-4'>
            {sections.map(({ id, title, subSections }) => (
              <li key={id} className='flex flex-col'>
                <Link
                  to={`/demo/tutorials/${tutorialId}/${id.replaceAll(' ', '-')}`}
                  className={`py-4 text-xl font-medium mx-5 flex items-center rounded-md ${activeSection === id ? 'text-blue-600' : ''} ${linkHoverClass}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSection(id);
                  }}
                >
                  {title}
                  {activeSection === id ? (
                    <MdOutlineKeyboardArrowUp className="ml-auto" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="ml-auto" />
                  )}
                </Link>
                {activeSection === id && subSections &&
                  subSections.map((sub) => (
                    <Link
                      to={`/demo/tutorials/${tutorialId}/${id}/${sub.id.replaceAll(' ', '-')}`}
                      key={sub.id}
                      className={`pl-12 pr-3 py-4 flex items-center ${
                        sub.id.replaceAll(' ', '-') === currentUrl.split('/').pop()
                          ? activeSubSectionClass
                          : linkHoverClass
                      } font-medium rounded-md transition-colors duration-150`}
                    >
                      {sub.title}
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
