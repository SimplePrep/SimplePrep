import React from 'react'
import Logo from '../assets/logo2.png'
import { NavLink } from 'react-router-dom'
import { SideBarLinks } from './SideBarElements'
import { logout } from '../actions/auth'
import {connect} from 'react-redux'
import { PiSignOutFill } from "react-icons/pi";
const SignOut = {
        title: "Sign Out",
        path: '/',
        icon: <PiSignOutFill size={35} color='green' />
    }

interface SideBarProps {
    logout: ()=> void;
    isAuthenticated: boolean;
}

const SideBar: React.FC<SideBarProps> = ({logout, isAuthenticated}):React.ReactElement => {
    
  return (
    <div className='w-full bg-white h-full rounded-2xl'>
        <div className='flex  flex-col gap-4'>
            <img className='my-5' src={Logo} alt="" />
            <hr className="h-1 border-0 border-t border-gray-300 my-4"/>
            {SideBarLinks.map((link) => (
                <NavLink to={link.path} key={link.title}>
                    <div className='flex flex-row p-3 mx-4 mt-2 items-center gap-3 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                        {link.icon}
                        <p className='text-xl font-medium text-slate-500'>{link.title}</p>
                    </div>
                </NavLink>
            ))}
            <div onClick={logout} className='flex flex-row p-3 mx-4 mt-2 items-center gap-3 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                {SignOut.icon}
                <a href='/' className='text-xl font-medium text-slate-500'>{SignOut.title}</a>
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