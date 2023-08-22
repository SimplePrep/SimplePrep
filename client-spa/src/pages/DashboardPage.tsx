import React from 'react'
import SideBar from '../components/Dashboard/sidebar/SideBar'
import Contents from '../components/Dashboard/Contents'
import Tutorials from '../components/Dashboard/Tutorials'

const DashboardPage = () => {
  return (
    <div className='w-full h-full bg-green-300'>
        <div className='w-full h-full rounded-lg p-10 '>
            <div className='w-full h-full rounded-2xl bg-slate-200'>
                <div className='flex flex-row gap-10'>
                    <div className='w-[300px] border-r h-[92.5vh]'>
                        <SideBar/>
                    </div>
                    <div className='flex-grow'>
                        <Tutorials/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardPage