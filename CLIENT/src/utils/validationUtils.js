/** 
 * Validates form data
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Object containing errors for each field 
 */
export const validateForm = (formData) => {
  const errors = {};

  const validatePassword = (password, isSignup = false) => {
    if (!password) {
        return 'Password is required';
    } else if (password.length < 6) {
        return 'Password must be at least 6 characters';
    } else if (isSignup && !/(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(password)) {
        return 'Must be at least 6 characters and include a letter, number, and special character';
    }
    return null;
}
  
  // For signup form
  if ('name' in formData) {
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Must be at least 2 characters';
    }
    
    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(formData.username)) {
      errors.username = 'Only letters, numbers, underscores, dots, and hyphens are allowed';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    const passwordError = validatePassword(formData.password, true);
    if (passwordError) {
        errors.password = passwordError;
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement validation
    if (!formData.termsAgreed) {
      errors.termsAgreed = 'You must agree to the Terms of Service and Privacy Policy';
    }
  }
  
  // For login form
  if ('identifier' in formData) {
    // Identifier validation
    if (!formData.identifier.trim()) {
      errors.identifier = 'Email or username is required';
    }
    
    // Password validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
        errors.password = passwordError;
    }

  }
  
  return errors;
};