const express = require('express');
const router = express.Router();
const MentorshipTopic = require('../models/MentorshipTopic');
const verifyMentor = require('../middleware/authMiddleware');

// Get all mentorship topics of a mentor
router.get('/', verifyMentor, async (req, res) => {
    console.log('reaching here');
    try {
        const topics = await MentorshipTopic.find({ mentor: req.user._id });
        res.json(topics);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create a new mentorship topic
router.post('/', verifyMentor, async (req, res) => {
    const { title, description, category } = req.body;
    
    // Check if all required fields are provided
    if (!title || !description || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newTopic = new MentorshipTopic({
            title,
            description,
            category,  // Include the category
            mentor: req.user._id, // Set the logged-in user as the mentor
        });
        
        await newTopic.save();
        res.json(newTopic);  // Send the created topic back
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Edit a mentorship topic
router.put('/:id', verifyMentor, async (req, res) => {
    const { title, description, category } = req.body;

    // Check if the required fields are provided
    if (!title || !description || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Update the mentorship topic by its ID
        const updatedTopic = await MentorshipTopic.findByIdAndUpdate(
            req.params.id,
            { title, description, category }, // Update fields including category
            { new: true }  // Ensure we return the updated document
        );

        // If the topic is not found, return an error
        if (!updatedTopic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.json(updatedTopic);  // Send the updated topic back
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a mentorship topic
router.delete('/:id', verifyMentor, async (req, res) => {
    try {
        // Find and delete the mentorship topic by ID
        const deletedTopic = await MentorshipTopic.findByIdAndDelete(req.params.id);

        // If the topic is not found, return an error
        if (!deletedTopic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.json({ message: 'Topic deleted' });  // Return a success message
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
