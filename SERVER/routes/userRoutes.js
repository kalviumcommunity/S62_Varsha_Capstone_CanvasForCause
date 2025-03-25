const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById } = require('../controllers/userController.js');

router.get('/list-users', getAllUsers);
router.get('/view-user/:id', getUserById);

module.exports = router;
