import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import Navbar from "../components/LandingPage/Navbar"
import Hero from "../components/LandingPage/Hero";
import HowItWorks from "../components/LandingPage/HowItWorks";
import Features from "../components/LandingPage/PlatformFeatures";
import Testimonials from "../components/LandingPage/Testimonials";
import CTA from "../components/LandingPage/CTA";
import Footer from "../components/layout/Footer";

function LandingPage(){
    useScrollAnimation();

    return(
        <>
        <Navbar/>
        <Hero/>
        <HowItWorks/>
        <Features/>
        <Testimonials/>
        <CTA/>
        <Footer/>
        </>
    )
}

export default LandingPage;