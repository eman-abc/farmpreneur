import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../AuthContext'; // Import useAuth to access user context

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);  // Quantity state
    const navigate = useNavigate();
    const { user } = useAuth();  // Get the user from AuthContext

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/marketplace/${id}/details`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product details', err);
            }
        };

        fetchProductDetails();
    }, [id]);

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
                { product, quantity },
                {
                    withCredentials: true,  // Include cookies with the request
                    headers: {
                        'Content-Type': 'application/json',  // Ensure it's sent as JSON
                    },
                }
            );
            
            console.log('Added to cart:', response.data);
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message);
        }
    };



    const handleBuyNow = () => {
        if (!user) {
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }

        navigate('/checkout', { state: { productId: product._id, quantity } });
    };

    const handleQuantityChange = (e) => {
        let newQuantity = Math.max(1, e.target.value);  // Prevent quantity from going below 1
        newQuantity = Math.min(newQuantity, product.stock);  // Prevent quantity from exceeding stock
        setQuantity(newQuantity);
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

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
                    <p><strong>Seller:</strong> {product.ownerId.name}</p>
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
                        <div>
                            <button onClick={decreaseQuantity}>-</button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max={product.stock}
                            />
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                    </div>

                    {/* Add to Cart / Buy Now / View Cart */}
                    <div className="d-flex">
                        <button onClick={handleAddToCart} className="btn btn-primary me-2">Add to Cart</button>
                        <button onClick={handleBuyNow} className="btn btn-success me-2">Buy Now</button>
                        <button onClick={() => navigate('/cart')} className="btn btn-info">View Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
