import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import axiosInstance from '../api/axios'; // Import your axios instance

const LoginPage = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Switch between login and register
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null); // State to store user data
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            
            if (response.status === 200) {
                setUserData(response.data.user); // Set user data here
                onLoginSuccess(response.data.user); // Update user state in App.js
                navigate('/dashboard', { replace: true }); // Redirect to dashboard after successful login
            } else {
                setError('Unexpected response from server');
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Server error. Please try again later.');
        }
    };
    
    

    // Handle registration request
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axiosInstance.post('/auth/register', {
                name,
                email,
                password,
                role,
                location,
                contactNumber,
            });

            if (response.status === 201) {
                alert('Registration successful');
                setIsLogin(true); // Switch to login page after successful registration
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Server error. Please try again later.');
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
                {/* If not login, show name input */}
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}

                {/* Email input */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password input */}
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* If not login, show additional registration inputs */}
                {!isLogin && (
                    <>
                        <div className="form-group">
                            <label htmlFor="role">Role:</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="Entrepreneur">Entrepreneur</option>
                                <option value="Mentor">Mentor</option>
                                <option value="Admin">Admin</option>
                                <option value="NGO">NGO</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactNumber">Contact Number:</label>
                            <input
                                type="text"
                                id="contactNumber"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                {/* Show error message if any */}
                {error && <div className="error-message">{error}</div>}

                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>

            <div>
                {isLogin ? (
                    <p>
                        Don't have an account?{' '}
                        <span onClick={() => setIsLogin(false)} className="link">Register</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setIsLogin(true)} className="link">Login</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
