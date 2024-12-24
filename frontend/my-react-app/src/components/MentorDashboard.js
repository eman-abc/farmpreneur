import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // Assuming you have a custom axios instance

const MentorDashboard = () => {
    const [mentorshipSessions, setMentorshipSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newTopic, setNewTopic] = useState({
        title: '',
        description: '',
        category: '',
    });
    const [editTopicId, setEditTopicId] = useState(null);
    const [mentorshipTopics, setMentorshipTopics] = useState([]);

    const mentorId = 'loggedInMentorId'; // Replace with actual logged-in mentor ID

    const [feedbackData, setFeedbackData] = useState({
        sessionId: '',
        feedback: '',
    });

    const [rescheduleData, setRescheduleData] = useState({
        sessionId: '',
        newSchedule: '',
    });

    const [topicsData, setTopicsData] = useState({
        sessionId: '',
        topics: [],
    });

    // Fetch all mentorship sessions for the mentor
    useEffect(() => {

        const fetchMentorshipTopics = async () => {
            try {
                const response = await axios.get(`/mentorship/topics`);
                setMentorshipTopics(response.data);
            } catch (err) {
                setError('Error fetching mentorship topics');
            } finally {
                setLoading(false);
            }
        };

        const fetchSessions = async () => {
            try {
                const response = await axios.get('/mentorship/mentor/sessions');
                setMentorshipSessions(response.data);
            } catch (err) {
                setError('Error fetching mentorship sessions');
            } finally {
                setLoading(false);
            }
        };
        fetchMentorshipTopics();
        fetchSessions();
    }, [mentorId]);

    // Approve a session
    const handleApproveSession = async (sessionId) => {
        try {
            const response = await axios.patch(`/mentorship/sessions/${sessionId}`, {
                status: 'Approved',
            });
            setMentorshipSessions((prev) =>
                prev.map((session) =>
                    session._id === sessionId ? { ...session, status: 'Approved' } : session
                )
            );
        } catch (err) {
            setError('Error approving session');
        }
    };

    // Complete a session and add mentor feedback
    const handleCompleteSession = async (e) => {
        e.preventDefault();
        try {
            const { sessionId, feedback } = feedbackData;
            const response = await axios.patch(`/mentorship/sessions/${sessionId}`, {
                status: 'Completed',
                mentorFeedback: feedback,
            });
            setMentorshipSessions((prev) =>
                prev.map((session) =>
                    session._id === sessionId ? { ...session, status: 'Completed', mentorFeedback: feedback } : session
                )
            );
            setFeedbackData({ sessionId: '', feedback: '' });
        } catch (err) {
            setError('Error completing session');
        }
    };

    // Reschedule a session
    const handleRescheduleSession = async (sessionId) => {
        try {
            const { newSchedule } = rescheduleData;
            const response = await axios.patch(`/mentorship/sessions/${sessionId}`, {
                schedule: newSchedule,
                status: 'Pending', // Reschedule the session to "Pending"
            });
            setMentorshipSessions((prev) =>
                prev.map((session) =>
                    session._id === sessionId ? { ...session, schedule: newSchedule, status: 'Pending' } : session
                )
            );
            setRescheduleData({ sessionId: '', newSchedule: '' });
        } catch (err) {
            setError('Error rescheduling session');
        }
    };

    // Update session topics
    const handleUpdateTopics = async (sessionId) => {
        try {
            const { topics } = topicsData;
            const response = await axios.patch(`/mentorship/sessions/${sessionId}`, {
                topics: topics,
            });
            setMentorshipSessions((prev) =>
                prev.map((session) =>
                    session._id === sessionId ? { ...session, topics: topics } : session
                )
            );
            setTopicsData({ sessionId: '', topics: [] });
        } catch (err) {
            setError('Error updating session topics');
        }
    };

    // Fetch mentorship topics
    useEffect(() => {
        const fetchMentorshipTopics = async () => {
            try {
                const response = await axios.get(`/topics`);
                setMentorshipTopics(response.data);
            } catch (err) {
                setError('Error fetching mentorship topics');
            } finally {
                setLoading(false);
            }
        };
        fetchMentorshipTopics();
    }, []);

    // Add new topic
    const handleAddTopic = async () => {
        try {
            const response = await axios.post('/topics', {
                ...newTopic,
                mentor: mentorId,
            });
            setMentorshipTopics([...mentorshipTopics, response.data]);
            setNewTopic({ title: '', description: '', category: '' });
        } catch (err) {
            setError('Error adding topic');
        }
    };

    // Remove topic
    const handleRemoveTopic = async (topicId) => {
        try {
            await axios.delete(`/topics/${topicId}`);
            setMentorshipTopics(mentorshipTopics.filter((topic) => topic._id !== topicId));
        } catch (err) {
            setError('Error removing topic');
        }
    };

    const handleEditTopic = async () => {
        try {
            const response = await axios.put(`/topics/${editTopicId}`, newTopic);
            setMentorshipTopics(mentorshipTopics.map((topic) =>
                topic._id === editTopicId ? response.data : topic
            ));
            setEditTopicId(null);
            setNewTopic({ title: '', description: '', category: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Error editing topic');
        }
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Your Mentorship Topics</h2>

            <div className="row mb-4">
                {mentorshipTopics.map((topic) => (
                    <div className="col-md-4 mb-3" key={topic._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{topic.title}</h5>
                                <p className="card-text">{topic.description}</p>
                                <p className="card-text">
                                    <small className="text-muted">Category: {topic.category}</small>
                                </p>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => {
                                        setEditTopicId(topic._id);
                                        setNewTopic({
                                            title: topic.title,
                                            description: topic.description,
                                            category: topic.category,
                                        });
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveTopic(topic._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h3>{editTopicId ? 'Edit Topic' : 'Add New Topic'}</h3>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Title"
                    value={newTopic.title}
                    onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                />
                <textarea
                    className="form-control mb-2"
                    placeholder="Description"
                    value={newTopic.description}
                    onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                ></textarea>
                <select
                    className="form-select mb-2"
                    value={newTopic.category}
                    onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
                >
                    <option value="">Select Category</option>
                    <option value="Agriculture & Farming">Agriculture & Farming</option>
                    <option value="Handicrafts & Artisan Work">Handicrafts & Artisan Work</option>
                    <option value="Business & Marketing">Business & Marketing</option>
                    <option value="Financial Literacy">Financial Literacy</option>
                    <option value="E-Commerce & Online Business">E-Commerce & Online Business</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Leadership & Empowerment">Leadership & Empowerment</option>
                    <option value="Sustainability & Environment">Sustainability & Environment</option>
                    <option value="Technology for Women Entrepreneurs">Technology for Women Entrepreneurs</option>
                </select>
                <button
                    className={`btn ${editTopicId ? 'btn-success' : 'btn-primary'}`}
                    onClick={editTopicId ? handleEditTopic : handleAddTopic}
                >
                    {editTopicId ? 'Save Changes' : 'Add Topic'}
                </button>
            </div>
            <h2>Your Mentorship Sessions</h2>
            <ul>
                {mentorshipSessions.map((session) => (
                    <li key={session._id}>
                        <strong>Session with: {session.menteeId.name}</strong>
                        <div>Scheduled: {new Date(session.schedule).toLocaleString()}</div>
                        <div>Status: {session.status}</div>
                        {session.mentorFeedback && <div>Mentor Feedback: {session.mentorFeedback}</div>}
                        {session.menteeFeedback && <div>Mentee Feedback: {session.menteeFeedback}</div>}

                        {session.status === 'Pending' && (
                            <button onClick={() => handleApproveSession(session._id)}>Approve</button>
                        )}

                        {session.status === 'Approved' && (
                            <form onSubmit={handleCompleteSession}>
                                <textarea
                                    placeholder="Enter feedback"
                                    value={feedbackData.sessionId === session._id ? feedbackData.feedback : ''}
                                    onChange={(e) =>
                                        setFeedbackData({ sessionId: session._id, feedback: e.target.value })
                                    }
                                ></textarea>
                                <button type="submit">Mark as Completed</button>
                            </form>
                        )}

                        {session.status !== 'Completed' && (
                            <div>
                                <input
                                    type="datetime-local"
                                    value={rescheduleData.sessionId === session._id ? rescheduleData.newSchedule : ''}
                                    onChange={(e) =>
                                        setRescheduleData({ sessionId: session._id, newSchedule: e.target.value })
                                    }
                                />
                                <button onClick={() => handleRescheduleSession(session._id)}>Reschedule</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MentorDashboard;

