import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const MentorshipList = ({ mentorships }) => {
  return (
    <div>
      <h5>Your Mentorship Sessions</h5>
      <ListGroup>
        {mentorships.length > 0 ? (
          mentorships.map((session) => (
            <ListGroup.Item key={session._id}>
              <h6>Mentee: {session.menteeName}</h6>
              <p><strong>Session Date:</strong> {new Date(session.sessionDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {session.status}</p>
              {/* You can add action buttons like Accept, Reject, etc. */}
              {session.status === 'Scheduled' && (
                <Button variant="success" className="mr-2">
                  Mark as Completed
                </Button>
              )}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No mentorship sessions scheduled.</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default MentorshipList;
