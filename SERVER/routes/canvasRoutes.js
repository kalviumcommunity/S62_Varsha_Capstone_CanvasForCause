const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const { createCanvas, updateCanvas, loadCanvas, deleteCanvas, saveCanvasImage, getUserCanvases } = require('../controllers/canvasController.js');
const { uploadLimiter } = require('../middleware/rateLimiters.js');

router.post('/create', authMiddleware, createCanvas);
router.put('/update/:id', authMiddleware, updateCanvas);
router.get('/load/:id', authMiddleware, loadCanvas);
router.delete('/delete/:id', authMiddleware, deleteCanvas);
router.post('/save-image', authMiddleware, uploadLimiter, saveCanvasImage);
router.get('/user-canvases', authMiddleware, getUserCanvases);

module.exports=router;