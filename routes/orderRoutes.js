const express = require('express');
const { checkout, placeOrder, viewOrders } = require('../controllers/orderController');
const router = express.Router();

const authMiddleware = require('../config/authMiddleware'); 
// Checkout Cart
router.post('/checkout', authMiddleware, checkout);

// Place an Order
router.post('/place', authMiddleware, placeOrder);

// View Orders
router.get('/view', authMiddleware, viewOrders);

module.exports = router;
