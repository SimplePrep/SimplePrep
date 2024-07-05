import React, { useEffect, useState } from 'react';
import { useResolvedPath } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Tutorial } from '../utils/types';
import tutorial1Image from '../assets/tutorials/tutorial1.jpg'
import tutorial2Image from '../assets/tutorials/tutorial2.jpg';
import { getTutorials } from '../utils/axios/axiosServices';

const basePath = "/demo/tutorials";

// Import your images

interface TutorialCardProps {
  tutorial: Tutorial;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  const { pathname } = useResolvedPath(`${basePath}/${tutorial.id}`);

  // Define a mapping between tutorial titles and images
  const tutorialImages: { [key: string]: string } = {
    'Tutorial 1': tutorial1Image,
    'Tutorial 2': tutorial2Image,
  };

  const tutorialImage = tutorialImages[tutorial.title] || 'path/to/default/image.jpg';

  return (
    <div className='bg-teal-200 rounded'>
      <div className="m-1 rounded overflow-hidden shadow-lg bg-white">
        <img className="h-56 object-cover shadow-2xl shadow-teal-100" src={tutorialImage} alt={`${tutorial.title} icon`} />
        <div className="px-6 py-4">
          <p className="font-bold text-xl mb-2">{tutorial.title}</p>
          <ul className='text-gray-700 text-base'>
            {tutorial.sections.map((section, index) => <li key={index}>{section.title}</li>)}
          </ul>
        </div>
        <div className='flex justify-center pb-4'>
          <NavLink to={pathname} className="mx-auto py-2 px-4 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
            Start Reading
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const Tutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const data = await getTutorials();
        setTutorials(data);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      }
    };

    fetchTutorials();
  }, []);

  return (
    <div className='h-[92vh] max-w-[1200px] mx-auto p-20'>
      <h1 className='text-white text-3xl font-roboto font-medium'>Welcome to Tutorials</h1>
      <div className='my-20 flex flex-row items-center justify-evenly'>
        {tutorials.map((tutorial, index) => (
          <TutorialCard key={index} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
