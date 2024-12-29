import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../AuthContext'; // Import useAuth to access user context
import ReviewList from '../components/ReviewList';
import CreateReview from '../components/CreateReview';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Quantity state
    const navigate = useNavigate();
    const { user } = useAuth(); // Get the user from AuthContext
    const [reviews, setReviews] = useState([]); // State to store reviews

    // Fetch Product Details
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/marketplace/${id}/details`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product details', err);
                alert('Failed to load product details. Please try again later.');
            }
        };

        fetchProductDetails();
    }, [id]);


    const handleReviewAdded = (newReview) => {
        setReviews((prevReviews) => [...prevReviews, newReview]); // Add new review to the list
    };

    // Handle Add to Cart
    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }

        console.log("User from context:", user);

        if (!product || !product._id) {
            console.error("Product ID is missing or undefined.");
            return;
        }

        try {
            const response = await axios.post(
                'cart/add',
                { productId: product._id, quantity },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Added to cart:', response.data);
            alert(`${product.title} has been added to your cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message);
            alert('Failed to add to cart. Please try again.');
        }
    };

    // Handle Buy Now
    const handleBuyNow = () => {
        if (!user) {
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }

        navigate('/checkout', { state: { productId: product._id, quantity } });
    };

    // Handle Quantity Change
    const handleQuantityChange = (e) => {
        const inputQuantity = parseInt(e.target.value, 10) || 1; // Default to 1 if NaN
        setQuantity(Math.max(1, Math.min(inputQuantity, product.stock))); // Clamp value between 1 and stock
    };

    // Increase Quantity
    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    // Decrease Quantity
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!product) return <div className="text-center">Loading...</div>;

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={product.imageUrl[0]}
                        alt={product.title}
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h2 className="text-primary">{product.title}</h2>
                    <p>{product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p>
                        <strong>Seller:</strong>{' '}
                        {product.ownerId ? product.ownerId.name : 'Unknown Seller'}
                    </p>
                    <p>
                        <strong>Stock:</strong>{' '}
                        {product.stock < 5 ? (
                            <span className="text-danger">Low Stock ({product.stock} left)</span>
                        ) : (
                            <span className="text-success">In Stock ({product.stock} left)</span>
                        )}
                    </p>
                    <p><strong>Items Sold:</strong> {product.soldCount}</p>

                    {/* Quantity Selection */}
                    <div className="d-flex align-items-center my-3">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={decreaseQuantity}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="form-control mx-2"
                            style={{ width: '60px' }}
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            max={product.stock}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            onClick={increaseQuantity}
                            disabled={quantity >= product.stock}
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart / Buy Now / View Cart */}
                    <div className="d-flex">
                        <button onClick={handleAddToCart} className="btn btn-primary me-2">Add to Cart</button>
                        <button onClick={handleBuyNow} className="btn btn-success me-2">Buy Now</button>
                        <button onClick={() => navigate('/cart')} className="btn btn-info">View Cart</button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-4">
                <h3>Reviews</h3>
                <ReviewList productId={id} reviews={reviews} />
                {user && <CreateReview productId={id} user={user} />}
            </div>
        </div>
    );
};

export default ProductDetailsPage;
