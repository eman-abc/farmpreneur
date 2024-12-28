import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const order = location.state?.order;
        console.log('Order details from location.state:', order);
        if (order) {
            setOrderDetails(order);
        }
    }, [location]);

    if (!orderDetails || !orderDetails.shippingInfo) {
        return <div>Order details are unavailable. Please try again.</div>;
    }

    return (
        <div>
            <h2>Order Confirmation</h2>
            <h3>Shipping Information</h3>
            <p>{orderDetails.shippingInfo.firstName} {orderDetails.shippingInfo.lastName}</p>
            <p>{orderDetails.shippingInfo.address}</p>
            <p>{orderDetails.shippingInfo.city}</p>
            <p>{orderDetails.shippingInfo.postalCode}</p>
            <p>{orderDetails.shippingInfo.phone}</p>

            <h3>Payment Method</h3>
            <p>{orderDetails.paymentMethod}</p>

            <h3>Order Items</h3>
            <ul>
                {orderDetails.cartItems.map((item) => (
                    <li key={item.productId._id}>
                        <img src={item.productId.imageUrl[0]} alt={item.productId.title} width="50" />
                        {item.productId.title} - Quantity: {item.quantity} - Price: ${item.quantity * item.productId.price}
                    </li>
                ))}
            </ul>

            <h3>Total Amount: ${orderDetails.totalAmount}</h3>
        </div>
    );
};

export default OrderConfirmationPage;
