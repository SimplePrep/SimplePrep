import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import Section, { sections } from './Section';

const TutorialPage = () => {
  const { tutorialId, sectionId } = useParams();

  return (
    <div className='w-full py-10 gap-10'>
      <div className='flex justify-between w-full '>
        <div className='w-96 overflow-y-auto py-4 h-[60vh] sticky top-36 bg-white rounded-2xl shadow-lg'>
          <p className='mx-10 text-4xl font-bold font-serif p-5'>English</p>
          <hr className='border-gray-300' />
          <ul className='space-y-5 mt-4'>
            {sections.map(({ id, title, completed }, index) => (
              <li
                key={index}
                className={`flex items-center space-x-2 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out ${
                  index < sections.length - 1 ? 'border-b border-gray-300' : ''
                }`}
              >
                <span className="text-gray-500 mx-5">{index + 1}.</span>
                <Link
                  to={`/demo/tutorials/${tutorialId}/${id.replaceAll(' ', '-')}`}
                  className="py-2 text-gray-800 hover:text-blue-600 flex-1 text-xl font-semibold font-serif"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-1 max-w-[1000px] mx-auto  rounded-2xl'>
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;