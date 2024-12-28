import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from './api/axios'; // Axios instance for API calls
import { useNavigate, useLocation } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

// Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Check session on app load, but skip it for Marketplace page
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('/auth/check-session', { withCredentials: true });
                setUser(response.data.user);
            } catch (err) {
                setUser(null);
                console.error('Session check failed:', err.response?.data?.message || 'Error');
            } finally {
                setLoading(false); // Always stop loading after the session check
            }
        };

        if (location.pathname === '/marketplace') {
            setLoading(false); // Skip session check for the marketplace page
        } 
        else if (location.pathname === '/login') {
            setLoading(false); // Skip session check for the login page
        }
        else {
            checkSession(); // Check session for other pages
        }
    }, [location.pathname]);


    // Login function
    const login = async (credentials) => {
        try {
            const response = await axios.post('/auth/login', credentials, { withCredentials: true });
            setUser(response.data.user);
            navigate(location.state?.from || '/dashboard'); // Redirect to the page the user tried to access before login
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Login failed');
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.post('/auth/logout', {}, { withCredentials: true });
            setUser(null); // Clear user data
            navigate('/login'); // Redirect to login page
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
