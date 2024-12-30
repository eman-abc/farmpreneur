import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../assets/cssfiles/checkout.css'; // Assuming custom styles will be placed here

const Checkout = () => {
    const [cart, setCart] = useState(null);
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
        phone: '',
        saveInfo: false,
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    // Fetch cart details on page load
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('/cart', { withCredentials: true });
                setCart(response.data);
                const calculatedTotal = response.data.items.reduce(
                    (sum, item) => sum + item.productId.price * item.quantity,
                    0
                ) + 1;
                setTotal(calculatedTotal);
            } catch (err) {
                console.error('Error fetching cart:', err);
            }
        };
        fetchCart();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({ ...shippingInfo, [name]: value });
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitted) return;
        setSubmitted(true);
        try {
            const filteredCartItems = cart.items.filter((item) => item.productId);
            const orderDetails = {
                shippingInfo,
                paymentMethod,
                cartItems: filteredCartItems,
                totalAmount: calculateTotalAmount(filteredCartItems),
            };

            const response = await axios.post('http://localhost:5000/api/checkout', orderDetails);
            if (response.status === 200) {
                navigate('/order-confirmation', { state: { order: response.data } });
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('There was an issue placing your order. Please try again.');
        }
    };

    const calculateTotalAmount = (cartItems) => {
        return cartItems.reduce(
            (total, item) => total + (item.productId?.price || 0) * item.quantity,
            0
        );
    };

    if (!cart) return <div>Loading...</div>;

    return (
        <div className="checkout-container">
            <form onSubmit={handleSubmit}>
                <h2>Contact Information</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    className="input-field"
                />
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="saveInfo"
                            onChange={() =>
                                setShippingInfo({ ...shippingInfo, saveInfo: !shippingInfo.saveInfo })
                            }
                        />
                        Save this information for next time
                    </label>
                </div>

                <h2>Delivery</h2>
                <select name="city" required onChange={handleChange} className="input-field">
                    <option value="">Select City</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                </select>

                <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    required
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    required
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal code (optional)"
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    required
                    onChange={handleChange}
                    className="input-field"
                />

                <h2>Shipping Method</h2>
                <select className="input-field">
                    <option value="freeShipping">FREE SHIPPING + FBR POS</option>
                </select>

                <h2>Payment</h2>
                <div className="payment-methods">
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="DebitCreditCard"
                            onChange={handlePaymentMethodChange}
                        />
                        Debit/Credit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="CashOnDelivery"
                            onChange={handlePaymentMethodChange}
                        />
                        Cash on Delivery
                    </label>
                </div>

                <h2>Order Summary</h2>
                <div className="order-summary">
                    {cart.items.map((item, index) => (
                        item.productId ? (
                            <div key={index} className="order-item">
                                <img src={item.productId.image} alt={item.productId.name} className="item-image" />
                                <span className="item-name">{item.productId.name}</span>
                                <span className="item-qty">Qty: {item.quantity}</span>
                                <span className="item-price">Rs {item.productId.price}</span>
                            </div>
                        ) : (
                            <div key={index} className="order-item">
                                <span>Product details unavailable</span>
                                <span>Qty: {item.quantity}</span>
                            </div>
                        )
                    ))}
                </div>

                <div className="cost-summary">
                    <div>Subtotal: Rs {total - 1}</div>
                    <div>Shipping: Rs 1.00</div>
                    <div>Total: Rs {total}</div>
                </div>

                <button type="submit" className="submit-btn">Submit Order</button>
            </form>
        </div>
    );
};

export default Checkout;
