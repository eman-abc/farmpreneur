const express = require('express');
const router = express.Router();
const Mentorship = require('../models/Mentorship');
const verifyEntrepreneur = require('../middleware/authMiddleware');  // Middleware for verifying entrepreneur
const User = require('../models/User');



// Get all mentorship sessions for an entrepreneur (mentee)
router.get('/sessions', verifyEntrepreneur, async (req, res) => {
    console.log('inside entression get mid bkd');
    try {
        // Fetch mentorship sessions for the entrepreneur
        const sessions = await Mentorship.find({ menteeId: req.user._id })
            .populate('mentorId', 'name email')  // Populate mentor details
            .populate('menteeId', 'name email');  // Populate mentee details

        // Send the response with the fetched sessions
        console.log(sessions);
        res.json(sessions);
    } catch (err) {
        console.error('Error fetching sessions:', err);
        res.status(500).send('Server error');
    }
});

// Update mentorship session status or feedback for entrepreneur (mentee)
router.put('/entrepreneur/sessions/:id', verifyEntrepreneur, async (req, res) => {
    const { status, menteeFeedback } = req.body;

    try {
        // Fetch the session by ID and ensure it's for the logged-in entrepreneur
        const session = await Mentorship.findOneAndUpdate(
            { _id: req.params.id, menteeId: req.user._id },
            { status, menteeFeedback },
            { new: true }
        ).populate('mentorId menteeId');

        if (!session) {
            return res.status(404).json({ message: 'Session not found or unauthorized access' });
        }

        // Send the updated session
        res.status(200).json({ session });
    } catch (err) {
        console.error('Error updating session:', err);
        res.status(500).send('Server error');
    }
});

router.get('/mentors', async (req, res) => {
    try {
        // Query the User model to get all users with the role of 'Mentor'
        const mentors = await User.find({ role: 'Mentor' }).select('-password'); // Exclude password field for security

        // If no mentors found, return a message
        if (mentors.length === 0) {
            return res.status(404).json({ message: 'No mentors found' });
        }

        // Return the list of mentors
        res.status(200).json(mentors);
    } catch (error) {
        // Handle errors during the database query
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


module.exports = router;
