const mongoose = require('mongoose');
const Review = require('../models/Review');  // Assuming your Review schema is in models/Review.js
const Product = require('../models/Product');  // Assuming your Product schema is in models/Product.js
const User = require('../models/User');  // Assuming your User schema is in models/User.js

// Sample product IDs (replace these with actual product IDs from your database)
const productIds = [
    '67715d62c87dc4af278c06d3',  // Replace with actual product ID
    '67715d62c87dc4af278c06e2',  // Replace with actual product ID

];

// Sample user IDs (replace with actual user IDs who are giving the reviews)
const userIds = [
    '67715d2416f464dcd1421c96',  // Replace with actual user ID
    '67715d2416f464dcd1421c94',  // Replace with actual user ID

];

const reviews = [
    // Reviews for Product 1
    {
        userId: userIds[0],
        productId: productIds[0],
        rating: 5,
        comment: 'Excellent product! Really helped me with my business.',
    },
    {
        userId: userIds[1],
        productId: productIds[0],
        rating: 4,
        comment: 'Good quality but the price is a bit high.',
    },

    // Reviews for Product 2
    {
        userId: userIds[1],
        productId: productIds[1],
        rating: 5,
        comment: 'This is exactly what I needed for my farm.',
    },

    {
        userId: userIds[0],
        productId: productIds[1],
        rating: 4,
        comment: 'Solid product, though I had some difficulty with installation.',
    },

];

const addReviews = async () => {
    try {
        for (let review of reviews) {
            const newReview = new Review(review);
            await newReview.save();
        }
        console.log('Reviews added successfully!');
    } catch (error) {
        console.error('Error adding reviews:', error);
    }
};

// Connect to MongoDB and add reviews
mongoose.connect('mongodb://localhost:27017/farmpreneur', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        addReviews();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
