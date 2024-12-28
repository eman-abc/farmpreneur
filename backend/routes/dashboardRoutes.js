// dashboardRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const productController = require('../controllers/productController');  // Import productController
const Product = require('../models/Product');


router.get('/', authMiddleware, (req, res) => {
    console.log('INSIDE DASHBOARD roUTE.JS BACKEND')
    console.log('Session Data:', req.session.user);  // Check if session is set correctly

    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = req.session.user;
    let responseData = { user };
    console.log(user);

    if (user.role === 'user') {
        responseData.products = [{ id: 1, name: 'Product A' }, { id: 2, name: 'Product B' }];
    } else if (user.role === 'mentor') {
        responseData.mentorships = [{ id: 1, topic: 'Mentorship A' }];
    } else if (user.role === 'ngo') {
        responseData.resources = [{ id: 1, name: 'Resource A' }];
    }

    res.json(responseData);
});

// Entrepreneur Products Route
router.get('/entrepreneur/products', authMiddleware, async (req, res) => {
    console.log('inside entre prod route bk');
    try {
        // Fetch products for the logged-in entrepreneur based on their userId (ownerId)
        const products = await Product.find({ ownerId: req.session.user._id });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found for this entrepreneur.' });
        }

        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products.' });
    }
});


// Edit a product
router.put('/entrepreneur/products/:id', authMiddleware, async (req, res) => {
    console.log('inside entrepreneur edti bcknd');
    const { id } = req.params;  // Extract product ID from the URL parameter
    const { title, price, status } = req.body;  // Get the updated product data from the request body

    try {
        // Find the product by its ID and check if it belongs to the logged-in entrepreneur
        const product = await Product.findOne({ _id: id, ownerId: req.session.user._id });

        if (!product) {
            return res.status(404).json({ message: 'Product not found or does not belong to this entrepreneur.' });
        }

        // Update the product with the new details
        product.title = title || product.title;  // If new title is provided, update, otherwise retain the current one
        product.price = price || product.price;  // If new price is provided, update, otherwise retain the current one
        product.status = status || product.status;  // If new status is provided, update, otherwise retain the current one

        await product.save();  // Save the updated product

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product.' });
    }
});

// Delete a product
router.delete('/entrepreneur/products/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;  // Extract product ID from the URL parameter

    try {
        // Find the product by its ID and check if it belongs to the logged-in entrepreneur
        const product = await Product.findOneAndDelete({ _id: id, ownerId: req.session.user._id });

        if (!product) {
            return res.status(404).json({ message: 'Product not found or does not belong to this entrepreneur.' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product.' });
    }
});




module.exports = router;
