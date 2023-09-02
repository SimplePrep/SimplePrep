import React from 'react'
import SideBar from '../components/Dashboard/SideBar'

import Tutorials from '../components/Dashboard/Tutorials'
import Blogs from '../components/Dashboard/Blogs'
import Contents from '../components/Dashboard/Contents'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import APT from '../components/Dashboard/APT'

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
                            <Routes>
                                <Route path = "/*" element={<Outlet/>}>
                                    <Route path="contents" element = {<Contents/>} />
                                    <Route path="blogs" element = {<Blogs/>} />
                                    <Route path = "tutorials" element = {<Tutorials/>}/>
                                </Route>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default DashboardPage