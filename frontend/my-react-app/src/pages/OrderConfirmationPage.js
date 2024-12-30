import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [products, setProducts] = useState([]); // To store fetched product details
    const location = useLocation();

    useEffect(() => {
        const order = location.state?.order;
        console.log('Order details from location.state:', order);
        if (order) {
            setOrderDetails(order);
            // Fetch product details for each productId in the cartItems
            const fetchProducts = async () => {
                const productRequests = order.cartItems.map(item =>
                    fetch(`http://localhost:5000/api/marketplace/${item.productId}/details`) // Replace with your actual API endpoint
                        .then(response => response.json())
                        .then(data => ({ ...item, productData: data }))
                );
                const productData = await Promise.all(productRequests);
                setProducts(productData);
            };
            fetchProducts();
        }
    }, [location]);

    if (!orderDetails || !orderDetails.shippingInfo) {
        return <div>Order details are unavailable. Please try again.</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4" style={{ backgroundColor: '#EDE1D2' }}>
                <h2 className="text-center" style={{ color: '#412F26' }}>Order Confirmation</h2>
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="mt-4" style={{ color: '#6A6F4C' }}>Shipping Information</h4>
                        <p className="mb-1" style={{ color: '#412F26' }}>
                            {orderDetails.shippingInfo.firstName} {orderDetails.shippingInfo.lastName}
                        </p>
                        <p className="mb-1" style={{ color: '#412F26' }}>
                            {orderDetails.shippingInfo.address}
                        </p>
                        <p className="mb-1" style={{ color: '#412F26' }}>
                            {orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.postalCode}
                        </p>
                        <p className="mb-1" style={{ color: '#412F26' }}>
                            Phone: {orderDetails.shippingInfo.phone}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h4 className="mt-4" style={{ color: '#6A6F4C' }}>Payment Method</h4>
                        <p className="mb-1" style={{ color: '#412F26' }}>
                            {orderDetails.paymentMethod}
                        </p>
                    </div>
                </div>

                <h4 className="mt-4" style={{ color: '#6A6F4C' }}>Order Items</h4>
                <ul className="list-group">
                    {products.length > 0 ? (
                        products.map((item, index) => (
                            item.productData ? (
                                <li key={index} className="list-group-item d-flex align-items-center mb-3" style={{ backgroundColor: '#CBB89D', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <img
                                        src={item.productData.imageUrl && item.productData.imageUrl[0] ? item.productData.imageUrl[0] : '/path/to/default-image.jpg'}
                                        alt={item.productData.title}
                                        width="100"
                                        height="100"
                                        className="mr-3 rounded"
                                        style={{ objectFit: 'cover', marginRight: '15px' }} // Add space to the right of the image
                                    />
                                    <div className="d-flex flex-column justify-content-center" style={{ flex: 1, paddingLeft: '10px' }}> {/* Added padding to the left of the text */}
                                        <span style={{ color: '#412F26', fontWeight: 'bold', fontSize: '1.1rem' }}>{item.productData.title}</span>
                                        <div className="d-flex justify-content-between mt-2">
                                            <span style={{ color: '#412F26', fontSize: '1rem' }}>Quantity: {item.quantity}</span>
                                            <span style={{ color: '#412F26', fontSize: '1rem' }}>Price: ${item.quantity * item.productData.price}</span>
                                        </div>
                                    </div>
                                </li>


                            ) : (
                                <li key={index} className="list-group-item" style={{ backgroundColor: '#CBB89D' }}>
                                    Product details unavailable - Quantity: {item.quantity}
                                </li>
                            )
                        ))
                    ) : (
                        <li className="list-group-item" style={{ backgroundColor: '#CBB89D' }}>
                            No items in the order.
                        </li>
                    )}
                </ul>

                <div className="mt-4">
                    <h4 className="text-right" style={{ color: '#5D2510' }}>Total Amount: Rs{orderDetails.totalAmount}</h4>
                </div>

            </div>
        </div>
    );
};

export default OrderConfirmationPage;
