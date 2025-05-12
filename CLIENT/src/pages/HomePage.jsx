import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import Navbar from "../components/homepage/Navbar";
import Hero from "../components/homepage/Hero";
import HowItWorks from "../components/homepage/HowItWorks";
import Features from "../components/homepage/PlatformFeatures";
import Testimonials from "../components/homepage/Testimonials";
import CTA from "../components/homepage/CTA";
import Footer from "../components/layout/Footer";

function HomePage(){
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

export default HomePage;