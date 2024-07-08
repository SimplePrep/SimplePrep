import React, { useEffect, useState } from 'react';
import { useResolvedPath, NavLink } from 'react-router-dom';
import { Tutorial, Chapter } from '../auth_utils/types';
import tutorial1Image from '../assets/tutorials/tutorial1.jpg';
import tutorial2Image from '../assets/tutorials/tutorial2.jpg';
import { getChapters, getTutorials } from '../auth_utils/axios/axiosServices';
import { motion } from 'framer-motion';

const basePath = "/demo/tutorials";



interface TutorialCardProps {
  tutorial: Tutorial;
}
const SkeletonTutorialCard = () => (
  <div className="bg-teal-200 rounded w-[300px]">
    <div className="m-1 rounded overflow-hidden shadow-lg bg-white h-[500px] flex flex-col animate-pulse">
      <div className="h-56 bg-gray-300"></div>
      <div className="px-6 py-4 flex-grow">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
          ))}
        </div>
      </div>
      <div className='flex justify-center p-4'>
        <div className="h-10 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      setIsLoading(true);
      try {
        const data = await getChapters(tutorial.id);
        setChapters(data);
      } catch (error) {
        console.error('Error fetching chapters in TutorialCard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChapters();
  }, [tutorial.id]);

  const { pathname } = useResolvedPath(`${basePath}/${tutorial.id}`);

  const tutorialImages: { [key: number]: string } = {
    1: tutorial1Image,
    2: tutorial2Image,
  };

  const tutorialImage = tutorialImages[tutorial.id] || 'path/to/default/image.jpg';

  if (isLoading) {
    return <SkeletonTutorialCard />;
  }

  return (
    <motion.div
      className="bg-teal-200 rounded w-[300px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="m-1 rounded overflow-hidden shadow-lg bg-white h-[500px] flex flex-col">
        <img className="h-56 w-full object-cover shadow-2xl shadow-teal-100" src={tutorialImage} alt={`${tutorial.title} icon`} />
        <div className="px-6 py-4 flex-grow overflow-y-auto">
          <p className="font-bold text-xl mb-2">{tutorial.title}</p>
          <ul className='text-gray-700 text-base'>
            {chapters.map((chapter, index) => <li key={index}>{chapter.title}</li>)}
          </ul>
        </div>
        <div className='flex justify-center p-4'>
          <NavLink to={pathname} className="mx-auto py-2 px-4 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
            Start Reading
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

const Tutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      setIsLoading(true);
      try {
        const data = await getTutorials();
        setTutorials(data);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  return (
    <div className='h-full max-w-[1200px] mx-auto px-20 py-40'>
      <h1 className='text-blue-900 text-3xl font-roboto font-medium'>Welcome to Tutorials</h1>
      <div className='my-20 flex flex-row items-center justify-evenly'>
        {isLoading
          ? [...Array(2)].map((_, index) => <SkeletonTutorialCard key={index} />)
          : tutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))
        }
      </div>
    </div>
  );
};

export default Tutorials;
