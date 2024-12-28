import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Import the custom auth context hook
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom'; // Renamed import
import axiosInstance from '../api/axios'; // Import your axios instance

const LoginPage = () => {
    const { login, user } = useAuth(); // Use the login method from AuthContext
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false); // To toggle between Login and Register forms
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [userLocation, setUserLocation] = useState(''); // Renamed state to avoid conflict
    const [role, setRole] = useState('');  // Role for registration
    const navigate = useNavigate();
    const location = useRouterLocation(); // Renamed import

    // Redirect to dashboard if the user is already logged in
    if (user) {
        console.log(location.pathname);
        const redirectTo = location.state?.from?.pathname || '/marketplace';
        navigate(redirectTo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Use the login function from AuthContext
            await login({ email, password });

            if (user && location.pathname !== '/login') {
                const redirectTo = location.state?.from?.pathname || '/marketplace';
                navigate(redirectTo);
            }

        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Register new user
            const response = await axiosInstance.post('/api/auth/register', {
                name,
                email,
                password,
                contactNumber,
                location: userLocation, // Using renamed state
                role,
            });
            alert('Registration successful, please log in');
            setIsRegistering(false);  // Toggle back to login after successful registration
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>

            {/* Toggle between Login and Register Forms */}
            {isRegistering ? (
                <form onSubmit={handleRegister}>
                    {/* Name input */}
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

                    {/* Contact Number input */}
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

                    {/* Location input */}
                    <div className="form-group">
                        <label htmlFor="userLocation">Location:</label>
                        <input
                            type="text"
                            id="userLocation"
                            value={userLocation}
                            onChange={(e) => setUserLocation(e.target.value)}
                            required
                        />
                    </div>

                    {/* Role input */}
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            {/* Add more roles as needed */}
                        </select>
                    </div>

                    {/* Show error message if any */}
                    {error && <div className="error-message">{error}</div>}

                    <button type="submit">Register</button>
                </form>
            ) : (
                <form onSubmit={handleLogin}>
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

                    {/* Show error message if any */}
                    {error && <div className="error-message">{error}</div>}

                    <button type="submit">Login</button>
                </form>
            )}

            <div>
                {isRegistering ? (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setIsRegistering(false)} className="link">
                            Login here
                        </span>
                    </p>
                ) : (
                    <p>
                        Don't have an account?{' '}
                        <span onClick={() => setIsRegistering(true)} className="link">
                            Register here
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
