import React, {useContext} from 'react';
import About from "../components/Landing/About";
import Hero from "../components/Landing/Hero";
import Notification from "../components/Landing/Newsletter";
import Testimonials from "../components/Landing/Testimonials";
import FAQ from "../components/Landing/FAQ";
import Navbar from "../components/Landing/navbar";
import { Outlet } from "react-router-dom";
import  AuthContext  from '../components/utils/AuthContext';

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
    const { user, isAuthenticated } = useContext(AuthContext);
  
    // You can use isAuthenticated, user, or other context values here if needed,
    // for example, to conditionally render parts of the UI.
  
    return (
      <>
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <Outlet />
      </>
    );
  };
  
  export default Layout;