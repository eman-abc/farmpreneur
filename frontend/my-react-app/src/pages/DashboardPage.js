import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // Import the custom axios instance
import UserProfile from '../components/UserProfile'; // Adjust the path based on your file structure
import EntrepreneurDashboard from '../components/EnterpreneurDashboard';
import MentorDashboard from '../components/MentorDashboard';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const DashboardPage = () => {
    const [userData, setUserData] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate(); // Initialize useNavigate hook for redirection


    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Use the custom axios instance to fetch data
                const response = await axios.get('/dashboard'); // Just use the path part, baseURL is already set
                setUserData(response.data.user); // Set user data from the response
            } catch (err) {
                setError(err.response?.data?.message || err.message); // Handle errors
                // Check if the error message is unauthorized (401)
                if (err.response?.status === 401) {
                    // Redirect to the login page
                    navigate('/login'); // You can replace '/login' with the correct path of your login page
                }
            } finally {
                setLoading(false); // Stop loading after the request is done
            }
        };

        fetchDashboardData();
    },  [navigate]);
    

    if (loading) return <div>Loading...</div>; // Show loading spinner/message
    if (error) return <div>Error: {error}</div>; // Display error messages
    if (!userData) return <div>Error: Unable to load user data</div>; // Fallback in case of unexpected issues

    return (
        <div>
            <h1>Dashboard</h1>
            <UserProfile user={userData} /> {/* Pass user data to the UserProfile component */}

            {/* Entrepreneur Dashboard */}
            {userData.role === 'Entrepreneur' && (
                <div>
                    <EntrepreneurDashboard />
                </div>
            )}

            {/* Mentor Dashboard */}
            {userData.role === 'Mentor' && (
                <div>
                    <div>
                        <MentorDashboard />
                    </div>
                </div>
            )}

            {/* NGO Dashboard */}
            {userData.role === 'ngo' && (
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
