const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Add routes for review CRUD operations here

// Review Routes
router.post('/reviews', reviewController.createReview);
router.get('/reviews', reviewController.getAllReviews);
router.get('/reviews/product/:productId', reviewController.getReviewsByProduct);
router.put('/reviews/:id', reviewController.updateReview);
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;
