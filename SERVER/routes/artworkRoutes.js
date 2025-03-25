const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {createArtwork} = require('../controllers/artworkController.js');

// Create a new artwork
router.post('/create-artwork', authMiddleware, createArtwork);

module.exports = router;
