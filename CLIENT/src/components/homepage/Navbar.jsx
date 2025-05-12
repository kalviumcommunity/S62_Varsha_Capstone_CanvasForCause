import React, { useState, useEffect } from 'react';
import CanvasForCauseLogo from "/src/assets/icons/CanvasForCauseLogo.png"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md
      ${scrolled ? 'py-3 shadow-md shadow-purple/10' : 'py-5'}`}
    >
      <div className="container mx-auto max-w-6xl px-5 flex justify-between items-center">
        <a href="#" className="flex items-center font-bold text-2xl text-purple">
          <img 
            src={CanvasForCauseLogo}
            alt="CanvasForCause Logo" 
            className="mr-2.5" 
            width="36" 
            height="36" 
          />
          CanvasForCause
        </a>
        
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center">
            <li className="ml-10">
              <a href="#how-it-works" className="font-medium transition-colors hover:text-purple">How It Works</a>
            </li>
            <li className="ml-10">
              <a href="#features" className="font-medium transition-colors hover:text-purple">Features</a>
            </li>
            <li className="ml-10">
              <a href="#testimonials" className="font-medium transition-colors hover:text-purple">Community</a>
            </li>
            <li className="ml-10">
              <a href="#" className="btn">Sign Up</a>
            </li>
          </ul>
        </nav>
        
        <button 
          className="block md:hidden bg-transparent border-none text-2xl cursor-pointer text-charcoal"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          ☰
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <ul className="flex flex-col items-center">
            <li className="py-2">
              <a 
                href="#how-it-works" 
                className="font-medium transition-colors hover:text-purple"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
            </li>
            <li className="py-2">
              <a 
                href="#features" 
                className="font-medium transition-colors hover:text-purple"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
            </li>
            <li className="py-2">
              <a 
                href="#testimonials" 
                className="font-medium transition-colors hover:text-purple"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="btn" onClick={() => setMobileMenuOpen(false)}>Sign Up</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;