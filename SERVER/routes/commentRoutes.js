const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {addComment, getComments} = require('../controllers/commentController.js');

// Add a comment to an artwork
router.post('/add-comment/:artworkId', authMiddleware, addComment);
router.get('/artwork-comments/:artworkId', getComments)

module.exports = router;
