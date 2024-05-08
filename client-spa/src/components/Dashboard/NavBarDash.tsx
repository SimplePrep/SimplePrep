import React, { useContext } from 'react'
import Logo from '../assets/logo2.png'
import { NavLink } from 'react-router-dom'
import { SideBarLinks } from './NavBarElements'
import { logout } from '../actions/auth'
import {connect} from 'react-redux'
import { BsMoon } from 'react-icons/bs'
import AuthContext from '../utils/AuthContext'

const userFullName = "Alijon Karimberdiev";

interface SideBarProps {
    toggleDarkMode: () => void;
    isDarkMode: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ toggleDarkMode, isDarkMode}):React.ReactElement => {
    const {SignOut, user} = useContext(AuthContext);
    const userInitial = user?.displayName?.charAt(0) || 'A';
    const darkModeClass = isDarkMode ? 'dark text-color-dark' : 'light text-color-light';
  return (
        <div className={`shadow-xl sticky top-0  max-w-[1600px] mx-auto z-10  shadow-teal-300 bg-white rounded-2xl ${darkModeClass}`}>
            <div className='flex gap-5 items-center justify-center'>
                <img className='my-5 w-[200px]' src={Logo} alt="" />
                {SideBarLinks.map((link) => (
                    <NavLink
                    to={link.path}
                    key={link.title}
                    className={({ isActive }) => isActive ? "text-xl font-medium leading-tight bg-teal-500  p-3 mx-4 mt-2 rounded-2xl cursor-pointer" : "text-xl font-medium  leading-tight hover:bg-teal-300 hover:text-black hover:rounded-2xl  p-3 mx-4 mt-2 rounded-2xl cursor-pointer"}>
                    <div className='flex flex-row items-center gap-3'>
                        {link.icon}
                        {link.title}
                    </div>
                </NavLink>
                ))}
                <button onClick={toggleDarkMode} className='text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500'>
                    <BsMoon/>
                </button>
                <button onClick={() => SignOut()} className='text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500'>
                    Logout
                </button>
                <div className='flex items-center justify-center h-12 w-12 rounded-full bg-slate-300 text-xl font-medium text-gray-700 cursor-pointer'>
                    {userInitial}
                </div>
            </div>
        </div>
  )
}



export default SideBar;