const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  console.log(req.body);
  console.log('controller create entered');
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;
    const userName = req.user.name;
    const userEmail = req.user.email;
    console.log(userId, userEmail, userName);
    const review = new Review({ productId, userId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    // const reviews = await Review.find({ productId });
    const reviews = await Review.find({ productId: req.params.productId })
      .populate('userId'); // Populate userId with name and email
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

// Delete a review
// reviewsController.js
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await review.remove();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};

