import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // Import your Axios instance

const ResourceList = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axiosInstance.get('/resource'); // Fetch resources
                setResources(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching resources:', error.response?.data || error.message);
            }
        };

        fetchResources();
    }, []);

    return (
        <div className="resource-list">
            <h3>Available Resources</h3>
            {resources.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Creator</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.map((resource) => (
                            <tr key={resource._id}>
                                <td>{resource.title}</td>
                                <td>{resource.description || 'No description available'}</td>
                                <td>{resource.category}</td>
                                <td>{resource.createdBy?.name || 'Unknown'}</td> {/* Display creator name */}
                                <td>{resource.createdBy?.email || 'ngo@example.com'}</td> {/* Display creator name */}
                                <td><a href={resource.url} target="_blank" rel="noopener noreferrer">Visit</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No resources available.</p>
            )}
        </div>
    );
};

export default ResourceList;
