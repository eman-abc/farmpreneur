const mongoose = require('mongoose');
const Mentorship = require('../models/Mentorship');  // Assuming the model is in models/Mentorship.js

// Sample mentor and mentee user IDs (replace these with actual IDs)
const mentorshipSessions = [
    {
        mentorId: '67715d2416f464dcd1421c96',
        menteeId: '67715d2416f464dcd1421c90',
        schedule: new Date('2024-01-05T10:00:00Z'),
        topics: ['Entrepreneurship basics', 'Business ideas for rural women'],
        status: 'Approved',
        mentorFeedback: null,
        menteeFeedback: null,
    },
    {
        mentorId: '67715d2416f464dcd1421c96',
        menteeId: '67715d2416f464dcd1421c90',
        schedule: new Date('2024-01-07T11:00:00Z'),
        topics: ['Financial literacy for rural women', 'Managing small-scale businesses'],
        status: 'Pending',
        mentorFeedback: null,
        menteeFeedback: null,
    },
    {
        mentorId: '67715d2416f464dcd1421c96',
        menteeId: '67715d2416f464dcd1421c90',
        schedule: new Date('2024-01-10T14:00:00Z'),
        topics: ['Marketing strategies for women entrepreneurs', 'Branding and product positioning'],
        status: 'Completed',
        mentorFeedback: null,
        menteeFeedback: null,
    },
];

const addMentorshipSessions = async () => {
    try {
        for (let session of mentorshipSessions) {
            const newSession = new Mentorship(session);
            await newSession.save();
        }
        console.log('Mentorship sessions added successfully!');
    } catch (error) {
        console.error('Error adding mentorship sessions:', error);
    }
};

// Connect to MongoDB and add mentorship sessions
mongoose.connect('mongodb://localhost:27017/farmpreneur', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        addMentorshipSessions();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
