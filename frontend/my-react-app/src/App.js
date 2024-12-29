import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // Auth Context
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailsPage from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import Footer from './components/Footer';
import Header from './components/Header';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Or a loading spinner

    return user ? children : <Navigate to="/login" />;
};

// Separate Routes Component
const AppRoutes = () => {
    const { user, logout } = useAuth(); // Extract the user state from AuthContext
    const isLoggedIn = !!user; // Checks if the user is logged in
    const handleLogout = () => {
        logout(); // Calls the logout function from AuthContext
    };
    return (
        <>
            {/* Place Header above Routes */}
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>

                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />

                {/* Protect the cart route */}
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <CartPage />
                        </ProtectedRoute>
                    }
                />

                {/* Login page is public */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protect the dashboard route */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                {/* {checkout route} */}
                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <CheckoutPage />
                        </ProtectedRoute>
                    }
                />

                {/* Other routes */}
                <Route
                    path="/order-confirmation"
                    element={
                        <ProtectedRoute>
                            <OrderConfirmationPage />
                        </ProtectedRoute>
                    }
                />

                {/* Default route */}
                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/marketplace"} />} />

            </Routes >
            {/* Place Footer below Routes */}
            <Footer />
        </>
    );
};

const App = () => {
    return (
        <AuthProvider> {/* Wrap the app in the AuthProvider */}

            <AppRoutes />
        </AuthProvider>
    );
};

export default App;
