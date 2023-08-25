import React from 'react'
import SideBar from '../components/Dashboard/sidebar/SideBar'

import Tutorials from '../components/Dashboard/Tutorials'
import Blogs from '../components/Dashboard/Blogs'
import Contents from '../components/Dashboard/Contents/Contents'

const DashboardPage = () => {
  return (
    <div className='w-full h-full bg-green-300'>
        <div className='w-full h-full rounded-lg p-10 '>
            <div className='w-full h-full rounded-2xl bg-white'>
                <div className='flex flex-row gap-10'>
                    <div className='w-[300px] border-r h-[92.5vh]'>
                        <SideBar/>
                    </div>
                    <div className='flex-grow'>
                        <Contents/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardPage