const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Add routes for review CRUD operations here

// Review Routes
router.post('/', authMiddleware,reviewController.createReview); // Create a review
router.get('/product/:productId', reviewController.getReviewsByProduct); // Get reviews by product ID
router.delete('/:reviewId', authMiddleware, reviewController.deleteReview);

module.exports = router;
