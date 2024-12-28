import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext'; // Import the custom auth context hook
import UserProfile from '../components/UserProfile'; // Adjust the path based on your file structure
import EntrepreneurDashboard from '../components/EnterpreneurDashboard';
import MentorDashboard from '../components/MentorDashboard';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

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
    if (loading) return <div>Loading...</div>; 

    // Show error message if any
    if (error) return <div>Error: {error}</div>;

    // Fallback in case of unexpected issues
    if (!user) return <div>Error: Unable to load user data</div>;

    return (
        <div>
            <h1>Dashboard</h1>
            <UserProfile user={user} /> {/* Pass user data to the UserProfile component */}

            {/* Entrepreneur Dashboard */}
            {user.role === 'Entrepreneur' && (
                <div>
                    <EntrepreneurDashboard />
                </div>
            )}

            {/* Mentor Dashboard */}
            {user.role === 'Mentor' && (
                <div>
                    <MentorDashboard />
                </div>
            )}

            {/* NGO Dashboard */}
            {user.role === 'NGO' && (
                <div>
                    <h2>Available Resources</h2>
                    <ul>
                        {/* Example: Replace with real data */}
                        <li>Resource A</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
