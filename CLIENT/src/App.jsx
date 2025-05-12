import React  from 'react';
import Navbar from './components/homepage/Navbar';
import Hero from './components/homepage/Hero';
import HowItWorks from './components/homepage/HowItWorks';
import useScrollAnimation from './hooks/useScrollAnimation';

function App() {
  useScrollAnimation();
  return(
    <>
      <Navbar />
      <Hero />
      <HowItWorks/>
    </>
  )
}

export default App