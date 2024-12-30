import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import profileImage from '../assets/images/defaultImage.jpeg';

const About = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Handle form submission
    };

    return (
        <div style={{ backgroundColor: '#EDE1D2', padding: '20px' }}>
            {/* About Header */}
            <Row style={{ textAlign: 'center', marginBottom: '40px' }}>
                <Col>
                    <h1 style={{ color: '#6A6F4C', fontWeight: 'bold' }}>About Farmpreneur</h1>
                    <p style={{ color: '#412F26', fontSize: '18px' }}>
                        Transforming the lives of rural women through innovation, education, and entrepreneurship.
                    </p>
                </Col>
            </Row>

            {/* Our Goals Section */}
            <Row style={{ marginBottom: '40px', justifyContent: 'center' }}>
                <h2 style={{ color: '#6A6F4C', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Our Goals</h2>
                {[
                    { title: 'Inspire Growth', icon: 'bi-lightbulb', text: 'Empower women to unlock their potential through training, mentorship, and cutting-edge tools.' },
                    { title: 'Encourage Unity', icon: 'bi-handshake', text: 'Build a vibrant network of like-minded individuals to foster collaboration and shared success.' },
                    { title: 'Expand Opportunities', icon: 'bi-rocket', text: 'Provide rural entrepreneurs with access to global markets and a platform to showcase their talents.' },
                ].map((goal, index) => (
                    <Col key={index} md={4} style={{ marginBottom: '20px' }}>
                        <Card style={{ backgroundColor: '#FFFFFF', borderColor: '#806044', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Card.Body style={{ textAlign: 'center', padding: '20px' }}>
                                <i
                                    className={`bi ${goal.icon}`}
                                    style={{ fontSize: '2rem', color: '#806044', marginBottom: '10px' }}
                                ></i>
                                <Card.Title style={{ color: '#412F26', fontWeight: 'bold' }}>{goal.title}</Card.Title>
                                <Card.Text style={{ color: '#5D2510' }}>{goal.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Success Stories Section */}
            <Row style={{ justifyContent: 'center', backgroundColor: '#EDE1D2', padding: '20px', borderRadius: '10px' }}>
                <h2 style={{ color: '#6A6F4C', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Our Success Stories</h2>
                <Row style={{ maxWidth: '900px', margin: '0 auto', alignItems: 'center' }}>
                    <Col md={4} style={{ textAlign: 'center' }}>
                        <img
                            src={profileImage}
                            alt="Success Story Profile"
                            style={{
                                width: '150px',
                                borderRadius: '50%',
                                border: '4px solid #806044',
                                marginBottom: '15px',
                            }}
                        />
                        <h4 style={{ color: '#412F26', fontWeight: 'bold' }}>Fatima Ahmed</h4>
                        <p style={{ color: '#5D2510' }}>Entrepreneur, Sindh</p>
                    </Col>
                    <Col md={8}>
                        <Card style={{ backgroundColor: '#FFFFFF', borderColor: '#806044', borderRadius: '10px', padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Card.Body>
                                <Card.Text style={{ color: '#412F26', fontSize: '16px', lineHeight: '1.6' }}>
                                    Fatima, a determined woman from a small village in Sindh, had always dreamed of turning her
                                    family’s traditional embroidery into a business. But without access to the right tools and
                                    markets, her skills remained underutilized.
                                </Card.Text>
                                <Card.Text style={{ color: '#412F26', fontSize: '16px', lineHeight: '1.6' }}>
                                    After joining FarmPreneur, Fatima attended webinars on entrepreneurship and learned how to
                                    price her products competitively. With guidance from her mentor, she built an online presence
                                    and started listing her embroidered shawls on the platform.
                                </Card.Text>
                                <Card.Text style={{ color: '#412F26', fontSize: '16px', lineHeight: '1.6' }}>
                                    Within months, her business gained traction. Orders poured in from across Pakistan, and
                                    Fatima’s work was even featured in a regional handicrafts exhibition. Today, Fatima employs
                                    five other women from her community, empowering them to earn an income while preserving their
                                    cultural heritage.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </div>
    );
};

export default About;
