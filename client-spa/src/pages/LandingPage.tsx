import React from "react";
import About from "../components/Landing/About";
import Hero from "../components/Landing/Hero";
import Notification from "../components/Landing/Newsletter";

import Navbar from "../components/Landing/navbar";


const LandingPage = () => {
    return(
        <>
            <Navbar/>
            <About/>
            <Hero/>
            <Notification/>
        </>
    )
}

export default LandingPage;