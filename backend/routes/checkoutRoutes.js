const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

// POST /checkout route
router.post('/', authMiddleware, async (req, res) => {
    console.log('Checkout route hit');
    console.log('Request body:', req.body); // Log incoming data
    console.log('Authenticated user:', req.user);

    const { shippingInfo, paymentMethod, cartItems, totalAmount } = req.body;

    try {
        // Create an order document
        const order = new Order({
            userId: req.user._id,
            shippingInfo,
            paymentMethod,
            cartItems,
            totalAmount,
            status: 'Pending',
        });

        console.log('Order to be saved:', order);

        // Save the order
        await order.save();

        // Empty the user's cart
        const updatedCart = await Cart.findOneAndUpdate(
            { userId: req.user._id },
            { $set: { items: [] } },
            { new: true } // Optionally, return the updated cart
        );
        console.log('Updated cart:', updatedCart);

         // Return the order details after saving
         res.status(200).json(order);
    } catch (err) {
        console.error('Error during checkout:', err);
        res.status(500).json({ message: 'Failed to place order', error: err.message });
    }
});
module.exports = router;
