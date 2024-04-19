import React, { useState } from 'react';
import Contents from '../components/Dashboard/Contents'
import {  Outlet, Route, Routes } from 'react-router-dom'
import NavBarDash from '../components/Dashboard/NavBarDash';

interface DashboardPageProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const DashboardPage:React.FC<DashboardPageProps> = ({toggleDarkMode, isDarkMode}) => {
  const darkModeClass = isDarkMode ? 'grid-background-dark' : 'grid-background-light';

  return (
        <div className={`w-full h-full ${darkModeClass} font-montserrat`}>
            <NavBarDash toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>
            <div>
              <Outlet/>
            </div>
        </div>
  )
}

export default DashboardPage;