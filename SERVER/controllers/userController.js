const mongoose = require('mongoose');
const User = require('../models/User.js');

// Database Read: Retrieve list of all user profiles
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('username avatar bio createdAt');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error getting users' 
    });
  }
};

// Database Read: Fetch specific user by unique identifier
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }
    const user = await User.findById(userId);
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error getting user' 
    });
  }
};


// Database Write: Update user profile information
const updateProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    // Basic validation for username and bio
    if (username) {
      const existingUser = await User.findOne({ 
        username: username, 
        _id: { $ne: req.user.id } 
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username already exists'
        });
      }
    }
    if (username && typeof username !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Username must be a valid string'
      });
    }

    if (bio && typeof bio !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Bio must be a valid string'
      });
    }
    
    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, bio },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        id: updatedUser._id,
        username: updatedUser.username,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
        createdAt: updatedUser.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating profile' 
    });
  }
};

module.exports = {getAllUsers, getUserById, updateProfile};