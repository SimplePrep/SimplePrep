import React from 'react';

interface ProfileDropdownItemProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  isDarkMode: boolean;
}

const ProfileDropdownItem: React.FC<ProfileDropdownItemProps> = ({ icon, text, onClick, isDarkMode }) => {
  return (
    <div
        className={`w-full flex flex-row gap-3 items-center px-2 py-3 cursor-pointer 
        ${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-300 text-gray-700'} 
        rounded transition-colors duration-200`}
        onClick={onClick}
    >
        {icon}
        <p>{text}</p>
    </div>
  );
};

export default ProfileDropdownItem;
