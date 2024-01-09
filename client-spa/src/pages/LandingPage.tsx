import React, {useEffect} from "react";
import {connect} from 'react-redux';
import { checkAuthenticated, load_user } from "../components/actions/auth";
import About from "../components/Landing/About";
import Hero from "../components/Landing/Hero";
import Notification from "../components/Landing/Newsletter";
import Testimonials from "../components/Landing/Testimonials";
import FAQ from "../components/Landing/FAQ";
import Navbar from "../components/Landing/navbar";
import { Outlet } from "react-router-dom";

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



const Layout = (props: any) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, []);
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}
export default connect(null, {checkAuthenticated, load_user})(Layout);