import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaWhatsapp, FaYoutube, FaEnvelope } from 'react-icons/fa';
import '../assets/cssfiles/footer.css';

function Footer() {
    return (
        <footer className="footer-custom mt-5">
            <Container>
                {/* Newsletter Section */}
                <Row className="newsletter-section">
                    <Col md={12}>
                        <h3>Join Our Farmpreneur Newsletter</h3>
                        <Form className="newsletter-form">
                            <Form.Group className="d-flex align-items-center">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    className="newsletter-input"
                                />
                                <Button variant="light" className="btn-subscribe ms-2">Subscribe</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <hr className="footer-divider" />

                {/* Footer Content */}
                <Row className="footer-content">
                    <Col md={4} className="footer-section">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/skill-resource">Skill Resource</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/marketplace">Marketplace</Link></li>
                            <li><Link to="/mentorship">Mentorship</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </Col>
                    <Col md={4} className="footer-section">
                        <h5>Farmpreneur</h5>
                        <p>Empowering Rural Entrepreneurs</p>
                    </Col>
                    <Col md={4} className="footer-section">
                        <h5>Connect with Us</h5>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer">
                                <FaFacebook />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
                                <FaWhatsapp />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer">
                                <FaYoutube />
                            </a>
                            <a href="mailto:support@farmpreneur.com" target="_blank" rel="noreferrer">
                                <FaEnvelope />
                            </a>
                        </div>
                    </Col>
                </Row>
                <hr className="footer-divider" />

                {/* Footer Bottom */}
                <Row>
                    <Col md={6}>
                        <span className="branding">FARMPRENEUR</span>
                    </Col>
                    <Col md={6} className="text-end">
                        <p>&copy; 2024 Farmpreneur. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
