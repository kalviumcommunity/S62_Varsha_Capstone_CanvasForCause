import React  from 'react';
import Navbar from './components/homepage/Navbar';
import Hero from './components/homepage/Hero';
import HowItWorks from './components/homepage/HowItWorks';
import useScrollAnimation from './hooks/useScrollAnimation';
import Features from './components/homepage/PlatformFeatures';
import Testimonials from './components/homepage/Testimonials';
import CTA from './components/homepage/CTA';

function App() {
  useScrollAnimation();
  return(
    <>
      <Navbar />
      <Hero />
      <HowItWorks/>
      <Features/>
      <Testimonials/>
      <CTA/>
    </>
  )
}

export default App