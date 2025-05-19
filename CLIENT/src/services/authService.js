import api from './api';

// Helper function to store auth data across multiple storages
const storeAuthData = (data, rememberMe) => {
  const { user } = data;

  if(rememberMe){
    localStorage.setItem('user', JSON.stringify(user));
  }else{
    localStorage.removeItem('user');
  }
  sessionStorage.setItem('user', JSON.stringify(user));
  // Cookies are handled by the server (httpOnly)
  return true;
};

// Helper function to clear auth data
const clearAuthData = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');

};

// Register new user
const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    
    if (response.data.success) {
      storeAuthData(response.data, false);
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
      storeAuthData(response.data, credentials.rememberMe);
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

const isAuthenticated = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data.success;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return false;
  }
};


// Get current user from storage
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  return JSON.parse(userStr);
};


const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
};

export default authService;