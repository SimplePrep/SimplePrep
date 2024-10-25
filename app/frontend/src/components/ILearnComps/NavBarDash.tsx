import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFire} from 'react-icons/fa';
import { IoClose, IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsMoon, BsSun, BsList, BsPatchQuestion, BsDiscord } from 'react-icons/bs';
import { AppDispatch } from '../store';
import { SignOut } from '../auth_utils/actions/Actions';
import { auth } from '../auth_utils/firebaseConfig';
import Logo from '../assets/logo-original.png';
import LogoWhite from '../assets/logo-white-bg.png';
import { SideBarLinks } from './NavBarElements';
import CalendarStreak from './utils/tools/sidebar/CalendarStreak';
import AccountSettingsPopup from './utils/tools/sidebar/AccountSettings';
import { SlUser } from "react-icons/sl";
import { LuLogOut } from "react-icons/lu";
import ProfileDropdownItem from './utils/tools/sidebar/ProfileDropDown';
import { RiSparkling2Fill } from 'react-icons/ri';
import UpgradePlanProps from './utils/tools/sidebar/UpgradePlans';
import SupportForm from './utils/tools/sidebar/SupportForm';

type Notification = {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  read: boolean;
};

const dummyNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    message: 'New feature available: Dark mode!',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    message: 'Your subscription will expire in 3 days.',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    read: false,
  },
  {
    id: '3',
    type: 'error',
    message: 'Failed to sync data. Please try again.',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    read: true,
  },
  // More dummy notifications...
];

