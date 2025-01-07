const express = require('express');
const { addToCart, viewCart } = require('../controllers/cartController');
const router = express.Router();

const authMiddleware = require('../config/authMiddleware'); 

// Add Product to Cart
router.post('/add', authMiddleware, addToCart);

// View Cart
router.get('/view', authMiddleware, viewCart);

module.exports = router;
