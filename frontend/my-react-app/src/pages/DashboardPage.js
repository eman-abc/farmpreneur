import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext'; // Import the custom auth context hook
import UserProfile from '../components/UserProfile'; // Adjust the path based on your file structure
import EntrepreneurDashboard from '../components/EntrepreneurDashboard';
import MentorDashboard from '../components/MentorDashboard';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import NGODashboard from '../components/NGODashboard';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap'; // Added some useful Bootstrap components
import AidList from '../components/AidList';
import ResourceList from '../components/ResourceList';

const DashboardPage = () => {
    const { user, loading } = useAuth(); // Access user and loading from AuthContext
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate(); // Initialize useNavigate hook for redirection

    useEffect(() => {
        if (!loading && !user) {
            // Redirect to login if the user is not authenticated
            navigate('/login');
        }
    }, [loading, user, navigate]);

    // Show loading spinner/message if still loading
    if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><Spinner animation="border" variant="primary" /></div>;

    // Show error message if any
    if (error) return <Alert variant="danger">{error}</Alert>;

    // Fallback in case of unexpected issues
    if (!user) return <Alert variant="danger">Error: Unable to load user data</Alert>;

    return (
        <Container className="my-5">
            <Row>
                <Col md={4}>
                    <div className="border p-4 shadow-sm rounded bg-Coconut">
                        <UserProfile user={user} /> {/* Pass user data to the UserProfile component */}
                    </div>
                </Col>
                <Col md={8}>
                    <div className="border p-4 shadow-sm rounded bg-Butter">
                        <h2 className="text-center mb-4" style={{ color: '#5D2510' }}>Dashboard</h2>

                        {/* Entrepreneur Dashboard */}
                        {user.role === 'Entrepreneur' && (
                            <div className="dashboard-section">
                                <EntrepreneurDashboard />
                            </div>
                        )}

                        {/* Mentor Dashboard */}
                        {user.role === 'Mentor' && (
                            <div className="dashboard-section">
                                <MentorDashboard />
                            </div>
                        )}

                        {/* NGO Dashboard */}
                        {user.role === 'NGO' && (
                            <div className="dashboard-section">
                                <NGODashboard />
                            </div>
                        )}


                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardPage;
