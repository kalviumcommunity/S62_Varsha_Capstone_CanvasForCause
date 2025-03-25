const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const { getAllUsers, getUserById, updateProfile } = require('../controllers/userController.js');

router.get('/list-users', getAllUsers);
router.get('/view-user/:id', getUserById);
router.put('/update-profile' ,authMiddleware, updateProfile);

module.exports = router;
