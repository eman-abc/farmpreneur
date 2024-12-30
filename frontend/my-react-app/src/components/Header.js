import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/cssfiles/header.css';
import { useAuth } from '../AuthContext';

function Header() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header>
            <Navbar variant="dark" expand="lg" className="header-navbar">
                <Container>
                    <Navbar.Brand as={Link} to="/marketplace">Farmpreneur</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {user && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
                            <Nav.Link as={Link} to="/marketplace">Marketplace</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>

                            {/* Cart Button with Icon */}
                            {user && (
                                <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
                                    <FaShoppingCart style={{ marginRight: '5px' }} /> Cart
                                </Nav.Link>
                            )}

                            {user ? (
                                <Nav.Link
                                    as="button"
                                    onClick={handleLogout}
                                    className="login-link"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        color: 'inherit',
                                    }}
                                >
                                    Logout
                                </Nav.Link>
                            ) : (
                                <Nav.Link as={Link} to="/login" className="login-link">Login</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;