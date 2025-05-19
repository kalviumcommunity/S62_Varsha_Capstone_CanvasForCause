import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeroCanvas from '../homepage/HeroCanvas';
import { validateForm } from '../../utils/validationUtils';
import authService from '../../services/authService';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
    if(serverError){
      setServerError('');
    }
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    
    // If no errors, proceed with form submission
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setServerError('');

      try{
        const userData = {
          name:formData.name,
          username:formData.username,
          email:formData.email,
          password:formData.password
        }

        // eslint-disable-next-line no-unused-vars
        const response = await authService.register(userData);
        setIsSubmitting(false);
        setFormSuccess(true);

        setFormData({
          name:'',
          username:'',
          email:'',
          password:'',
          confirmPassword:'',
          termsAgreed:false,
        });
        setTimeout(()=>{
          navigate('/login');
        }, 1500);
      }
      catch(error){
        setIsSubmitting(false);
        setServerError(error.message||'Account registration failed. Please try again');
        console.error("Registration error", error);
      }
    }
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
            
            {formSuccess && (
              <div className="mb-4 text-purple font-medium text-center">
                Signup successful! Redirecting to login page...
              </div>
            )}

            {serverError && (
              <div className="mb-4 text-red-500 font-medium text-center">
                {serverError}
              </div>
            )}
            
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
                    className={`w-full px-4 py-2.5 rounded-full border ${errors.name ? 'border-red-500' : 'border-lavender'} focus:border-purple focus:ring-2 focus:ring-purple/30 outline-none transition-all`}
                    placeholder=""
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-charcoal font-medium mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-full border ${errors.username ? 'border-red-500' : 'border-lavender'} focus:border-purple focus:ring-2 focus:ring-purple/30 outline-none transition-all`}
                    placeholder=""
                  />
                  {errors.username && (
                    <p className="mt-1 text-red-500 text-sm">{errors.username}</p>
                  )}
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
                  className={`w-full px-4 py-2.5 rounded-full border ${errors.email ? 'border-red-500' : 'border-lavender'} focus:border-purple focus:ring-2 focus:ring-purple/30 outline-none transition-all`}
                  placeholder=""
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-charcoal font-medium mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-full border ${errors.password ? 'border-red-500' : 'border-lavender'} focus:border-purple focus:ring-2 focus:ring-purple/30 outline-none transition-all`}
                  placeholder="6+ characters"
                />
                {errors.password && (
                  <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-charcoal font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-full border ${errors.confirmPassword ? 'border-red-500' : 'border-lavender'} focus:border-purple focus:ring-2 focus:ring-purple/30 outline-none transition-all`}
                  placeholder=""
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
              
              <div className="flex items-start mt-2">
                <div className="flex items-center h-5">
                  <input
                    id="termsAgreed"
                    name="termsAgreed"
                    type="checkbox"
                    checked={formData.termsAgreed}
                    onChange={handleChange}
                    className={`w-4 h-4 border ${errors.termsAgreed ? 'border-red-500' : 'border-lavender'} rounded focus:ring-purple text-purple`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAgreed" className={`${errors.termsAgreed ? 'text-red-500' : 'text-charcoal'}`}>
                    I agree with CanvasForCause's <Link to="/terms" className="text-purple hover:underline">Terms of Service</Link>, and  <Link to="/privacy" className="text-purple hover:underline"> Privacy Policy</Link>
                  </label>
                  {errors.termsAgreed && (
                    <p className="mt-1 text-red-500 text-sm">{errors.termsAgreed}</p>
                  )}
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple hover:bg-purple/90 text-white font-semibold py-3 px-7 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-purple/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-charcoal">
                Already have an account?{" "}
                <Link to="/login" className="text-purple font-semibold hover:text-purple/80 transition-colors">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Signup;