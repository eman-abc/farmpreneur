import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom'; // Use Navigate for redirect in React Router v6
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check the authentication status when the component mounts
    fetch('http://localhost:5000/api/dashboard', {
      method: 'GET',
      credentials: 'include', // Ensure session cookies are included
    })
      .then((res) => {
        if (res.status === 401) {
          setIsLoggedIn(false); // User is not logged in
          return;
        }
        setIsLoggedIn(true); // User is logged in
      })
      .catch((err) => {
        console.error('Error checking auth status:', err);
      });
  }, []);

  return isLoggedIn;
};

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = useAuth(); // Check if user is logged in
  const navigate = useNavigate(); // useNavigate hook in place of history

  return (
    <Route
      {...rest}
      element={isLoggedIn ? Component : <Navigate to="/login" />} // Use Navigate to redirect if not logged in
    />
  );
};

export default PrivateRoute;
