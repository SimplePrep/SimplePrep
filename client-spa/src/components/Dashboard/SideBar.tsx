import React from 'react'
import Logo from '../assets/logo2.png'
import { Link, NavLink } from 'react-router-dom'
import { SideBarLinks } from './SideBarElements'



const SideBar = () => {
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
        </div>
    </div>
  )
}

export default SideBar