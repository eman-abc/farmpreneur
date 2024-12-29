import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import ReviewItem from './ReviewItem';


const ReviewList = ({ productId, user }) => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/reviews/product/${productId}`);
                console.log(response.data); // Check the response
                if (response.data.length === 0) {
                    setError('No reviews available for this product.');
                } else {
                    setReviews(response.data);
                }

            } catch (err) {
                console.error('Error fetching reviews', err);
            }
        };

        fetchReviews();
    }, [productId]);

    const handleDelete = (reviewId) => {
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
    };

    return (
        <div>
            {reviews.map((review) => (
                <ReviewItem key={review._id} review={review} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default ReviewList;
