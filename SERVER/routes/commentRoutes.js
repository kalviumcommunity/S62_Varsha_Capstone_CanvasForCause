const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {addComment} = require('../controllers/commentController.js');

// Add a comment to an artwork
router.post('/add-comment/:artworkId', authMiddleware, addComment);

module.exports = router;
