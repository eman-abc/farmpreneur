import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import defaultImage from '../assets/images/defaultImage.jpeg';
import '../assets/cssfiles/userProfile.css';

const UserProfile = ({ user }) => {
  return (
    <Card className="user-profile shadow-sm mb-4">
      {/* User Image */}
      <Card.Img
        variant="top"
        src={defaultImage}
        alt="User Profile"
        className="user-profile-img"
      />

      <Card.Body className="text-center user-profile-body">
        {/* User Name and Role */}
        <Card.Title className="user-profile-name">{user.name}</Card.Title>
        <Card.Subtitle className="user-profile-role mb-3">{user.role}</Card.Subtitle>

        {/* User Information */}
        <Card.Text className="user-profile-info">
          <strong>Email: </strong>{user.email}<br />
          <strong>Location: </strong>{user.location}<br />
          <strong>Contact: </strong>{user.contactNumber}
        </Card.Text>
      </Card.Body>

      {/* Member since date */}
      <Card.Footer className="text-center user-profile-footer">
        <ListGroup variant="flush">
          <ListGroup.Item className="user-profile-footer-item">
            <strong>Member since: </strong>{new Date(user.createdAt).toLocaleDateString()}
          </ListGroup.Item>
        </ListGroup>
      </Card.Footer>
    </Card>
  );
};

export default UserProfile;
