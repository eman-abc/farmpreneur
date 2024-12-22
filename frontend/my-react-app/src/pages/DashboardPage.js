// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import UserProfile from '../components/Dashboard/UserProfile'; // Show user details
// import ProductList from '../components/Dashboard/ProductList'; // For users to see their products
// import MentorshipList from '../components/Dashboard/MentorshipList'; // For mentors to see mentorships
// import ResourceManagement from '../components/ResourceManagement'; // For NGOs to upload resources

// const DashboardPage = () => {
//     const [userData, setUserData] = useState(null);
//     const [role, setRole] = useState(null); // 'user', 'mentor', 'ngo'

//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
//             if (!token) {
//                 console.error('No token found');
//                 return;
//             }

//             try {
//                 const res = await fetch('/api/dashboard', {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Attach token to headers
//                     },
//                 });
//                 const data = await res.json();
//                 setUserData(data.user); // Set user data
//                 setRole(data.role); // Set role
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchDashboardData();
//     }, []);


//     if (!userData) return <div>Loading...</div>;

//     return (
//         <Container>
//             <Row>
//                 <Col md={4}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>User Profile</Card.Title>
//                             <UserProfile user={userData} />
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={8}>
//                     {role === 'user' && (
//                         <Card>
//                             <Card.Body>
//                                 <Card.Title>Your Products</Card.Title>
//                                 <ProductList products={userData.products} />
//                                 <Button className="mt-3">Add New Product</Button>
//                             </Card.Body>
//                         </Card>
//                     )}
//                     {role === 'mentor' && (
//                         <Card>
//                             <Card.Body>
//                                 <Card.Title>Your Mentorships</Card.Title>
//                                 <MentorshipList mentorships={userData.mentorships} />
//                             </Card.Body>
//                         </Card>
//                     )}
//                     {role === 'ngo' && (
//                         <Card>
//                             <Card.Body>
//                                 <Card.Title>Manage Resources</Card.Title>
//                                 <ResourceManagement resources={userData.resources} />
//                                 <Button className="mt-3">Upload New Resource</Button>
//                             </Card.Body>
//                         </Card>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default DashboardPage;


const DashboardPage = ({ data }) => {
    return (
        <div>
            <h1>Welcome, {data.user.name}</h1>
            <p>Email: {data.user.email}</p>
            <p>Role: {data.user.role}</p>
            <p>Location: {data.user.location}</p>
            <img src={data.user.profileImage} alt="Profile" />
            {/* Render other details as needed */}
        </div>
    );
};

export default DashboardPage;

