import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // Import your Axios instance
import { Card, Table, Button } from 'react-bootstrap'; // Import Bootstrap components
import '../assets/cssfiles/resourceList.css';

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
        <div className="container mt-5">
            <Card className="shadow-sm" style={{ backgroundColor: '#EDE1D2', borderRadius: '10px' }}>
                <Card.Header as="h3" className="text-center" style={{ color: '#6A6F4C', fontWeight: 'bold' }}>
                    Available Resources
                </Card.Header>
                <Card.Body>
                    {resources.length > 0 ? (
                        <Table striped bordered hover responsive className="resource-table">
                            <thead>
                                <tr style={{ backgroundColor: '#6A6F4C', color: '#EDE1D2' }}>
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
                                        <td>{resource.createdBy?.name || 'Unknown'}</td>
                                        <td>
                                            <Button
                                                variant="link"
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    backgroundColor: '#5D2510', 
                                                    color: '#EDE1D2',
                                                    padding: '0.5rem 1.5rem',
                                                    borderRadius: '5px',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'none',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                                }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#412F26'} // Cocoa on hover
                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#5D2510'} // Palm Oil on hover out
                                            >
                                                Visit
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-center" style={{ color: '#412F26' }}>No resources available.</p>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default ResourceList;
