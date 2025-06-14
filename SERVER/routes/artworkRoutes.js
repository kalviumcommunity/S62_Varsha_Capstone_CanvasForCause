const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {
    createArtwork, 
    getAllArtworks, 
    getArtworkById, 
    updateArtwork,
    toggleLike,
    deleteArtwork,
    getUserArtworks,
    uploadArtworkImage,
} = require('../controllers/artworkController.js');

const { uploadLimiter } = require('../middleware/rateLimiters.js');


router.post('/create-artwork', authMiddleware, createArtwork);
router.get('/list-artworks', getAllArtworks);
router.get('/view-artwork/:id', getArtworkById);
router.put('/update-artwork/:id', authMiddleware, updateArtwork);
router.post('/toggle-like/:id', authMiddleware, toggleLike)
router.delete('/delete-artwork/:id', authMiddleware, deleteArtwork);
router.get('/my-artworks', authMiddleware, getUserArtworks);
router.post('/upload-artwork-image', uploadLimiter, authMiddleware, uploadArtworkImage);

module.exports = router;
