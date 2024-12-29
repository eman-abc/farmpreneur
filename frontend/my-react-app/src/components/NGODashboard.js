// src/components/NGODashboard.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; // Adjust path to your Axios instance
// import './NGODashboard.css'; // Optional: Add your custom styles

const NGODashboard = () => {
    const [resources, setResources] = useState([]);
    const [aidPrograms, setAidPrograms] = useState([]);
    const [newResource, setNewResource] = useState({
        title: '',
        type: '',
        url: '',
        category: '',
    });
    const [newAid, setNewAid] = useState({
        title: '',
        description: '',
        amount: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch resources and aid programs data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [resourceResponse, aidResponse] = await Promise.all([
                    axios.get('/resource'), // Make sure to use the correct API endpoint
                    axios.get('/aid/my') // Make sure to use the correct API endpoint
                ]);
                setResources(resourceResponse.data);
                setAidPrograms(aidResponse.data);
            } catch (err) {
                setError('Failed to load dashboard data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []); // Empty dependency array means it runs once on mount

    // Add a new resource
    const handleAddResource = async () => {
        try {
            const response = await axios.post('/resource', newResource);
            setResources([...resources, response.data]);
            setNewResource({ title: '', type: '', url: '', category: '' });
        } catch (err) {
            console.error('Failed to add resource:', err);
        }
    };

    // Delete resource
    const handleDeleteResource = async (id) => {
        try {
            await axios.delete(`/resource/${id}`);
            setResources(resources.filter((resource) => resource._id !== id));
        } catch (err) {
            console.error('Failed to delete resource:', err);
        }
    };

    // Add a new aid program
    const handleAddAidProgram = async () => {
        try {
            const response = await axios.post('/aid', newAid);
            setAidPrograms([...aidPrograms, response.data]);
            setNewAid({ title: '', description: '', amount: '' });
        } catch (err) {
            console.error('Failed to add aid program:', err);
        }
    };



    // Delete aid program
    const handleDeleteAidProgram = async (id) => {
        try {
            console.log("Deleting aid program with ID:", id);  // Debugging line
            await axios.delete(`/aid/${id}`);
            setAidPrograms(aidPrograms.filter((aid) => aid._id !== id)); // Use _id instead of id
        } catch (err) {
            console.error('Failed to delete aid program:', err);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="ngo-dashboard">
            <h1>NGO Dashboard</h1>



            {/* Resource Management */}
            <section>
                <h2>Manage Resources</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddResource();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Resource Title"
                        value={newResource.title}
                        onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Resource URL"
                        value={newResource.url}
                        onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                        required
                    ></textarea>

                    {/* Resource Type Dropdown */}
                    <select
                        value={newResource.type}
                        onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                        required
                    >
                        <option value="">Select Resource Type</option>
                        <option value="PDF">PDF</option>
                        <option value="Video">Video</option>
                        <option value="Link">Link</option>
                    </select>

                    {/* Resource Category Dropdown */}
                    <select
                        value={newResource.category}
                        onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Product Development">Product Development</option>
                    </select>

                    <button type="submit">Add Resource</button>
                </form>

                <ul>
                    {resources.map((resource) => (
                        <li key={resource._id}>
                            <h3>{resource.title}</h3>
                            <p>Type: {resource.type}</p>
                            <p>Category: {resource.category}</p>
                            <p>URL: <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.url}</a></p>
                            <button onClick={() => handleDeleteResource(resource._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Aid Program Management */}
            <section>
                <h2>Manage Aid Programs</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddAidProgram();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Aid Title"
                        value={newAid.title}
                        onChange={(e) => setNewAid({ ...newAid, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Aid Description"
                        value={newAid.description}
                        onChange={(e) => setNewAid({ ...newAid, description: e.target.value })}
                        required
                    ></textarea>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newAid.amount}
                        onChange={(e) => setNewAid({ ...newAid, amount: e.target.value })}
                        required
                    />
                    <button type="submit">Add Aid Program</button>
                </form>

                <ul>
                    {aidPrograms.map((aid) => (
                        <li key={aid._id}> {/* Use _id as key */}
                            <h3>{aid.title}</h3>
                            <p>{aid.description}</p>
                            <p>Amount: {aid.amount}</p>
                            <button onClick={() => handleDeleteAidProgram(aid._id)}>Delete</button> {/* Pass _id here */}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default NGODashboard;
