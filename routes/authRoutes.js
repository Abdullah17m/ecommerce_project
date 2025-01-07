const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const router = express.Router();

// User Signup
router.post('/signup', signup);

// User Login
router.post('/login', login);

// User Logout
router.post('/logout', logout);

module.exports = router;
