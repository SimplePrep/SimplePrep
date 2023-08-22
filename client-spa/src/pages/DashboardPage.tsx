import React from 'react'
import SideBar from '../components/sidebar/SideBar'
import Card from '../components/sidebar/Card'

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
                        <Card/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardPage