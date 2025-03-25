const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {createArtwork, getAllArtworks, getArtworkById} = require('../controllers/artworkController.js');


router.post('/create-artwork', authMiddleware, createArtwork);
router.get('/list-artworks', getAllArtworks);
router.get('/view-artwork/:id', getArtworkById);


module.exports = router;
