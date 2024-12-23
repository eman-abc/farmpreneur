const mongoose = require('mongoose');

const mentorshipTopicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The mentor offering the topic
    category: {
        type: String,
        enum: [
            'Agriculture & Farming',
            'Handicrafts & Artisan Work',
            'Business & Marketing',
            'Financial Literacy',
            'E-Commerce & Online Business',
            'Health & Wellness',
            'Leadership & Empowerment',
            'Sustainability & Environment',
            'Technology for Women Entrepreneurs'
        ], // Relevant categories for rural women entrepreneurs in Pakistan
        required: true,
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MentorshipTopic', mentorshipTopicSchema);
