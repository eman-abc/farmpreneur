import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const NGODashboard = () => {
    const [resources, setResources] = useState([]);
    const [aidPrograms, setAidPrograms] = useState([]);
    const [newResource, setNewResource] = useState({
        title: '',
        url: '',
        category: '',
        description: '',
    });
    const [newAid, setNewAid] = useState({
        title: '',
        description: '',
        amount: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingResource, setEditingResource] = useState(null);
    const [editingAid, setEditingAid] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [resourceResponse, aidResponse] = await Promise.all([
                    axios.get('/resource/my'),
                    axios.get('/aid/my')
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
    }, []);

    const handleAddResource = async () => {
        try {
            const response = await axios.post('/resource', newResource);
            setResources([...resources, response.data]);
            setNewResource({ title: '', url: '', category: '', description: '' });
        } catch (err) {
            console.error('Failed to add resource:', err);
        }
    };

    const handleUpdateResource = async () => {
        try {
            const response = await axios.put(`/resource/${editingResource._id}`, newResource);
            setResources(resources.map((resource) =>
                resource._id === editingResource._id ? response.data : resource
            ));
            setNewResource({ title: '', url: '', category: '', description: '' });
            setEditingResource(null);
        } catch (err) {
            console.error('Failed to update resource:', err);
        }
    };

    const handleDeleteResource = async (id) => {
        try {
            await axios.delete(`/resource/${id}`);
            setResources(resources.filter((resource) => resource._id !== id));
        } catch (err) {
            console.error('Failed to delete resource:', err);
        }
    };

    const handleAddAidProgram = async () => {
        try {
            const response = await axios.post('/aid', newAid);
            setAidPrograms([...aidPrograms, response.data]);
            setNewAid({ title: '', description: '', amount: '' });
        } catch (err) {
            console.error('Failed to add aid program:', err);
        }
    };

    const handleUpdateAidProgram = async () => {
        try {
            const response = await axios.put(`/aid/${editingAid._id}`, newAid);
            setAidPrograms(aidPrograms.map((aid) =>
                aid._id === editingAid._id ? response.data : aid
            ));
            setNewAid({ title: '', description: '', amount: '' });
            setEditingAid(null);
        } catch (err) {
            console.error('Failed to update aid program:', err);
        }
    };

    const handleDeleteAidProgram = async (id) => {
        try {
            await axios.delete(`/aid/${id}`);
            setAidPrograms(aidPrograms.filter((aid) => aid._id !== id));
        } catch (err) {
            console.error('Failed to delete aid program:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ backgroundColor: '#EDE1D2', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#412F26' }}>
            <h1 style={{ color: '#6A6F4C', textAlign: 'center' }}>NGO Dashboard</h1>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ color: '#5D2510' }}>Manage Resources</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (editingResource) {
                            handleUpdateResource();
                        } else {
                            handleAddResource();
                        }
                    }}
                    style={{ marginBottom: '20px' }}
                >
                    <input
                        type="text"
                        placeholder="Resource Title"
                        value={newResource.title}
                        onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                        required
                        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #806044', borderRadius: '5px' }}
                    />
                    <textarea
                        placeholder="Resource URL"
                        value={newResource.url}
                        onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                        required
                        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #806044', borderRadius: '5px' }}
                    ></textarea>
                    <textarea
                        placeholder="Resource Description"
                        value={newResource.description}
                        onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                        required
                        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #806044', borderRadius: '5px' }}
                    ></textarea>
                    <select
                        value={newResource.category}
                        onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                        required
                        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #806044', borderRadius: '5px', backgroundColor: '#FFF' }}
                    >
                        <option value="">Select Category</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Product Development">Product Development</option>
                    </select>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#806044', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        {editingResource ? 'Update Resource' : 'Add Resource'}
                    </button>
                </form>

                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {resources.length === 0 ? (
                        <p>No resources available.</p>
                    ) : (
                        resources.map((resource) => (
                            <li key={resource._id} style={{ border: '1px solid #806044', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                                <h3>{resource.title}</h3>
                                <p>Description: {resource.description}</p>
                                <p>Category: {resource.category}</p>
                                <p>URL: <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{ color: '#5D2510' }}>{resource.url}</a></p>
                                <button onClick={() => {
                                    setEditingResource(resource);
                                    setNewResource({
                                        title: resource.title,
                                        url: resource.url,
                                        description: resource.description,
                                        category: resource.category
                                    });
                                }} style={{ padding: '5px 10px', marginRight: '10px', backgroundColor: '#5D2510', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDeleteResource(resource._id)} style={{ padding: '5px 10px', backgroundColor: '#412F26', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                            </li>
                        ))
                    )}
                </ul>
            </section>

            <section>
                <h2 style={{ color: '#5D2510' }}>Manage Aid Programs</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (editingAid) {
                            handleUpdateAidProgram();
                        } else {
                            handleAddAidProgram();
                        }
                    }}
                    style={{ marginBottom: '20px' }}
                >
                    <input
                        type="text"
                        placeholder="Aid Title"
                        value={newAid.title}
                        onChange={(e) => setNewAid({ ...newAid, title: e.target.value })}
                        required
                        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #806044', borderRadius: '5px' }}
                    />
                    <textarea
                        placeholder="Aid Description"
                        value={newAid.description}
                        onChange={(e) => setNewAid({ ...newAid, description: e.target.value })}
                        required
                        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #806044', borderRadius: '5px' }}
                    ></textarea>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newAid.amount}
                        onChange={(e) => setNewAid({ ...newAid, amount: e.target.value })}
                        required
                        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #806044', borderRadius: '5px' }}
                    />
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#806044', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        {editingAid ? 'Update Aid Program' : 'Add Aid Program'}
                    </button>
                </form>

                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {aidPrograms.map((aid) => (
                        <li key={aid._id} style={{ border: '1px solid #806044', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                            <h3>{aid.title}</h3>
                            <p>{aid.description}</p>
                            <p>Amount: {aid.amount}</p>
                            <button onClick={() => {
                                setEditingAid(aid);
                                setNewAid({
                                    title: aid.title,
                                    description: aid.description,
                                    amount: aid.amount
                                });
                            }} style={{ padding: '5px 10px', marginRight: '10px', backgroundColor: '#5D2510', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => handleDeleteAidProgram(aid._id)} style={{ padding: '5px 10px', backgroundColor: '#412F26', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default NGODashboard;
