import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Use only the new import
import LoginPage from './pages/LoginPage'; // Update import for LoginPage
import DashboardPage from './pages/DashboardPage'; // Your Dashboard component

const App = () => {
    const [user, setUser] = useState(null); // Store logged-in user

    const handleLoginSuccess = (userData) => {
        setUser(userData); // Update user state on successful login
    };

    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
            />

            {/* Redirect to login if user is not authenticated */}
            <Route
                path="/dashboard"
                element={user ? <DashboardPage /> : <Navigate to="/login" />}
            />

            {/* Default route to redirect to login if the user is not logged in */}
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
    );
};

export default App;
