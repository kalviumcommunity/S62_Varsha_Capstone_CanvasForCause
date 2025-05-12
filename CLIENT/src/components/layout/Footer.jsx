import React from 'react';
import { Instagram, Twitter, Mail } from 'lucide-react';

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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
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
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-teal transition-colors duration-300 text-sm">Our Mission</a></li>
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