import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  useEffect(() => {
    const ctaSection = document.querySelector('.cta');
    
    if (ctaSection) {
      const animation = gsap.fromTo(
        '.cta-content', 
        { opacity: 0, y: 30 }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaSection,
            start: 'top 80%',
          }
        }
      );
      return () => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
      };
    }
  }, []);

  return (
    <section className="cta py-12 bg-gradient-to-r from-purple to-teal text-white text-center relative overflow-hidden">
      <div className="cta-bg absolute top-0 left-0 w-full h-full opacity-10 z-0">
        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,50 Q200,100 350,50 T650,50 T950,50 V350 Q800,300 650,350 T350,350 T50,350 Z" fill="white" opacity="0.1" />
          <path d="M50,450 Q200,500 350,450 T650,450 T950,450 V750 Q800,700 650,750 T350,750 T50,750 Z" fill="white" opacity="0.1" />
        </svg>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="cta-content max-w-xl mx-auto">
          <h2 className="text-3xl font-semibold mb-2 tracking-tight">Ready to express yourself through art?</h2>
          <p className="text-base mb-6 opacity-90">
            Join our creative community today and start your journey of self-expression, connection, and personal growth.
          </p>
          <div className="cta-buttons flex justify-center gap-4">
            <a 
              href="/join-community" 
              className="btn bg-white text-purple px-6 py-2 rounded-full text-sm font-medium hover:bg-lavender"
              aria-label="Join our creative community"
              role="button"
            >
              Join Our Creative Community
            </a>
            <a 
              href="/gallery" 
              className="btn btn-secondary bg-transparent border border-white text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10"
              aria-label="Explore our gallery"
              role="button"
            >
              Explore the Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;