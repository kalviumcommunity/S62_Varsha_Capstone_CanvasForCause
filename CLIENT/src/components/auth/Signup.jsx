import React, { useState } from 'react';
import HeroCanvas from '../homepage/HeroCanvas';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    // console.log('Form submitted:', formData);
    setFormData({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false
  });
    
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Canvas */}
      <HeroCanvas />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center">
        
        {/* Left Side - Message */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left px-4 lg:pr-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">Join CanvasForCause</h1>
          <p className="text-xl text-charcoal mb-4">Unleash your creativity and connect with a community that celebrates artistic expression.</p>
          <p className="text-lg text-charcoal/80">Where every stroke tells a story, and every creation matters.</p>
        </div>
        
        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 lg:pl-12">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-charcoal">Create Account</h2>
              <p className="text-charcoal/70 mt-1">Start your creative journey with us</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-charcoal font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-full border border-lavender focus:border-purple focus:ring-2 focus:ring-purple/30 outline-none transition-all"
                    placeholder=""
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-charcoal font-medium mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-full border border-lavender focus:border-purple focus:ring-2 focus:ring-purple/30 outline-none transition-all"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-charcoal font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-full border border-lavender focus:border-purple focus:ring-2 focus:ring-purple/30 outline-none transition-all"
                  placeholder=""
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-charcoal font-medium mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-full border border-lavender focus:border-purple focus:ring-2 focus:ring-purple/30 outline-none transition-all"
                  placeholder="6+ characters"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-charcoal font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-full border border-lavender focus:border-purple focus:ring-2 focus:ring-purple/30 outline-none transition-all"
                  placeholder=""
                  required
                  minLength={6}
                />
              </div>
              
              <div className="flex items-start mt-2">
                <div className="flex items-center h-5">
                  <input
                    id="termsAgreed"
                    name="termsAgreed"
                    type="checkbox"
                    checked={formData.termsAgreed}
                    onChange={handleChange}
                    className="w-4 h-4 border border-lavender rounded focus:ring-purple text-purple"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAgreed" className="text-charcoal">
                    I agree with CanvasForCause's <a href="/terms" className="text-purple hover:underline">Terms of Service</a>, and  <a href="/privacy" className="text-purple hover:underline"> Privacy Policy</a>
                  </label>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-purple hover:bg-purple/90 text-white font-semibold py-3 px-7 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-purple/20 hover:-translate-y-0.5"
                >
                  Create Account
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-charcoal">
                Already have an account?{" "}
                <a href="/login" className="text-purple font-semibold hover:text-purple/80 transition-colors">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Signup;