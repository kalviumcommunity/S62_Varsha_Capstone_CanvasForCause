import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail } from 'lucide-react';
import { FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <section className="bg-charcoal text-white pt-20 pb-10">
      <div className="container mx-auto max-w-6xl px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 pl-4 md:pl-8 lg:pl-12">
          {/* About Section */}
          <div className="text-center lg:text-left">
            <a href="#" className="inline-block text-2xl font-bold mb-5">
              CanvasForCause
            </a>
            <p className="text-white/70 mb-6 text-base">
              A digital platform integrating technology and art for self-expression and connection. Join our community and share your creative journey.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple transition-colors duration-300">
                <FaPinterestP size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple transition-colors duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Platform Links */}
          <div className="md:ml-16 text-center lg:text-left">
            <h4 className="text-base font-semibold mb-5">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Features</a></li>
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Community Gallery</a></li>
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Virtual Canvas</a></li>
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Dashboard</a></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div className="md:ml-12 text-center lg:text-left">
            <h4 className="text-base font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about-us" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">About Us</Link></li>
              <li><Link to="/about-us#mission" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Our Mission</Link></li>
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Team</a></li>
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Careers</a></li>
            </ul>
          </div>
          
          {/* Resources Links */}
          <div className="md:ml-10 text-center lg:text-left">
            <h4 className="text-base font-semibold mb-5">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">FAQs</a></li>
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-white/70 text-sm px-4">
          &copy; {new Date().getFullYear()} CanvasForCause. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Footer;