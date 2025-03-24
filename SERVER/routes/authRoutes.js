const express = require('express');
const authMiddleware = require('../middleware/authMiddleware.js')
const { register, login, getCurrentUser } = require('../controllers/authController.js');
const router = express.Router();


// Register a new user
router.post('/register', register );

// Login a user
router.post('/login', login);

// Get current user profile
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;