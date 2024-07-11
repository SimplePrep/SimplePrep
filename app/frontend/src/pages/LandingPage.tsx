import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../components/store';
import Navbar from "../components/Landing/navbar";
import { Outlet } from "react-router-dom";
import About from '../components/Landing/About';
import Hero from '../components/Landing/Hero';
import Testimonials from '../components/Landing/Testimonials';
import Notification from '../components/Landing/Newsletter';
import FAQ from '../components/Landing/FAQ';
import Footer from '../components/Landing/Footer';

export const LandingPage = () => {
  return(
      <>
          <About/>
          <Hero/>
          <Notification/>
          <Testimonials/>
          <FAQ/>
      </>
  )
}
const Layout = () => {
  const {  isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Outlet />
      <Footer/>
    </>
  );
};

export default Layout;
