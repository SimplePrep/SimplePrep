import React from 'react';
import Contents from '../components/Dashboard/Contents'
import {  Outlet, Route, Routes } from 'react-router-dom'
import NavBarDash from '../components/Dashboard/NavBarDash';
const DashboardPage = () => {
  return (
        <div className='w-full h-full grid-background'>
            <NavBarDash/>
            <Outlet/>
        </div>
  )
}

export default DashboardPage;