const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// Generate Token with More Secure Configuration
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { 
      expiresIn: '7d',  
      algorithm: 'HS256' 
    }
  );
};

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password
    });
    
    await newUser.save();

    // Create token
    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
};

// Login an existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

// Get current user profile
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error getting user profile' 
    });
  }
};

module.exports = {register, login, getCurrentUser};