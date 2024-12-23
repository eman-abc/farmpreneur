import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const UserProfile = ({ user }) => {
  return (
    <Card>
      <Card.Img variant="top" src={user.profileImage || 'default-image.jpg'} />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.role}</Card.Subtitle>
        <Card.Text>
          <strong>Email: </strong>{user.email}<br />
          <strong>Location: </strong>{user.location}<br />
          <strong>Contact: </strong>{user.contactNumber}
        </Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>Member since: {new Date(user.createdAt).toLocaleDateString()}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default UserProfile;
