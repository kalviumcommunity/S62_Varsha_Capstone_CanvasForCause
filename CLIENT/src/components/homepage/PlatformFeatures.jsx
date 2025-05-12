import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Feature = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      <div className="w-16 h-16 bg-lavender rounded-lg flex items-center justify-center text-purple mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-charcoal/70 mb-6">{description}</p>
      <div className="mt-auto w-full h-48 bg-lavender rounded-xl overflow-hidden flex items-center justify-center">
        <img src="https://via.placeholder.com/400x200" alt={title} />
      </div>
    </div>
  );
};

const Features = () => {
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const animations = [];
    
    fadeElements.forEach(element => {
      const anim = gsap.fromTo(
        element, 
        { opacity: 0, y: 20 }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
          }
        }
      );
      animations.push(anim);
    });
    return () => {
        animations.forEach(anim => anim.kill());
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="features" className="py-24 bg-lavender relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full z-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <path d="M150,150 C200,100 300,50 400,100 C500,150 600,100 700,150 C800,200 750,300 700,400 C650,500 700,600 650,700 C600,800 500,750 400,700 C300,650 200,700 150,650 C100,600 150,500 100,400 C50,300 100,200 150,150 Z" fill="url(#paint0_linear)" />
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="800" y2="800" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6B4EE6"/>
              <stop offset="1" stopColor="#4EC5E6"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-semibold mb-4">Platform Features</h2>
          <p className="text-lg max-w-2xl mx-auto text-charcoal/70">
            Everything you need to express, connect, and heal through art
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="fade-in">
            <Feature 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.7 13.35l-9.38-10a2 2 0 0 0-2.83-.13l-8.36 7.53a2 2 0 0 0-.15 2.83l8.17 9.13a2 2 0 0 0 2.83.13l9.38-8.2a2 2 0 0 0 .34-2.8z"></path>
                  <path d="M12.01 15V9"></path>
                  <path d="M9 12.01h6"></path>
                </svg>
              }
              title="Virtual Canvas"
              description="Create digital artwork with our intuitive drawing tools. Express yourself freely with various brushes, colors, and effects."
            />
          </div>
          
          <div className="fade-in">
            <Feature 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" y1="22" x2="4" y2="15"></line>
                </svg>
              }
              title="Community Gallery"
              description="Share your artwork with a supportive community. Engage through likes, comments, and meaningful interactions."
            />
          </div>
          
          <div className="fade-in">
            <Feature 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <path d="M17 8h.01"></path>
                  <path d="M13 8h.01"></path>
                  <path d="M9 8h.01"></path>
                </svg>
              }
              title="Storytelling"
              description="Tell the stories behind your art. Connect emotions to your creations and build deeper understanding through shared experiences."
            />
          </div>
          
          <div className="fade-in">
            <Feature 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h.01"></path>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="12" cy="13" r="3"></circle>
                  <path d="M16.5 17.5l-2.5-2.5"></path>
                  <path d="M7.5 17.5l2.5-2.5"></path>
                </svg>
              }
              title="Personalized Dashboard"
              description="Keep track of your creative journey with a customized dashboard. Monitor your activity, interactions, and saved artwork."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;