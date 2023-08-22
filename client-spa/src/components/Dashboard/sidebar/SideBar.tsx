import React from 'react'
import Logo from '../../assets/logo2.png'
import {TbLayoutDashboard} from 'react-icons/tb'
import {IoNotificationsCircleOutline} from 'react-icons/io5'
import {MdOutlineAssignment} from 'react-icons/md'
import {VscBook} from 'react-icons/vsc'
import {BsDiscord} from 'react-icons/bs'
import {GiProgression} from 'react-icons/gi'
import {MdOutlineContactSupport} from 'react-icons/md'
import {AiOutlineSetting} from 'react-icons/ai'
import {PiSignOutFill} from 'react-icons/pi'
const SideBar = () => {
  return (
    <div className='w-full bg-white h-full rounded-2xl'>
        <div className='flex  flex-col gap-4'>
            <img className='my-5' src={Logo} alt="" />
            <hr className="h-1 border-0 border-t border-gray-300 my-4"/>
            <div className='flex flex-row p-3 mx-4  items-center gap-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                <TbLayoutDashboard size={35} color='green' />
                <p className='text-xl font-medium text-slate-500'>Dashboard</p>
            </div>
            <div className='flex flex-row p-3 mx-4  items-center gap-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                <IoNotificationsCircleOutline size={35} color='green' />
                <p className='text-xl font-medium text-slate-500'>Notifications</p>
            </div>
            <hr className="h-1 border-0 border-t border-gray-300 my-4"/>
            <div className='flex flex-row p-3 mx-4  items-center gap-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                <MdOutlineAssignment size={35} color='green' />
                <p className='text-xl font-medium text-slate-500'>Contents</p>
            </div>
            <div className='flex flex-row p-3 mx-4  items-center gap-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                <VscBook size={35} color='green' />
                <p className='text-xl font-medium text-slate-500'>Tutorials</p>
            </div>
            <div className='flex flex-row p-3 mx-4  items-center gap-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                <BsDiscord size={35} color='green' />
                <p className='text-xl font-medium text-slate-500'>Our Discord Channel</p>
            </div>
            <div className='flex flex-row p-3 mx-4  items-center gap-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                <GiProgression size={35} color='green' />
                <p className='text-xl font-medium text-slate-500'>Track your progress</p>
            </div>
            <hr className="h-1 border-0 border-t border-gray-300 my-4"/>
            <div className='flex flex-row p-3  mx-4  items-center gap-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                <MdOutlineContactSupport size={35} color='green' />
                <p className='text-xl font-medium text-slate-500'>Help</p>
            </div>
            <div className='flex flex-row p-3  mx-4  items-center gap-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                <AiOutlineSetting size={35} color='green' />
                <p className='text-xl font-medium text-slate-500'>Settings</p>
            </div>
            <div className='flex flex-row p-3  mx-4  items-center gap-2 hover:bg-slate-200 hover:rounded-lg cursor-pointer'>
                <PiSignOutFill size={35} color='green' />
                <p className='text-xl font-medium text-slate-500'>Sign Out</p>
            </div>
        </div>
    </div>
  )
}

export default SideBar