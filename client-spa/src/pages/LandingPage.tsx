import React from "react";
import About from "../components/Landing/About";
import Hero from "../components/Landing/Hero";
import Notification from "../components/Landing/Newsletter";


import Testimonials from "../components/Landing/Testimonials";
import FAQ from "../components/Landing/FAQ";
import Navbar from "../components/Landing/navbar";


const LandingPage = () => {
    return(
        <>
            <Navbar/>
            <About/>
            <Hero/>
            <Notification/>
            <Testimonials/>
            <FAQ/>
        </>
    )
}

export default LandingPage;