import api from './api';

// Helper function to store auth data across multiple storages
const storeAuthData = (data) => {
  const { token, refreshToken, expiresIn, user } = data;
  
  const expiryTime = new Date(Date.now() + expiresIn * 1000);
  
  // Store in localStorage (persists after browser close)
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('tokenExpiry', expiryTime.toISOString());
  localStorage.setItem('user', JSON.stringify(user));
  
  // Store in sessionStorage (cleared after browser close)
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('refreshToken', refreshToken);
  sessionStorage.setItem('tokenExpiry', expiryTime.toISOString());
  sessionStorage.setItem('user', JSON.stringify(user));
  
  // Cookies are handled by the server (httpOnly)
  return true;
};

// Helper function to clear auth data
const clearAuthData = () => {
  // Clear localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('user');
  
  // Clear sessionStorage
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('tokenExpiry');
  sessionStorage.removeItem('user');
  
  // Cookies will be cleared by the server
};

// Register new user
const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    
    if (response.data.success) {
      storeAuthData(response.data);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Network error' };
  }
};

// Login user
const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.success) {
      storeAuthData(response.data);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Network error' };
  }
};

// Logout user
const logout = async () => {
  try {
    await api.post('/auth/logout');
    clearAuthData();
    return { success: true };
  } catch (error) {
    clearAuthData(); // Still clear data even if API call fails
    throw error.response?.data || { success: false, message: 'Network error' };
  }
};

// Check if token is expired
const isTokenExpired = () => {
  const expiryStr = localStorage.getItem('tokenExpiry');
  if (!expiryStr) return true;
  
  const expiry = new Date(expiryStr);
  const now = new Date();
  
  return now >= expiry;
};

// Get current user from storage
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  return JSON.parse(userStr);
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  return !isTokenExpired();
};

// Refresh token manually (if needed)
const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh-token');
    
    if (response.data.success) {
      const { token, expiresIn } = response.data;
      
      // Update token in localStorage
      localStorage.setItem('token', token);
      // Update token expiration
      const expiryTime = new Date(Date.now() + expiresIn * 1000);
      localStorage.setItem('tokenExpiry', expiryTime.toISOString());
      
      // Update in sessionStorage too
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('tokenExpiry', expiryTime.toISOString());
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Network error' };
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  refreshToken,
  isTokenExpired
};

export default authService;