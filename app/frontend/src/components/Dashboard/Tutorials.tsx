import React from 'react';
import { Outlet, useResolvedPath} from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import read_icon from '../assets/tutorials/front-view-desk-with-stacked-books-copy-space.jpg';
import write_icon from '../assets/tutorials/write.jpg';
import math_icon from '../assets/tutorials/math.jpg';


const basePath = "/demo/tutorials";

interface TutorialCardProps {
    title: string;
    imagePath: string;
    items: string[];
    linkPath: string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ title, imagePath, items, linkPath }) => {  

    const {pathname} = useResolvedPath(linkPath);


    return(
    <div className='bg-teal-200 rounded'>
        <div className="m-1 rounded overflow-hidden shadow-lg bg-white">
            <img className="h-56 object-cover shadow-2xl shadow-teal-100" src={imagePath} alt={`${title} icon`} />
            <div className="px-6 py-4">
                <p className="font-bold text-xl mb-2">{title}</p>
                <ul className='text-gray-700 text-base'>
                    {items.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
            <div className='flex justify-center pb-4'>
                <NavLink to={pathname} className="mx-auto py-2 px-4 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                    Start Reading
                </NavLink>
            </div>
        </div>
    </div>
)};


const Tutorials = () => {


    const tutorialData = [
        {
            title: "English",
            imagePath: read_icon,
            items: ["Command of Evidence", "Central Ideas and Details", "Inferences", "Text Structure and Purpose", "Cross-Text Connections", "Transitions"],
            linkPath: `${basePath}/english`
        },
        {
            title: "Writing",
            imagePath: write_icon,
            items: ["Boundaries", "Form, Structure, Tense", "Transitions", "Notes",],
            linkPath: `${basePath}/writing`
        },
    ]

  return (
    <div className='h-[92vh] max-w-[1600px] mx-auto p-20'>
        <h1 className='text-white text-3xl font-roboto font-medium'>Welcome to Tutorials</h1>

        <div className='my-20 flex flex-row items-center justify-evenly'>
            {tutorialData.map((tutorial, index) => (
                <TutorialCard key={index} {...tutorial}/>
            ))}
        </div>
    </div>
  )
}

export default Tutorials