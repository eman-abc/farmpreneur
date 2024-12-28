const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const { ObjectId } = require('mongoose').Types;



router.post('/add', authMiddleware, async (req, res) => {
    console.log('Authenticated user in /add route beginning:', req.user);  // Debugging line
    try {
        // Debugging: log the whole request object
        console.log('Request body:', req.body);
        console.log('User from session:', req.user);

        const { product, quantity } = req.body;
        console.log('Product:', product);  // Debugging: ensure product is correctly extracted
        console.log('Productid:', product._id);
        const productId = product._id;  // Ensure productId is correctly extracted

        console.log('ProductId:', productId);  // Debugging: check if productId is being extracted
        console.log('Quantity:', quantity);

        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: 'User ID not found' });
        }

        // Validate input
        if (!productId || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid product or quantity 1' });

        }

        // Fetch product to check stock availability
        const productFromDb = await Product.findById(productId);
        if (!productFromDb || productFromDb.stock < quantity) {
            return res.status(400).json({ message: 'Product not available in the requested quantity' });
        }

        // Find or create the user's cart
        let cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            console.log('no cart');
            cart = new Cart({ userId: req.user._id, items: [] });
            console.log(cart);
        }
        console.log('Checking cart existence...');
        cart = await Cart.findOne({ userId: req.user._id });
        console.log('Cart found:', cart); // Should log null or the cart object

        // Check if product already exists in the cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        // Save cart and respond
        try {
            await cart.save();
            console.log('Cart saved successfully:', cart);
        } catch (saveError) {
            console.error('Error saving cart:', saveError);
        }

        await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.put('/update', authMiddleware, async (req, res) => {
    console.log('in update midl');
    console.log(req.body);

    const { productId, quantity } = req.body;
    try {
        console.log('User from authMiddleware:', req.user);  // Log user data

        // Fetch the cart for the user
        const cart = await Cart.findOne({ userId: req.user._id });

        // Ensure cart exists
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Log the items in the cart to debug
        console.log("Cart items:", cart.items);

        // Find the existing item in the cart
        const existingItem = cart.items.find(item => item.productId.toString() === new ObjectId(productId).toString());
        console.log("Existing item:", existingItem);

        if (!existingItem) {
            return res.status(400).json({ message: 'Product not in cart' });
        }

        // Calculate the stock difference and update the quantity
        const stockDifference = existingItem.quantity - quantity;  // Positive if reducing quantity
        existingItem.quantity = quantity;

        // Save the updated cart
        await cart.save();

        // Update the product stock
        await Product.findByIdAndUpdate(productId, { $inc: { stock: stockDifference } });

        console.log('Cart saved and product stock updated');

        // Send the populated cart in the response
        res.status(200);
    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({ message: 'Failed to update cart' });
    }
});



router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log('Authenticated user in / route:', req.user);

        const userId = req.user._id;
        console.log('userId:', userId);

        // Fetch cart without population for debugging
        // const cartWithoutPopulate = await Cart.findOne({ userId });
        // console.log('Cart without populate:', cartWithoutPopulate);

        // Fetch the populated cart
        const cart = await Cart.findOne({ userId })
            .populate('userId')  // Populates the user details from the 'User' model
            .populate('items.productId')  // Populates the product details from the 'Product' model
            .exec();  // Ensure the population query is fully executed

        // Check if cart is populated
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        console.log('Populated Cart:', JSON.stringify(cart, null, 2));  // Use JSON.stringify for better formatting

        res.json(cart);  // Send the populated cart as response
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ message: 'Failed to fetch cart items' });
    }
});




router.delete('/remove/:productId', authMiddleware, async (req, res) => {
    console.log('inside remove middleware');
    const { productId } = req.params; // Get productId from route params
    console.log('Received productId from params:', productId);  // Debugging line
    try {
        // Find the cart and remove the item with the specified productId
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user._id },  // Find the user's cart by userId
            { $pull: { items: { productId: productId } } }, // Correct reference to 'productId' field
            { new: true }  // Return the updated cart
        ).populate('items.productId');  // Populate the product details of the items

        console.log(cart);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the product exists in the cart
        const removedItem = cart.items.find(item => item.productId.toString() === productId);
        if (removedItem) {
            // Restore the stock of the removed product
            await Product.findByIdAndUpdate(productId, { $inc: { stock: removedItem.quantity } });
        }

        res.json(cart);  // Return the updated cart
    } catch (err) {
        console.error('Failed to remove cart item:', err);
        res.status(500).json({ message: 'Failed to remove cart item' });
    }
});




module.exports = router;