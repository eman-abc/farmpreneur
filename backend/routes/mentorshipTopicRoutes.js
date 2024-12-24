const express = require('express');
const router = express.Router();
const MentorshipTopic = require('../models/MentorshipTopic');
const verifyMentor = require('../middleware/authMiddleware');



// Fetch all mentorship topics for a specific mentor
router.get('/', verifyMentor, async (req, res) => {
    const mentorId = req.user._id; // Assuming `verifyMentor` sets req.user
    try {
        const topics = await MentorshipTopic.find({ mentor: mentorId });
        res.json(topics);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching mentorship topics' });
    }
});

// Add a new mentorship topic
router.post('/', verifyMentor, async (req, res) => {
    const mentorId = req.user._id;
    const { title, description, category } = req.body;

    try {
        const newTopic = new MentorshipTopic({
            title,
            description,
            category,
            mentor: mentorId,
        });
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (err) {
        res.status(500).json({ message: 'Error creating mentorship topic' });
    }
});

router.put('/:editTopicId', verifyMentor, async (req, res) => {
    const mentorId = req.user._id;
    const { editTopicId } = req.params;
    const { title, description, category } = req.body;

    try {
        const updatedTopic = await MentorshipTopic.findOneAndUpdate(
            { _id: editTopicId, mentor: mentorId },
            { title, description, category },
            { new: true } // Return the updated document
        );
        if (!updatedTopic) {
            return res.status(404).json({ message: 'Topic not found or unauthorized' });
        }
        res.json(updatedTopic);
    } catch (err) {
        res.status(500).json({ message: 'Error updating mentorship topic' });
    }
});

// Delete a mentorship topic
router.delete('/:id', verifyMentor, async (req, res) => {
    const mentorId = req.user._id;
    const { id } = req.params;

    try {
        const deletedTopic = await MentorshipTopic.findOneAndDelete({ _id: id, mentor: mentorId });
        if (!deletedTopic) {
            return res.status(404).json({ message: 'Topic not found or unauthorized' });
        }
        res.json({ message: 'Topic deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting mentorship topic' });
    }
});


module.exports = router;
