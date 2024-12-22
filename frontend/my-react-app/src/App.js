import React, { useState, useEffect } from 'react';
import DashboardPage from './pages/DashboardPage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        // Simulate login with email (no username)
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'inaya@example.com', password: 'password123' }),
            credentials: 'include', // Ensure session cookies are sent
        })

            .then((res) => {
                if (res.ok) {
                    setIsLoggedIn(true);
                    alert('Logged in');
                } else {
                    alert('Invalid credentials');
                }
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetch('http://localhost:5000/api/dashboard', {
                method: 'GET',
                credentials: 'include', // Ensure session cookie is included
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Unauthorized');
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log('Fetched dashboard data:', data);  // Check the data here
                    setDashboardData(data); // Store the data in state
                })
                
                .catch((err) => {
                    console.error('Error fetching dashboard data:', err);
                });
        }
    }, [isLoggedIn]);



    return (
        <div>
            {isLoggedIn ? (
                dashboardData ? (
                    <DashboardPage data={dashboardData} />
                ) : (
                    <div>Loading dashboard...</div>
                )
            ) : (
                <div>Loading...</div> // Show loading screen until the user is logged in
            )}
        </div>
    );
    
};

export default App;
