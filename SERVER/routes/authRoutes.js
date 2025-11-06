const express = require('express');
const authMiddleware = require('../middleware/authMiddleware.js')
const { register, login, getCurrentUser, logout, refreshAccessToken, verifyAuth, googleLogin } = require('../controllers/authController.js');
const router = express.Router();


// Register a new user
router.post('/register', register );

// Login a user
router.post('/login', login);
router.post('/google-login', googleLogin);

// Get current user profile
router.get('/me', authMiddleware, getCurrentUser);

// Logout user
router.post('/logout', authMiddleware, logout);

router.post('/refresh-token', refreshAccessToken);

router.get('/verify', authMiddleware, verifyAuth);

module.exports = router;