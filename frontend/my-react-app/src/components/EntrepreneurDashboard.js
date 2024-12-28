import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // Import the Axios instance

const EntrepreneurDashboard = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // State to store the product being edited
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        status: '',
    });
    const [sessions, setSessions] = useState({
        upcomingSessions: [],
        pendingSessions: [],
        completedSessions: [],
    });
    const [mentors, setMentors] = useState([]);
    const [newSessionRequest, setNewSessionRequest] = useState({
        mentorId: '',  // Changed from mentorName to mentorId
        schedule: '',
        topics: '',
    });

    useEffect(() => {
        // Fetch products for the logged-in entrepreneur using the shortened URL
        const fetchProducts = async () => {
            console.log('Fetching products for entrepreneur...'); // Debugging log
            try {
                const response = await axiosInstance.get('/dashboard/entrepreneur/products');
                console.log('Products fetched successfully:', response.data); // Debugging log
                setProducts(response.data.products);  // Assuming your response data contains products
            } catch (error) {
                console.error('Error fetching products:', error.response?.data || error.message); // Debugging log
            }


            try {
                const mentorResponse = await axiosInstance.get('entrepreneur/mentors'); // Fetch list of mentors
                setMentors(mentorResponse.data); // Assuming this returns a list of mentors with names
                console.log('Mentors fetched successfully:', mentorResponse.data);
            } catch (error) {
                console.error('Error fetching mentors:', error.response?.data || error.message);
            }

            try {
                // Fetch sessions data
                const response = await axiosInstance.get('/entrepreneur/sessions');
                const data = response.data; // Axios handles parsing the JSON
                console.log('Sessions fetched successfully:', data);

                if (data && Array.isArray(data)) {
                    setSessions({
                        upcomingSessions: data.filter(session => session.status === 'Upcoming'),
                        pendingSessions: data.filter(session => session.status === 'Pending'),
                        completedSessions: data.filter(session => session.status === 'Completed')
                    });
                    console.log('Sessions state updated:', data);
                } else {
                    console.error('Unexpected response format for sessions:', data);
                }
            } catch (error) {
                console.error('Error fetching sessions:', error.response?.data || error.message);
            }
        };

        fetchProducts();
    }, []);

    // Handle product deletion
    const handleDeleteProduct = async (productId) => {
        console.log(`Attempting to delete product with ID: ${productId}`); // Debugging log
        try {
            await axiosInstance.delete(`/dashboard/entrepreneur/products/${productId}`);
            console.log(`Product with ID ${productId} deleted successfully`); // Debugging log
            setProducts(products.filter(product => product._id !== productId)); // Update state after deletion
        } catch (error) {
            console.error(`Error deleting product with ID ${productId}:`, error.response?.data || error.message); // Debugging log
        }
    };

    // Handle product editing
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            price: product.price,
            status: product.status,
        });
        console.log('Editing product:', product); // Debugging log
    };

    // Handle form data change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log('Form data changed:', formData); // Debugging log
    };

    // Handle form submission (Update product)
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        console.log('Updating product with ID:', editingProduct._id); // Debugging log

        try {
            const updatedProduct = {
                ...formData,
            };

            // Optimistically update the UI before the request finishes
            setProducts(products.map(product =>
                product._id === editingProduct._id ? { ...product, ...updatedProduct } : product
            ));

            const response = await axiosInstance.put(`/dashboard/entrepreneur/products/${editingProduct._id}`, updatedProduct);
            console.log('Product updated successfully:', response.data);

            setEditingProduct(null); // Clear the editing state after update
        } catch (error) {
            console.error('Error updating product:', error.response?.data || error.message);
            // If the update fails, revert the optimistic update
            setProducts(products.map(product =>
                product._id === editingProduct._id ? { ...product, ...editingProduct } : product
            ));
        }
    };

    // Handle new session request form data change
    const handleNewSessionChange = (e) => {
        const { name, value } = e.target;
        setNewSessionRequest({
            ...newSessionRequest,
            [name]: value,  // Update the state with the selected value
        });
        console.log('New session request form data changed:', newSessionRequest);
    };

    // Handle new session request submission

    const handleRequestSession = async (e) => {
        e.preventDefault();
        console.log('Requesting new session with data:', newSessionRequest); // Debugging log
        try {
            const response = await axiosInstance.post('/mentorship/mentee/sessions', newSessionRequest);
            console.log('New session request submitted:', response.data.message); // Success message
            setNewSessionRequest({ mentorId: '', schedule: '', topics: [] }); // Clear form after submission
            // Reload the page to fetch the latest session data
            window.location.reload();
        } catch (error) {
            console.error('Error requesting session:', error.response?.data || error.message);
        }
    };

    return (
        <div className="dashboard">
            <h2>Welcome, Entrepreneur</h2>

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
                            <option value="available">Available</option>
                            <option value="out of stock">Out of Stock</option>
                            <option value="discontinued">Discontinued</option>
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

            {/* Sessions Section */}
            <div>
                <h3>Your Sessions</h3>

                {/* Upcoming Sessions */}
                <h4>Upcoming Sessions</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Mentor</th>
                            <th>Schedule</th>
                            <th>Topics</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.upcomingSessions.length > 0 ? (
                            sessions.upcomingSessions.map((session) => (
                                <tr key={session._id}>
                                    <td>{session.mentorId.name}</td>
                                    <td>{new Date(session.schedule).toLocaleString()}</td>
                                    <td>{session.topics.join(', ')}</td>
                                    <td>{session.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No upcoming sessions.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pending Sessions */}
                <h4>Pending Sessions</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Mentor</th>
                            <th>Schedule</th>
                            <th>Topics</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.pendingSessions.length > 0 ? (
                            sessions.pendingSessions.map((session) => (
                                <tr key={session._id}>
                                    <td>{session.mentorId.name}</td>
                                    <td>{new Date(session.schedule).toLocaleString()}</td>
                                    <td>{session.topics.join(', ')}</td>
                                    <td>{session.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No pending sessions.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Completed Sessions */}
                <h4>Completed Sessions</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Mentor</th>
                            <th>Schedule</th>
                            <th>Topics</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.completedSessions.length > 0 ? (
                            sessions.completedSessions.map((session) => (
                                <tr key={session._id}>
                                    <td>{session.mentorId.name}</td>
                                    <td>{new Date(session.schedule).toLocaleString()}</td>
                                    <td>{session.topics.join(', ')}</td>
                                    <td>{session.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No completed sessions.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Request a New Session */}
                <h4>Request a New Session</h4>
                <form onSubmit={handleRequestSession}>
                    <label>Mentor</label>
                    <select
                        name="mentorId"  // Changed name from mentorName to mentorId
                        value={newSessionRequest.mentorId}
                        onChange={handleNewSessionChange}
                        required
                    >
                        <option value="">Select Mentor</option>
                        {mentors.map((mentor) => (
                            <option key={mentor._id} value={mentor._id}>  {/* Use mentor._id instead of mentor.name */}
                                {mentor.name}
                            </option>
                        ))}
                    </select>

                    <label>Schedule</label>
                    <input
                        type="datetime-local"
                        name="schedule"
                        value={newSessionRequest.schedule}
                        onChange={handleNewSessionChange}
                        required
                    />


                    <label>Topics</label>
                    <select
                        name="topics"
                        value={newSessionRequest.topics}
                        onChange={handleNewSessionChange}
                        required
                    >
                        <option value="">Select Topic</option>
                        <option value="Agriculture & Farming">Agriculture & Farming</option>
                        <option value="Handicrafts & Artisan Work">Handicrafts & Artisan Work</option>
                        <option value="Business & Marketing">Business & Marketing</option>
                        <option value="Financial Literacy">Financial Literacy</option>
                        <option value="E-Commerce & Online Business">E-Commerce & Online Business</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Leadership & Empowerment">Leadership & Empowerment</option>
                        <option value="Sustainability & Environment">Sustainability & Environment</option>
                        <option value="Technology for Women Entrepreneurs">Technology for Women Entrepreneurs</option>
                    </select>


                    <button type="submit">Request Session</button>
                </form>
            </div>
        </div>
    );
};

export default EntrepreneurDashboard;