interface SideBarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ toggleDarkMode, isDarkMode }): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const userInitial = user?.displayName?.charAt(0) || 'A';
  const darkModeClass = isDarkMode ? 'bg-[#1d263b] text-color-dark transition-colors duration-300 border-slate-600' : 'text-color-light transition-colors duration-300 border-slate-300';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isAccountSettingsVisible, setIsAccountSettingsVisible] = useState(false);
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
  const [isUpgradePlanVisible, setIsUpgradePlanVisible] = useState(false);
  const [isSupportFormVisible, setIsSupportFormVisible] = useState(false);

  useEffect(() => {
    const calculateStreak = () => {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1); // 2 days ago
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setStreak(diffDays);
    };

    calculateStreak();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotifications(dummyNotifications);
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleSignOut = () => {
    dispatch(SignOut()).then(() => {
      navigate('/');
    });
  };

  const toggleUpgradePlan = () => {
    setIsUpgradePlanVisible(!isUpgradePlanVisible);
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const toggleAccountSettings = () => {
    setIsAccountSettingsVisible(!isAccountSettingsVisible);
  };

  const toggleSupportForm = () => {
    setIsSupportFormVisible(!isSupportFormVisible);
  }

  const toggleUserDropdown = () => {
    setIsUserDropdownVisible(!isUserDropdownVisible);
  };

  const handleDiscord = () => {
    window.open('https://discord.gg/HgKAgAhZZq', '_blank');
  };

  // Pagination logic
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);
  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  return (
    <div className={`fixed left-0 w-full z-40 font-nunito bg-inherit`}>
      {/* Desktop version */}
      <div className='hidden md:block'>
        <div className='w-full flex flex-row'>
          <div className={`w-full px-5 flex ${darkModeClass} items-center justify-between border-b-[0.5px]`}>
            <div className='flex gap-5 justify-center items-center'>
              {isDarkMode ? <img className='w-[200px]' src={LogoWhite} alt="SimplePrep Logo" /> : <img className='w-[200px]' src={Logo} alt="" />}
            </div>
            <div className='flex gap-5 justify-center items-center'>
              {SideBarLinks.map((link) => (
                <NavLink
                  to={link.path}
                  key={link.title}
                  className={({ isActive }) => {
                    const activeClass = isActive
                      ? `text-lg font-bold leading-tight border-b-[2.5px] border-blue-600 px-4 py-5 cursor-pointer ${isDarkMode ? 'text-white' : 'text-[#001a72]'}`
                      : `text-lg font-bold leading-tight border-b-[2.5px] border-transparent px-4 py-5 cursor-pointer ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#001a72]'}`
                    return activeClass;
                  }}
                >
                  {({ isActive }) => (
                    <div className='flex flex-row justify-center items-center gap-2'>
                      <span style={{ color: isDarkMode ? (isActive ? 'white' : '#cbd5e1') : (isActive ? '#001a72' : '#1161fb') }}>
                        {link.icon}
                      </span>
                      {link.title}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <button className='flex flex-row items-center gap-3 bg-blue-600 p-2 rounded-md hover:bg-blue-700' onClick={toggleUpgradePlan}>
                <RiSparkling2Fill 
                  size={25} 
                  className='animate-blink' 
                  color='white'
                />
                <p className='text-white'>Upgrade</p>
              </button>
              <div className='relative'>
                <button
                  className={`flex flex-row gap-1 p-2 border-[1px] rounded-md transition-colors duration-200 ${
                    isCalendarVisible
                      ? isDarkMode
                        ? 'bg-slate-600 border-white text-white'
                        : 'bg-slate-200 border-slate-400'
                      : 'border-transparent'
                  } ${
                    !isCalendarVisible && (
                      isDarkMode
                        ? 'hover:bg-slate-600 hover:border-white hover:text-white'
                        : 'hover:bg-slate-200 hover:border-slate-400'
                    )
                  }`}
                  onClick={toggleCalendar}
                >
                  <FaFire size={20} color={'#ffb800'} />
                  {streak} days
                </button>

                {isCalendarVisible && (
                  <div className={`absolute right-0 mt-5 border-[1px] ${
                    isDarkMode
                      ? 'bg-[#1d263b] text-white border-slate-400'
                      : 'bg-white text-gray-700 border-slate-300'
                  } shadow-lg rounded-lg `}>
                    <CalendarStreak streak={streak} isDarkMode={isDarkMode} />
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className={`p-2 border-[1px] rounded-md transition-colors duration-200 ${
                    showNotifications
                      ? isDarkMode
                        ? 'bg-slate-600 border-white text-white'
                        : 'bg-slate-200 border-slate-400'
                      : 'border-transparent'
                  } ${
                    !showNotifications && (
                      isDarkMode
                        ? 'hover:bg-slate-600 hover:border-white hover:text-white'
                        : 'hover:bg-slate-200 hover:border-slate-400'
                    )
                  }`}
                  onClick={toggleNotifications}
                >
                  <IoNotificationsOutline size={25} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 h-3 w-3 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className={`absolute right-0 mt-5 w-80 border-[1px] ${
                    isDarkMode
                      ? 'bg-[#1d263b] text-white border-slate-400'
                      : 'bg-slate-100 text-gray-700 border-slate-300'
                  } shadow-lg rounded-lg p-4 `}>
                    <div className='flex items-center justify-between mb-4'>
                      <h3 className="font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-blue-500 hover:text-blue-600"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    {notifications.length > 0 ? (
                      <ul className="space-y-2">
                        {currentNotifications.map(notification => (
                          <li
                            key={notification.id}
                            className={`p-2 rounded flex items-start ${
                              isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-100'
                            } cursor-pointer`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            )}
                            <div className={`flex-grow ${notification.read ? 'ml-4' : ''}`}>
                              <p className={`font-medium ${
                                notification.type === 'error' ? 'text-red-500' :
                                  notification.type === 'warning' ? 'text-yellow-500' :
                                    'text-blue-500'
                              }`}>
                                {notification.message}
                              </p>
                              <p className="text-xs mt-1 text-gray-500">
                                {format(notification.timestamp, 'MMM d, yyyy h:mm aa')}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className='text-center text-sm mt-1'>
                        No notifications at the moment.
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 text-sm rounded ${
                          currentPage === 1 ? 'text-gray-400' : 'text-blue-500 hover:text-blue-600'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 text-sm rounded ${
                          currentPage === totalPages ? 'text-gray-400' : 'text-blue-500 hover:text-blue-600'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={toggleDarkMode} className="text-lg p-2 border-2 rounded-full border-transparent hover:bg-[#00df9a] hover:text-white hover:border-blue-800">
                {isDarkMode ? <BsSun /> : <BsMoon />}
              </button>
              <div className='relative'>
                <button onClick={toggleUserDropdown} className='flex items-center justify-center h-8 w-8 rounded-full bg-slate-300 text-xl font-medium text-gray-700 cursor-pointer'>
                  {userInitial}
                </button>
                {isUserDropdownVisible && (
                  <div className={`absolute right-0 mt-6 w-80 border-[1px] ${
                    isDarkMode ? 'bg-[#1d263b] text-white border-slate-400' : 'bg-slate-100 text-gray-700 border-slate-300'
                  } shadow-lg rounded-lg`}>
                    <div className="mb-2 p-2">
                      <p className="font-medium">{auth.currentUser?.displayName}</p>
                      <p className="text-sm text-gray-500">{auth.currentUser?.email}</p>
                    </div>
                    <hr className="border-slate-500" />
                    <div className="flex flex-col gap-3">
                      <ProfileDropdownItem
                        icon={<SlUser size={20} />}
                        text="My profile"
                        onClick={toggleAccountSettings}
                        isDarkMode={isDarkMode}
                      />
                      <ProfileDropdownItem
                        icon={<BsPatchQuestion size={20} />}
                        text="Help & Support"
                        onClick={toggleSupportForm}
                        isDarkMode={isDarkMode}
                      />
                      <ProfileDropdownItem
                        icon={<IoSettingsOutline size={20} />}
                        text="Personal Settings"
                        onClick={toggleAccountSettings}
                        isDarkMode={isDarkMode}
                      />
                      <ProfileDropdownItem 
                        icon = {<BsDiscord size={20}/>}
                        text="Discord"
                        onClick={handleDiscord}
                        isDarkMode={isDarkMode}
                      />
                      <ProfileDropdownItem
                        icon={<LuLogOut size={20} />}
                        text="Log out"
                        onClick={handleSignOut}
                        isDarkMode={isDarkMode}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className='md:hidden'>
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md flex justify-between items-center px-4 py-2`}>
          <img className='w-[150px]' src={isDarkMode ? LogoWhite : Logo} alt="SimplePrep Logo" />
          <button onClick={toggleMobileMenu} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <BsList size={24} />
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  <img className='w-[150px]' src={isDarkMode ? LogoWhite : Logo} alt="SimplePrep Logo" />
                  <div className='flex flex-row gap-3'>
                  <button
                      onClick={toggleNotifications}
                      className={`relative p-2 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <IoNotificationsOutline size={25} />
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  <button onClick={toggleMobileMenu} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <IoClose size={24} />
                  </button>
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                  {SideBarLinks.map((link) => (
                    <NavLink
                      key={link.title}
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center p-4 ${isActive 
                          ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800') 
                          : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.title}
                    </NavLink>
                  ))}
                    <button className={`flex flex-row items-center gap-3  p-4 rounded-md hover:bg-blue-700 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`} onClick={toggleUpgradePlan}>
                      <RiSparkling2Fill 
                        size={25} 
                        className='animate-blink' 
                        color=''
                      />
                      <p className=''>Upgrade</p>
                    </button>
                </div>
                <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center h-10 w-10 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} mr-3`}>
                        {userInitial}
                      </div>
                      <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{user?.displayName || 'User'}</span>
                    </div>
                    
                    <button
                      onClick={toggleDarkMode}
                      className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'}`}
                    >
                      {isDarkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={toggleCalendar}
                      className={`flex items-center justify-center p-2 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <FaFire size={20} color="#ffb800" className="mr-2" />
                      <span>{streak} days</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className={`py-2 px-4 rounded ${
                        isDarkMode 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
              {isCalendarVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-4 w-11/12 max-w-md`}>
                    <CalendarStreak streak={streak} isDarkMode={isDarkMode} />
                    <button onClick={toggleCalendar} className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Close
                    </button>
                  </div>
                </div>
              )}
              {showNotifications && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-4 w-11/12 max-w-md`}>
                    <div className='flex items-center justify-between mb-4'>
                      <h3 className="font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-blue-500 hover:text-blue-600"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    {notifications.length > 0 ? (
                      <ul className="space-y-2">
                        {currentNotifications.map(notification => (
                          <li
                            key={notification.id}
                            className={`p-2 rounded flex items-start ${
                              isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-100'
                            } cursor-pointer`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            )}
                            <div className={`flex-grow ${notification.read ? 'ml-4' : ''}`}>
                              <p className={`font-medium ${
                                notification.type === 'error' ? 'text-red-500' :
                                  notification.type === 'warning' ? 'text-yellow-500' :
                                    'text-blue-500'
                              }`}>
                                {notification.message}
                              </p>
                              <p className="text-xs mt-1 text-gray-500">
                                {format(notification.timestamp, 'MMM d, yyyy h:mm aa')}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className='text-center text-sm mt-1'>
                        No notifications at the moment.
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 text-sm rounded ${
                          currentPage === 1 ? 'text-gray-400' : 'text-blue-500 hover:text-blue-600'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 text-sm rounded ${
                          currentPage === totalPages ? 'text-gray-400' : 'text-blue-500 hover:text-blue-600'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                    <button onClick={toggleNotifications} className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Account Settings Popup */}
      <AccountSettingsPopup
        isVisible={isAccountSettingsVisible}
        onClose={toggleAccountSettings}
        isDarkMode={isDarkMode}
      />
      <SupportForm 
        isOpen={isSupportFormVisible}  // Changed 'isVisible' to 'isOpen'
        onClose={toggleSupportForm}
        theme={isDarkMode ? 'dark' : 'light'}  // Changed 'isDarkMode' to 'theme'
      />
      <UpgradePlanProps 
        isVisible={isUpgradePlanVisible}
        onClose={toggleUpgradePlan}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default SideBar;
