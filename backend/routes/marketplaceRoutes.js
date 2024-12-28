const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/marketplace', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search, page = 1, limit = 10, sortBy = 'createdAt' } = req.query;

        let filters = { status: 'Available' };
        if (category) filters.category = category;
        if (minPrice) filters.price = { ...filters.price, $gte: Number(minPrice) };
        if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) };
        if (search) filters.title = new RegExp(search, 'i');

        const products = await Product.find(filters)
            .sort({ [sortBy]: -1 }) // Sort by latest by default
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalProducts = await Product.countDocuments(filters);

        res.status(200).json({ products, totalPages: Math.ceil(totalProducts / limit) });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
});


// Route to fetch product details by ID
router.get('/marketplace/:id/details', async (req, res, next) => {
    const { id } = req.params; // Extract product ID from URL parameter

    console.log(`Received request for product ID: ${id}`);

    try {
        // Attempt to find the product by ID and populate the owner's name
        const product = await Product.findById(id).populate('ownerId', 'name');

        if (!product) {
            // Log that the product was not found
            console.error(`Product with ID ${id} not found`);
            return res.status(404).json({ message: 'Product not found' });
        }

        // Log successful fetch
        console.log(`Product details fetched for product ID: ${id}`);

        // Respond with the product details
        res.status(200).json(product);
    } catch (err) {
        // Log the error and pass it to the generic error handler
        console.error(`Error fetching product with ID ${id}:`, err);

        // Pass the error to the next middleware (generic error handler)
        next(err);
    }
});


module.exports = router;