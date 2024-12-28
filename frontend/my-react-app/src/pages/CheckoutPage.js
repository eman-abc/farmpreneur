import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

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

    // Fetch cart details on page load
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('/cart', { withCredentials: true });
                setCart(response.data);
                const calculatedTotal = response.data.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0) + 1;
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
        try {
            console.log('try block');
            const orderDetails = {
                shippingInfo,
                paymentMethod,
                cartItems: cart.items,
                totalAmount: total,
            };
            console.log('order details');
            console.log(orderDetails);
            const response = await axios.post('/checkout', orderDetails);
            if (response.status === 200) {
                // After successful checkout, redirect to the confirmation page
                navigate('/order-confirmation', { state: { order: orderDetails } });

            }
        } catch (err) {
            console.error('Error during checkout:', err);
        }
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
                />
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="saveInfo"
                            onChange={() => setShippingInfo({ ...shippingInfo, saveInfo: !shippingInfo.saveInfo })}
                        />
                        Save this information for next time
                    </label>
                </div>

                <h2>Delivery</h2>
                <select name="city" required onChange={handleChange}>
                    <option value="">Select City</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    {/* Add more cities here */}
                </select>

                <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal code (optional)"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    required
                    onChange={handleChange}
                />

                <h2>Shipping Method</h2>
                <select>
                    <option value="freeShipping">FREE SHIPPING + FBR POS</option>
                </select>

                <h2>Payment</h2>
                <div>
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
                <div>
                    {cart.items.map((item, index) => (
                        <div key={index}>
                            <img src={item.productId.image} alt={item.productId.name} />
                            <span>{item.productId.name}</span>
                            <span>Qty: {item.quantity}</span>
                            <span>Price: Rs {item.productId.price}</span>
                        </div>
                    ))}
                </div>

                <div className="cost-summary">
                    <div>Subtotal: Rs {total - 1}</div>
                    <div>Shipping: Rs 1.00</div>
                    <div>Total: Rs {total}</div>
                </div>

                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
};

export default Checkout;