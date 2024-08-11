import React from 'react'


interface LearningSpaceBodyProps {
    isDarkMode: boolean
}

const LearningSpaceBody:React.FC<LearningSpaceBodyProps> = ({isDarkMode}) => {
    const darkModeClass = isDarkMode ? ' text-white' : 'bg-white text-gray-900';

  return (
    <div className={`min-h-screen ml-[30%] w-[70%] ${darkModeClass} hidden md:block`}>
        <div className='px-20 py-20'>
            First Message
        </div>
    </div>
  )
}

export default LearningSpaceBody