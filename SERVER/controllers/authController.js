const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const validatePassword = (password)=>{
  if(!password||password.length<6){
    return false;
  }
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  return hasLetter && hasNumber && hasSpecialChar;
}

const generateTokens = (userId)=>{
  const token = jwt.sign(
    {id:userId},
    process.env.JWT_SECRET,
    {expiresIn:'15m'}
  )

  const refreshToken=jwt.sign(
    {id:userId},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:'7d'}
    
  )
  return {token, refreshToken};
}


// Database Write: User registration creates a new user document in MongoDB
const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

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
    if(!validatePassword(password)){
      return res.status(400).json({
        success:false,
        message:'Password must be at least 6 characters and include a letter, number, and special character'
      })
    }

    // Create new user
    const newUser = new User({
      name,
      username,
      email,
      password
    });
    
    await newUser.save();

    // Create token
    const {token, refreshToken} = generateTokens(newUser._id);
    const refreshExpiry = new Date(Date.now()+7*24*60*60*1000);
    
    newUser.refreshToken = refreshToken;
    newUser.refreshTokenExpiry = refreshExpiry;
    await newUser.save();

    res.cookie('accessToken', token, {
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      maxAge:15*60*1000,
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      maxAge:7*24*60*60*1000
    })

    res.status(201).json({
      success: true,
      token,
      refreshToken,
      expiresIn:15*60,
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


const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Check if email and password are provided
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or username and password'
      });
    }

    // Find user by email
    const user = await User.findOne({
      $or:[ {email:identifier}, {username:identifier}] }).select('+password');

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
        message: 'Invalid email or password'
      });
    }

    // Create token
    const{token, refreshToken} = generateTokens(user._id);
    const refreshExpiry = new Date(Date.now()+7*24*60*60*1000);
    user.refreshToken = refreshToken;
    user.refreshTokenExpiry = refreshExpiry;
    await user.save();

    res.cookie('accessToken', token, {
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      maxAge:15*60*1000,
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      maxAge:7*24*60*60*1000
    })

    res.status(200).json({
      success: true,
      token,
      refreshToken,
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

const refreshAccessToken = async(req, res)=>{
  try{
    const{refreshToken} = req.cookies;
    if(!refreshToken){
      return res.status(401).json({
        success:false,
        message:'No refresh Token provided',
      })
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select('+refreshToken +refreshTokenExpiry');

    if(!user||user.refreshToken!=refreshToken||user.refreshTokenExpiry<new Date()){
      return res.status(401).json({
        success:false,
        message:'Invalid refresh token'
      })
    }
    const newToken = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'15m'}
    )

    res.cookie('accessToken', newToken, {
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      maxAge:15*60*1000
    })
    res.status(200).json({
      success: true,
      token: newToken,
      expiresIn: 15 * 60 
    });
  }
  catch(error){
    console.error(error);
    return res.status(401).json({sucess:false, message:'Invalid refresh Token'});
  }

}
// Database Read: Retrieve current user profile information
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


// Logout user
const logout = async (req, res) => {
  try {
    if(req.user){
      const user = await User.findById(req.user.id);
      if(user){
        user.refreshToken = undefined;
        user.refreshTokenExpiry = undefined;
        await user.save();
      }
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    });
  } catch (error) { 
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};
module.exports = {register, login, getCurrentUser, logout, refreshAccessToken};
