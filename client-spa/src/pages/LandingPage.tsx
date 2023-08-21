
import About from "../components/About";
import Hero from "../components/Hero";
import Notification from "../components/Newsletter";
import Navbar from "../components/navbar/navbar";


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