const express = require('express');
const router = express.Router();
const Mentorship = require('../models/Mentorship');
const verifyMentor = require('../middleware/authMiddleware');
const verifyMentee = require('../middleware/authMiddleware');

// Get all mentorship sessions for a mentor
router.get('/mentor/sessions', verifyMentor, async (req, res) => {
    try {
        console.log('Session Data:', req.session);  // Log session to check if it's set
        console.log('User Data:', req.user);  // Log user to check if it's populated correctly

        // Fetch mentorship sessions for the mentor
        const sessions = await Mentorship.find({ mentorId: req.user._id })
            .populate('menteeId', 'name email')  // Populate mentee details
            .populate('mentorId', 'name email');  // Populate mentor details

        // Send the response once the data is fetched
        return res.json(sessions);  // Ensure only one response is sent
    } catch (err) {
        console.error('Error:', err);
        if (!res.headersSent) {  // Only send a response if none was sent before
            return res.status(500).send('Server error');
        }
    }
});



// Get all mentorship sessions for a mentee
router.get('/mentee/sessions', verifyMentee, async (req, res) => {
    try {
        const sessions = await Mentorship.find({ menteeId: req.user._id })
            .populate('mentorId', 'name email')  // Populate mentor details
            .populate('menteeId', 'name email');  // Populate mentee details
        res.json(sessions);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Schedule a new mentorship session
router.post('/mentor/sessions', verifyMentor, async (req, res) => {
    const { menteeId, schedule, feedback } = req.body;
    try {
        const newSession = new Mentorship({
            mentorId: req.user._id,
            menteeId,
            schedule,
            feedback,
            status: 'Pending'
        });
        await newSession.save();
        res.json(newSession);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update mentorship session status (for example, to 'Completed' after the session)
router.put('/mentor/sessions/:id', verifyMentor, async (req, res) => {
    const { status, feedback } = req.body;
    try {
        const session = await Mentorship.findByIdAndUpdate(
            req.params.id,
            { status, feedback },
            { new: true }
        );
        res.json(session);
    } catch (err) {
        res.status(500).send('Server error');
    }
});



module.exports = router;
