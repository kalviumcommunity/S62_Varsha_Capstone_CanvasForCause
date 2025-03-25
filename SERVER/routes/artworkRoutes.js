const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {createArtwork, getAllArtworks, getArtworkById, updateArtwork} = require('../controllers/artworkController.js');


router.post('/create-artwork', authMiddleware, createArtwork);
router.get('/list-artworks', getAllArtworks);
router.get('/view-artwork/:id', getArtworkById);
router.put('/update-artwork/:id', authMiddleware, updateArtwork);


module.exports = router;
