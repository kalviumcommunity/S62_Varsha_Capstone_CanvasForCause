import React from 'react';
import { Link } from 'react-router-dom';
import HeroCanvas from './HeroCanvas';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden ">
        <HeroCanvas />
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-purple to-blue-500 bg-clip-text text-transparent">
                Turn Your Art Into Connection
                </h1>
                
                <p className="text-lg md:text-lg max-w-2xl mb-8 text-gray-900">
                CanvasForCause is a digital platform that bridges art and emotion,
                creating a space where your creative expression becomes a medium for
                connection, storytelling, and personal growth.
                </p>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <Link to="/signup" className="btn bg-purple hover:shadow-purple/30">Start Creating</Link>
                    <button className="btn btn-secondary bg-lavender">Explore Gallery</button>
                </div>
                
            </div>
        </div>
    </section>
  );
};

export default Hero;
