import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateReview = ({ productId, user, onReviewAdded }) => {
    const [newReview, setNewReview] = useState({ rating: 1, comment: '' });
    const navigate = useNavigate();

    const handleAddReview = async () => {
        try {
            const response = await axios.post('/reviews', {
                productId,
                userId: user.id,
                ...newReview,
            });

            // Add the new review to the list in parent component
            if (onReviewAdded) {
                onReviewAdded(response.data);
            }

            setNewReview({ rating: 1, comment: '' });
            navigate(`/products/${productId}`);
        } catch (error) {
            console.error('Error adding review:', error.response?.data || error.message);
        }
    };

    return (
        <div className="mt-3">
            <h4>Add a Review</h4>
            <div className="form-group">
                <label>Rating</label>
                <select
                    className="form-control"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Comment</label>
                <textarea
                    className="form-control"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
            </div>
            <button onClick={handleAddReview} className="btn btn-primary mt-2">
                Submit Review
            </button>
        </div>
    );
};

export default CreateReview;
