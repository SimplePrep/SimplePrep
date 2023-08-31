import React from 'react'
import Logo from '../assets/logo2.png'
import {TbLayoutDashboard} from 'react-icons/tb'
import {IoNotificationsCircleOutline} from 'react-icons/io5'
import {MdOutlineAssignment} from 'react-icons/md'
import {VscBook} from 'react-icons/vsc'
import {BsDiscord} from 'react-icons/bs'
import {GiProgression} from 'react-icons/gi'
import {MdOutlineContactSupport} from 'react-icons/md'
import {AiOutlineSetting} from 'react-icons/ai'
import {PiSignOutFill} from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { SideBarLinks } from './SideBarElements'



const SideBar = () => {
  return (
    <div className='w-full bg-white h-full rounded-2xl'>
        <div className='flex  flex-col gap-4'>
            <img className='my-5' src={Logo} alt="" />
            <hr className="h-1 border-0 border-t border-gray-300 my-4"/>
            {SideBarLinks.map((link) => (
                <Link to={link.path} key={link.title}>
                    <div className='flex flex-row p-3 mx-4 mt-2 items-center gap-3 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                        {link.icon}
                        <p className='text-xl font-medium text-slate-500'>{link.title}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SideBar