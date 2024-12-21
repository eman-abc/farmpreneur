const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Add routes for order CRUD operations here

// Order Routes
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
