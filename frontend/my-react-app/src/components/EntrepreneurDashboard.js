import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // Import the Axios instance
import ResourceList from './ResourceList';
import AidList from './AidList';
import Sessions from './Sessions';
import '../assets/cssfiles/entre.css'

const EntrepreneurDashboard = () => {
    // State to manage the visibility of sections
    const [showResources, setShowResources] = useState(false);
    const [showAidPrograms, setShowAidPrograms] = useState(false);
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // State to store the product being edited
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        status: 'Available', // Default status
        category: 'Handicrafts', // Add category to form data
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
        schedule: '',  // Ensure this is an empty string initially
        topics: '',    // Ensure this is an empty string initially
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

    // Handle session request form input changes
    const handleSessionRequestChange = (e) => {
        const { name, value } = e.target;
        setNewSessionRequest((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle session request form submission
    const handleSessionRequestSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/mentorship/mentee/sessions', newSessionRequest);
            setSessions((prevState) => ({
                ...prevState,
                pendingSessions: [...prevState.pendingSessions, response.data.session],
            }));
            setNewSessionRequest({
                mentorId: '',
                schedule: '',
                topics: '',
            });
        } catch (error) {
            console.error('Error requesting session:', error);
        }
    };

    return (
        <div className="entrepreneur-dashboard-container my-4">
            <h2 className="entrepreneur-dashboard-title text-center">Welcome, Entrepreneur</h2>

            {/* Add New Product Form */}
            <div className="entrepreneur-dashboard-card card shadow-sm mb-4">
                <div className="entrepreneur-dashboard-card-header card-header bg-primary text-white">
                    <h3 className="m-0">Add New Product</h3>
                </div>
                <div className="entrepreneur-dashboard-card-body card-body">
                    <form onSubmit={handleAddNewProduct} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Product Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Product Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="form-select"
                                required
                            >
                                <option value="Available">Available</option>
                                <option value="Out of Stock">Out of Stock</option>
                                <option value="Discontinued">Discontinued</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="form-select"
                                required
                            >
                                <option value="Handicrafts">Handicrafts</option>
                                <option value="Organic Produce">Organic Produce</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="entrepreneur-dashboard-btn btn btn-success w-100">Add Product</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Edit Product Modal/Form */}
            {editingProduct && (
                <div className="entrepreneur-dashboard-card card shadow-sm mb-4">
                    <div className="entrepreneur-dashboard-card-header card-header bg-warning text-white">
                        <h3 className="m-0">Edit Product</h3>
                    </div>
                    <div className="entrepreneur-dashboard-card-body card-body">
                        <form onSubmit={handleUpdateProduct} className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Product Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="Available">Available</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                    <option value="Discontinued">Discontinued</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="entrepreneur-dashboard-btn btn btn-warning w-100">Update Product</button>
                            </div>
                            <div className="col-12">
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    className="btn btn-secondary w-100"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <h3>Your Products</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
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
                                        <button onClick={() => handleEditProduct(product)} className="btn btn-info btn-sm mx-1">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-danger btn-sm">
                                            Delete
                                        </button>
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

            {/* Use the Sessions Component */}
            <Sessions sessions={sessions} />

            {/* Dropdown for Resources */}
            <div className="entrepreneur-dashboard-dropdown-container">
                <button
                    className="entrepreneur-dashboard-dropdown-button"
                    onClick={() => setShowResources(!showResources)}
                >
                    {showResources ? '▼ Hide Resources' : '▶ Explore Resources'}
                </button>
                {showResources && (
                    <div className="entrepreneur-dashboard-dropdown-content">
                        <ResourceList />
                    </div>
                )}
            </div>

            {/* Dropdown for Aid Programs */}
            <div className="entrepreneur-dashboard-dropdown-container">
                <button
                    className="entrepreneur-dashboard-dropdown-button"
                    onClick={() => setShowAidPrograms(!showAidPrograms)}
                >
                    {showAidPrograms ? '▼ Hide Aid Programs' : '▶ Explore Aid Programs'}
                </button>
                {showAidPrograms && (
                    <div className="entrepreneur-dashboard-dropdown-content">
                        <AidList />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EntrepreneurDashboard;
