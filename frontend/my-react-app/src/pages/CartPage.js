import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../AuthContext'; // Import useAuth to access user context

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const { user } = useAuth(); // Access user from AuthContext

    useEffect(() => {
        if (!user) {
            // If user is not logged in, redirect to login page
            navigate('/login', { state: { from: window.location.pathname } });
        } else {
            // Fetch cart items only if the user is logged in
            const fetchCartItems = async () => {
                try {
                    const response = await axios.get('/cart', { withCredentials: true });
                    console.log(response.data.items);
                    setCartItems(response.data.items);
                    calculateTotal(response.data.items);
                } catch (err) {
                    console.error('Error fetching cart items:', err.response?.data?.message || err.message);
                }
            };

            fetchCartItems();
        }
    }, [user, navigate]);

    const calculateTotal = (items) => {
        const total = items.reduce(
            (sum, item) => sum + (item.productId ? item.productId.price * item.quantity : 0),
            0
        );
        setTotalPrice(total);
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        console.log('button pressed');
        try {
            const response = await axios.put('/cart/update', {
                productId,
                quantity: newQuantity,
            });
            if (response.status === 200) {
                navigate('/cart');
            }
        } catch (err) {
            console.error('Error updating cart item quantity:', err.response?.data?.message || err.message);
        }
    };

    const handleRemoveItem = async (productId) => {
        console.log('Removing item with productId:', productId);
        try {
            const response = await axios.delete(`/cart/remove/${productId}`);
            console.log('Updated cart items:', response.data.items);
            setCartItems(response.data.items);
            calculateTotal(response.data.items);
            navigate('/cart');
        } catch (err) {
            console.error('Error removing cart item:', err.response ? err.response.data.message : err.message);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { cartItems, totalPrice } });
    };

    if (cartItems.length === 0) {
        return <div className="text-center">Your cart is empty</div>;
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Shopping Cart</h2>
            <div className="row">
                <div className="col-lg-8">
                    {cartItems.map((item) => {
                        const product = item.productId; // Accessing product details
                        const imageUrl = product?.imageUrl?.[0]; // Safely accessing the first image URL

                        if (!product) {
                            // Skip rendering this item if product details are null
                            return null;
                        }

                        return (
                            <div key={item._id} className="card mb-3 shadow-sm">
                                <div className="row g-0 align-items-center">
                                    <div className="col-md-3">
                                        {/* Conditionally render image */}
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={product.title}
                                                className="img-fluid rounded"
                                            />
                                        ) : (
                                            <div className="no-image">No image available</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text text-muted">Price: ${product.price}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button
                                                className="btn btn-secondary me-2"
                                                onClick={() => handleQuantityChange(product._id, Math.max(1, item.quantity - 1))}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button
                                                className="btn btn-secondary ms-2"
                                                onClick={() => handleQuantityChange(product._id, item.quantity + 1)}
                                                disabled={item.quantity >= product.stock}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="btn btn-danger btn-sm mt-2"
                                            onClick={() => handleRemoveItem(product._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="col-lg-4">
                    <div className="card shadow-sm p-4">
                        <h4>Order Summary</h4>
                        <p>Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
                        <button className="btn btn-primary btn-block" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
