import React, { useState } from 'react';
import HeroCanvas from '../homepage/HeroCanvas';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false
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
    // console.log('Login form submitted:', formData);

    setFormData({
    identifier: '',
    password: '',
    rememberMe: false
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
          <h1 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">Welcome Home</h1>
          <p className="text-xl text-charcoal mb-4">We've kept your canvas warm and your colors bright. Your creative community has been waiting for your return.</p>        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 lg:pl-12">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-charcoal">Log In</h2>
              <p className="text-charcoal/70 mt-1">Access your creative workspace</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="identifier" className="block text-charcoal font-medium mb-1">Email or Username</label>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
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
                  placeholder=""
                  required
                />
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 border border-lavender rounded focus:ring-purple text-purple"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-charcoal">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="/forgot-password" className="text-sm text-purple hover:text-purple/80 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-purple hover:bg-purple/90 text-white font-semibold py-3 px-7 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-purple/20 hover:-translate-y-0.5"
                >
                  Log In
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-charcoal">
                Don't have an account?{" "}
                <a href="/signup" className="text-purple font-semibold hover:text-purple/80 transition-colors">
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;