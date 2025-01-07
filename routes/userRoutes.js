const express = require('express');
const { getProfile } = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware'); 
// Get User Profile
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
