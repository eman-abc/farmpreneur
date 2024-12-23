import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // Assuming you have a custom axios instance

const MentorDashboard = () => {
    const [mentorshipTopics, setMentorshipTopics] = useState([]);
    const [mentorshipSessions, setMentorshipSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newSessionData, setNewSessionData] = useState({
        menteeId: '',
        schedule: '',
        feedback: '',
    });

    // New topic form state
    const [newTopicData, setNewTopicData] = useState({
        title: '',
        description: '',
        category: '', // New field for category selection
    });

    // Edit form state
    const [editTopicData, setEditTopicData] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
    });

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                // Fetch mentorship topics
                const topicsResponse = await axios.get('/mentor/mentorship-topics');
                setMentorshipTopics(topicsResponse.data);

                // Fetch mentorship sessions
                const sessionsResponse = await axios.get('/mentorship/mentor/sessions');
                setMentorshipSessions(sessionsResponse.data);
            } catch (err) {
                setError('Error fetching mentor data');
            } finally {
                setLoading(false);
            }
        };

        fetchMentorData();
    }, []);

    const handleSessionSubmit = async (e) => {
        e.preventDefault();
        try {
            const { menteeId, schedule, feedback } = newSessionData;
            const newSession = await axios.post('/mentorship/mentor/sessions', {
                menteeId,
                schedule,
                feedback,
            });
            setMentorshipSessions((prev) => [...prev, newSession.data]);
            setNewSessionData({ menteeId: '', schedule: '', feedback: '' }); // Reset form data
        } catch (err) {
            setError('Error scheduling new session');
        }
    };

    const handleTopicSubmit = async (e) => {
        e.preventDefault();
        try {
            const { title, description, category } = newTopicData;
            const newTopic = await axios.post('/mentor/mentorship-topics', {
                title,
                description,
                category,
            });
            setMentorshipTopics((prev) => [...prev, newTopic.data]); // Update topics list with the new topic
            setNewTopicData({ title: '', description: '', category: '' }); // Reset the new topic form
        } catch (err) {
            setError('Error adding new topic');
        }
    };

    const handleTopicDelete = async (topicId) => {
        try {
            await axios.delete(`/mentor/mentorship-topics/${topicId}`);
            setMentorshipTopics(mentorshipTopics.filter(topic => topic._id !== topicId)); // Remove deleted topic from list
        } catch (err) {
            setError('Error deleting topic');
        }
    };

    const handleTopicEdit = async (e) => {
        e.preventDefault();
        const { title, description, category } = editTopicData;
        try {
            const updatedTopic = await axios.put(`/mentor/mentorship-topics/${editTopicData.id}`, {
                title,
                description,
                category,
            });
            setMentorshipTopics(mentorshipTopics.map(topic => 
                topic._id === updatedTopic.data._id ? updatedTopic.data : topic
            ));
            setEditTopicData({ id: '', title: '', description: '', category: '' }); // Reset the form
        } catch (err) {
            setError('Error updating topic');
        }
    };

    const handleEditClick = (topic) => {
        setEditTopicData({
            id: topic._id,
            title: topic.title,
            description: topic.description,
            category: topic.category,
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Your Mentor Dashboard</h2>

            {/* Mentorship Topics */}
            <div>
                <h3>Your Mentorship Topics</h3>
                <ul>
                    {mentorshipTopics.map((topic) => (
                        <li key={topic._id}>
                            {topic.title} - {topic.description} ({topic.category})
                            <button onClick={() => handleEditClick(topic)}>Edit</button>
                            <button onClick={() => handleTopicDelete(topic._id)}>Delete</button>
                        </li>
                    ))}
                </ul>

                {/* Add New Topic Form */}
                <h4>Add New Mentorship Topic</h4>
                <form onSubmit={handleTopicSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newTopicData.title}
                        onChange={(e) => setNewTopicData({ ...newTopicData, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newTopicData.description}
                        onChange={(e) => setNewTopicData({ ...newTopicData, description: e.target.value })}
                        required
                    />
                    <select
                        value={newTopicData.category}
                        onChange={(e) => setNewTopicData({ ...newTopicData, category: e.target.value })}
                        required
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
                    <button type="submit">Add Topic</button>
                </form>

                {/* Edit Topic Form */}
                {editTopicData.id && (
                    <div>
                        <h4>Edit Mentorship Topic</h4>
                        <form onSubmit={handleTopicEdit}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={editTopicData.title}
                                onChange={(e) => setEditTopicData({ ...editTopicData, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={editTopicData.description}
                                onChange={(e) => setEditTopicData({ ...editTopicData, description: e.target.value })}
                                required
                            />
                            <select
                                value={editTopicData.category}
                                onChange={(e) => setEditTopicData({ ...editTopicData, category: e.target.value })}
                                required
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
                            <button type="submit">Update Topic</button>
                        </form>
                    </div>
                )}
            </div>

            {/* Mentorship Sessions */}
            <div>
                <h3>Your Mentorship Sessions</h3>
                <ul>
                    {mentorshipSessions.map((session) => (
                        <li key={session._id}>
                            <strong>{session.menteeId.name}</strong> - {new Date(session.schedule).toLocaleString()}
                            <div>Status: {session.status}</div>
                            {session.status === 'Completed' && <div>Feedback: {session.feedback}</div>}
                            <button>View Details</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Add New Session */}
            <div>
                <h3>Schedule New Session</h3>
                <form onSubmit={handleSessionSubmit}>
                    <input
                        type="text"
                        placeholder="Mentee ID"
                        value={newSessionData.menteeId}
                        onChange={(e) => setNewSessionData({ ...newSessionData, menteeId: e.target.value })}
                    />
                    <input
                        type="datetime-local"
                        value={newSessionData.schedule}
                        onChange={(e) => setNewSessionData({ ...newSessionData, schedule: e.target.value })}
                    />
                    <textarea
                        placeholder="Feedback (optional)"
                        value={newSessionData.feedback}
                        onChange={(e) => setNewSessionData({ ...newSessionData, feedback: e.target.value })}
                    />
                    <button type="submit">Schedule</button>
                </form>
            </div>
        </div>
    );
};

export default MentorDashboard;
