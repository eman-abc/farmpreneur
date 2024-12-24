const mongoose = require('mongoose');
const MentorshipTopic = require('../models/MentorshipTopic'); // Adjust the path to your MentorshipTopic model

const populateMentorshipTopics = async () => {
    // Connect to MongoDB
    try {
        await mongoose.connect("mongodb://localhost:27017/farmpreneur", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }

    // Sample mentor ID (replace with actual ObjectId from your User collection)
    const sampleMentorId = '67684ef66ce9c5c07133505c'; // Replace with an actual mentor's ID

    // Sample mentorship topics
    const topics = [
        {
            title: 'Organic Farming Techniques',
            description: 'Learn sustainable and organic farming practices to maximize yield while maintaining soil health.',
            mentor: sampleMentorId,
            category: 'Agriculture & Farming',
        },
        {
            title: 'Starting an E-Commerce Business',
            description: 'A step-by-step guide on launching your online store and reaching a wider audience.',
            mentor: sampleMentorId,
            category: 'E-Commerce & Online Business',
        },
        {
            title: 'Financial Literacy for Women',
            description: 'Understanding savings, investments, and budgeting to empower women entrepreneurs.',
            mentor: sampleMentorId,
            category: 'Financial Literacy',
        },
        {
            title: 'Crafting Unique Handicrafts',
            description: 'Enhance your artisan skills and learn techniques to create marketable handicrafts.',
            mentor: sampleMentorId,
            category: 'Handicrafts & Artisan Work',
        },
        {
            title: 'Leadership Skills for Empowerment',
            description: 'Develop essential leadership qualities to lead initiatives and empower your community.',
            mentor: sampleMentorId,
            category: 'Leadership & Empowerment',
        },
    ];

    // Populate the database
    try {
        await MentorshipTopic.insertMany(topics);
        console.log('Mentorship topics populated successfully');
    } catch (err) {
        console.error('Error populating mentorship topics:', err.message);
    } finally {
        mongoose.connection.close();
    }
};

populateMentorshipTopics();
