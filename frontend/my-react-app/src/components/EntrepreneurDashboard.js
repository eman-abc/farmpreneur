import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // Import the Axios instance
import ResourceList from './ResourceList';
import AidList from './AidList';

const EntrepreneurDashboard = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // State to store the product being edited
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        status: 'Available', // Default status
        category: '', // Add category to form data
        stock: '', // Add stock field
        description: ''
    });
    const [sessions, setSessions] = useState({
        upcomingSessions: [],
        pendingSessions: [],
        completedSessions: [],
    });
    const [mentors, setMentors] = useState([]);
    const [newSessionRequest, setNewSessionRequest] = useState({
        mentorId: '',
        schedule: '',
        topics: '',
    });

    // Fetch products, mentors, and sessions
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axiosInstance.get('/dashboard/entrepreneur/products');
                setProducts(productResponse.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }

            try {
                const mentorResponse = await axiosInstance.get('entrepreneur/mentors');
                setMentors(mentorResponse.data);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }

            try {
                const sessionResponse = await axiosInstance.get('/entrepreneur/sessions');
                const data = sessionResponse.data;
                setSessions({
                    upcomingSessions: data.filter(session => session.status === 'Upcoming'),
                    pendingSessions: data.filter(session => session.status === 'Pending'),
                    completedSessions: data.filter(session => session.status === 'Completed')
                });
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchData();
    }, []);

    // Handle product deletion
    const handleDeleteProduct = async (productId) => {
        try {
            await axiosInstance.delete(`/dashboard/entrepreneur/products/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error(`Error deleting product:`, error);
        }
    };

    // Handle product editing
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            price: product.price,
            status: product.status,
            category: product.category, // Add category to form data
            stock: product.stock, // Add stock to form data
        });
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    // Handle form submission (Update product)
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = { ...formData };
            await axiosInstance.put(`/dashboard/entrepreneur/products/${editingProduct._id}`, updatedProduct);
            setEditingProduct(null);
            setFormData({
                title: '',
                price: '',
                status: '',
                category: '',
                stock: '',
            });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Handle adding a new product
    const handleAddNewProduct = async (e) => {
        e.preventDefault();
        try {
            const newProduct = {
                ...formData,
                // ownerId: 'kiran-bibi-id', // Assuming Kiran Bibi's ID here
            };

            const response = await axiosInstance.post('/dashboard/entrepreneur/products', newProduct);
            setProducts([...products, response.data.product]);
            setFormData({
                title: '',
                price: '',
                status: '',
                category: '',
                stock: '',
                description: '',
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="dashboard">
            <h2>Welcome, Entrepreneur</h2>

            {/* Add New Product Form */}
            <div className="add-product-form">
                <h3>Add New Product</h3>
                <form onSubmit={handleAddNewProduct}>
                    <label>Product Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Product Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Discontinued">Discontinued</option>
                    </select>
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Handicrafts">Handicrafts</option>
                        <option value="Organic Produce">Organic Produce</option>
                    </select>
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Add Product</button>
                </form>
            </div>

            {/* Edit Product Modal/Form */}
            {editingProduct && (
                <div className="edit-product-form">
                    <h3>Edit Product</h3>
                    <form onSubmit={handleUpdateProduct}>
                        <label>Product Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Available">Available</option>
                            <option value="Out of Stock">Out of Stock</option>
                            <option value="Discontinued">Discontinued</option>
                        </select>
                        <button type="submit">Update Product</button>
                        <button onClick={() => setEditingProduct(null)}>Cancel</button>
                    </form>
                </div>
            )}

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
                                        <button onClick={() => handleEditProduct(product)}>Edit</button>
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

            {/* Resources Section */}
            <ResourceList />
            {/* Financial Aid Programs Section */}
            <AidList />
        </div>
    );
};

export default EntrepreneurDashboard;
