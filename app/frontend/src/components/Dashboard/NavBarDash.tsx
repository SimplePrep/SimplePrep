import React from 'react';
import Logo from '../assets/logo4.png';
import { NavLink, useNavigate} from 'react-router-dom';
import { SideBarLinks } from './NavBarElements';
import { BsMoon } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { SignOut } from '../utils/actions/authActions';

interface SideBarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ toggleDarkMode, isDarkMode }): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const userInitial = user?.displayName?.charAt(0) || 'A';
  const darkModeClass = isDarkMode ? 'dark text-color-dark' : 'light text-color-light';

  const handleSignOut = () => {
    dispatch(SignOut()).then(() => {
        navigate('/');
    });
  };

  return (
    <div className={`p-1 shadow-xl sticky top-0 max-w-[1300px] mx-auto z-10 shadow-blue-300 bg-white rounded-3xl ${darkModeClass} border-2 border-white`}>
      <div className='flex gap-3 items-center justify-center'>
        <img className='my-5 w-[200px]' src={Logo} alt="" />
        {SideBarLinks.map((link) => (
          <NavLink
            to={link.path}
            key={link.title}
            className={({ isActive }) =>
              isActive
                ? "text-xl text-black font-medium leading-tight border-2 border-blue-700 hover:border-gray-200 bg-white p-4 mx-4 mt-2 rounded-3xl cursor-pointer"
                : "text-xl font-medium leading-tight hover:bg-white border-2 hover:border-blue-700 hover:text-black hover:rounded-3xl p-4 mx-4 mt-2 rounded-3xl cursor-pointer"
            }
          >
            <div className='flex flex-row items-center gap-3'>
              {link.icon}
              {link.title}
            </div>
          </NavLink>
        ))}
        <button onClick={toggleDarkMode} className='text-xl p-3 border-2 rounded-2xl hover:bg-white hover:border-blue-700'>
          <BsMoon />
        </button>
        <button onClick={handleSignOut} className='text-xl font-medium p-3 border-2 rounded-2xl hover:bg-white hover:border-blue-500 hover:text-black'>
          Logout
        </button>
        <div className='flex items-center justify-center h-12 w-12 rounded-full bg-slate-300 text-xl font-medium text-gray-700 cursor-pointer'>
          {userInitial}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
