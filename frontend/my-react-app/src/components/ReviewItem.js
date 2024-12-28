// ReviewItem.js
import React from 'react';
import { useAuth } from '../AuthContext';
import axios from '../api/axios';

const ReviewItem = ({ review, onDelete }) => {
    const { user } = useAuth();
    const { userId, rating, comment } = review;
    const { name, email } = userId || {};  // Destructure userId to get name and email

    console.log(user);
    console.log(user._id);
    console.log(review.userId);

    const handleDelete = async () => {
        try {
            await axios.delete(`/reviews/${review._id}`);
            onDelete(review._id);  // Update parent state after deletion
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className="review-item">
            <div className="review-user">
                <span>{name}</span> {/* Display user's name */}
                <span>{email}</span> {/* Display user's email */}
            </div>
            <div className="review-rating">
                <span>Rating: {rating}</span>
            </div>
            <div className="review-comment">
                <p>{comment}</p>
            </div>

            {user && user._id === review.userId && (
                <button onClick={handleDelete} className="btn btn-danger">
                    Delete
                </button>
            )}
        </div>
    );
};

export default ReviewItem;
