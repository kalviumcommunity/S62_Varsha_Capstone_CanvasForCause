import React from 'react';
import MiniCanvas from './MiniCanvas';
import StatsCounter from './StatsCounter';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="pt-6 pb-24 bg-white">
      <div className="container mx-auto max-w-6xl px-5">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Join our creative community in three simple steps</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-8 mt-16">
          <div className="flex-1 text-center p-10 bg-white rounded-2xl shadow-[0_8px_30px_rgba(106,90,205,0.12)] transition-all duration-300 hover:-translate-y-2.5">
            <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center bg-lavender rounded-full text-purple">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </div>
            <h3 className="mb-4 text-2xl">Create</h3>
            <p className="text-base leading-relaxed text-charcoal opacity-70">
              Express yourself through our virtual canvas or upload your artwork. Let your creativity flow freely in a supportive environment.
            </p>
          </div>
          
          <div className="flex-1 text-center p-10 bg-white rounded-2xl shadow-[0_8px_30px_rgba(106,90,205,0.12)] transition-all duration-300 hover:-translate-y-2.5">
            <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center bg-lavender rounded-full text-purple">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </div>
            <h3 className="mb-4 text-2xl">Share</h3>
            <p className="text-base leading-relaxed text-charcoal opacity-70">
              Tell the story behind your creation and join our supportive community. Your art becomes a window into your emotions and experiences.
            </p>
          </div>
          
          <div className="flex-1 text-center p-10 bg-white rounded-2xl shadow-[0_8px_30px_rgba(106,90,205,0.12)] transition-all duration-300 hover:-translate-y-2.5">
            <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center bg-lavender rounded-full text-purple">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="mb-4 text-2xl">Connect</h3>
            <p className="text-base leading-relaxed text-charcoal opacity-70">
              Engage with others through art, stories, and meaningful conversations. Build connections that foster understanding and empathy.
            </p>
          </div>
        </div>
        
        <div className="shadow-[0_8px_30px_rgba(106,90,205,0.12)]">
          <MiniCanvas />
        </div>
        
        <div className="flex flex-wrap justify-around text-center mt-16">
          <StatsCounter stat={3500} label="Active Artists" />
          <StatsCounter stat={12000} label="Artworks Shared" />
          <StatsCounter stat={28000} label="Connections Made" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;