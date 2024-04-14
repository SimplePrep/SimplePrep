import React from 'react'
import Logo from '../assets/logo2.png'
import { NavLink } from 'react-router-dom'
import { SideBarLinks } from './SideBarElements'
import { logout } from '../actions/auth'
import {connect} from 'react-redux'

const userFullName = "Alijon Karimberdiev";

interface SideBarProps {
    logout: ()=> void;
    isAuthenticated: boolean;
}

const SideBar: React.FC<SideBarProps> = ({logout, isAuthenticated}):React.ReactElement => {
    const userInitial = userFullName.charAt(0);
  return (
    <div className='shadow-xl sticky top-0 font-roboto  max-w-[1600px] mx-auto z-10 bg-black  shadow-teal-300 rounded-2xl'>
        <div className='flex gap-5 items-center justify-center'>
            <img className='my-5 w-[200px]' src={Logo} alt="" />
            {SideBarLinks.map((link) => (
                 <NavLink
                 to={link.path}
                 key={link.title}
                 className={({ isActive }) => isActive ? "text-xl font-medium text-white leading-tight bg-teal-500 text-white p-3 mx-4 mt-2 rounded-2xl cursor-pointer" : "text-xl font-medium text-white leading-tight hover:bg-teal-300 hover:text-black hover:rounded-2xl  p-3 mx-4 mt-2 rounded-2xl cursor-pointer"}>
                  <div className='flex flex-row items-center gap-3'>
                      {link.icon}
                      {link.title}
                  </div>
              </NavLink>
            ))}
            <div className='flex items-center justify-center h-12 w-12 rounded-full bg-slate-300 text-xl font-medium text-gray-700 cursor-pointer'>
                {userInitial}
            </div>
        </div>
    </div>
  )
}

interface AuthState {
    isAuthenticated: boolean;
}
interface RootState {
    auth: AuthState;
}
const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(SideBar)