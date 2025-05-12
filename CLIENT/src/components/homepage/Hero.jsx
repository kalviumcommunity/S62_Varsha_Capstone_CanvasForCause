import React from 'react';
import HeroCanvas from './HeroCanvas';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden ">
        <HeroCanvas />
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6 bg-gradient-to-r from-purple via-blue-500 to-teal bg-clip-text text-transparent">
                Turn Your Art Into Connection
                </h1>
                
                <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-500">
                CanvasForCause is a digital platform that bridges art and emotion,
                creating a space where your creative expression becomes a medium for
                connection, storytelling, and personal growth.
                </p>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <button className="btn">Start Creating</button>
                    <button className="btn btn-secondary">Explore Gallery</button>
                </div>
                
            </div>
        </div>
    </section>
  );
};

export default Hero;
