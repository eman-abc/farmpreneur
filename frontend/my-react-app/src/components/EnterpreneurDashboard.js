import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // Import the Axios instance

const EntrepreneurDashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products for the logged-in entrepreneur using the shortened URL
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/dashboard/entrepreneur/products');
                setProducts(response.data.products);  // Assuming your response data contains products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            await axiosInstance.delete(`/products/${productId}`);
            setProducts(products.filter(product => product._id !== productId)); // Update state after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="dashboard">
            <h2>Welcome, Entrepreneur</h2>
            <div>
                <h3>Your Products</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>{product.status}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <h3>Add New Product</h3>
                {/* Add New Product form */}
            </div>
        </div>
    );
};

export default EntrepreneurDashboard;
