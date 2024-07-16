import React, { useState } from 'react';
import Logo from '../assets/logo4.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { SideBarLinks } from './NavBarElements';
import { BsMoon, BsChevronDown, BsChevronUp, BsSun, BsList } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { SignOut } from '../auth_utils/actions/Actions';
import { auth } from '../auth_utils/firebaseConfig';
import { motion, AnimatePresence } from 'framer-motion';

interface SideBarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ toggleDarkMode, isDarkMode }): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const userInitial = user?.displayName?.charAt(0) || 'A';
  const darkModeClass = isDarkMode ? 'dark text-color-dark' : 'light text-color-light';
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(SignOut()).then(() => {
      navigate('/');
    });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <div className={`fixed top-5 left-0 w-full z-40`}>
      {/* Desktop version */}
      <div className='hidden md:block'>
        <div className='flex flex-row'>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isVisible ? 'auto' : 0, opacity: isVisible ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={`p-3 overflow-hidden shadow-xl max-w-[1300px] mx-auto bg-white rounded-full ${darkModeClass} border-[2px] border-white items-center`}
          >
            <div className='flex gap-5 justify-center items-center'>
              <img className='w-[200px]' src={Logo} alt="" />
              {SideBarLinks.map((link) => (
                <NavLink
                  to={link.path}
                  key={link.title}
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl text-black font-medium leading-tight border-2 border-blue-700 hover:border-gray-200 bg-white p-4 rounded-3xl cursor-pointer"
                      : "text-xl font-medium leading-tight hover:bg-white border-2 border-transparent hover:border-blue-700 hover:text-black hover:rounded-3xl p-4 rounded-3xl cursor-pointer"
                  }
                >
                  <div className='flex flex-row justify-center items-center gap-2'>
                    {link.icon}
                    {link.title}
                  </div>
                </NavLink>
              ))}
              <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-full border-transparent hover:bg-[#00df9a] hover:text-white hover:border-blue-800">
                {isDarkMode ? <BsSun /> : <BsMoon />}
              </button>
              <button onClick={handleSignOut} className='text-xl font-medium p-3 border-2 rounded-full border-transparent hover:bg-white hover:border-blue-500 hover:text-black'>
                Logout
              </button>
              <div className='flex items-center justify-center h-12 w-12 rounded-full bg-slate-300 text-xl font-medium text-gray-700 cursor-pointer'>
                {userInitial}
              </div>
            </div>
          </motion.div>
          <div className='flex items-center p-2'>
            <button onClick={toggleVisibility} className={`text-xl p-2 border-[3px] rounded-full hover:border-blue-700 ${isDarkMode ? 'text-white' : 'text-black hover:bg-white'}`}>
              {isVisible ? <BsChevronUp /> : <BsChevronDown />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className='md:hidden'>
        <div className='bg-white shadow-md'>
          <div className='px-4 py-2 flex justify-between items-center'>
            <img className='w-[150px]' src={Logo} alt="" />
            <button onClick={toggleMobileMenu}>
              <BsList size={24} />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className='bg-white shadow-md overflow-hidden'
            >
              <div className='px-4 py-2'>
                {SideBarLinks.map((link) => (
                  <motion.div key={link.title} variants={itemVariants}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? "block text-sm font-medium text-black bg-gray-200 px-3 py-2 rounded-md my-1"
                          : "block text-sm font-medium text-gray-600 hover:text-black px-3 py-2 my-1"
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className='flex items-center gap-2'>
                        {link.icon}
                        {link.title}
                      </div>
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants} className='flex items-center justify-between mt-2'>
                  <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200">
                    {isDarkMode ? <BsSun /> : <BsMoon />}
                  </button>
                  <button onClick={handleSignOut} className='text-sm font-medium text-gray-600 hover:text-black px-3 py-2'>
                    Logout
                  </button>
                  <div className='flex items-center justify-center h-8 w-8 rounded-full bg-slate-300 text-sm font-medium text-gray-700'>
                    {userInitial}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SideBar;