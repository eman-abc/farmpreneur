const express = require('express');
const router = express.Router();
const Mentorship = require('../models/Mentorship');
const MentorshipTopic = require('../models/MentorshipTopic');
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

// Schedule a new mentorship session by mentor
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

// Schedule a new mentorship session by mentee
router.post('/mentee/sessions', verifyMentee, async (req, res) => {
    const { mentorId, schedule, topics } = req.body;
    try {
        const newSession = new Mentorship({
            menteeId: req.user._id,
            mentorId,
            schedule,
            topics,
            status: 'Pending'
        });
        await newSession.save();
        res.json(newSession);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.patch('/sessions/:id', async (req, res) => {
    const { id } = req.params;
    const { status, mentorFeedback } = req.body;

    try {
        const session = await Mentorship.findByIdAndUpdate(
            id,
            { status, mentorFeedback },
            { new: true }
        ).populate('mentorId menteeId');
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: 'Error updating session' });
    }
});

// Reschedule session by mentor
router.patch('/sessions/:id/reschedule', async (req, res) => {
    try {
        const { id } = req.params;
        const { newSchedule, reason } = req.body;

        // Validate input
        if (!newSchedule || !reason) {
            return res.status(400).json({ error: 'New schedule and reason are required' });
        }

        // Find the session
        const session = await MentorshipSession.findById(id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Update session schedule and log the reschedule
        session.schedule = new Date(newSchedule);
        session.rescheduleLog = session.rescheduleLog || [];
        session.rescheduleLog.push({
            by: 'Mentor',
            reason,
            timestamp: new Date(),
        });

        await session.save();

        res.status(200).json({ message: 'Session rescheduled successfully', session });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error rescheduling session' });
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


// Fetch mentorship topics by mentor ID
router.get('/topics', verifyMentor, async (req, res) => {
    const mentorId = req.user._id;
    try {
        const topics = await MentorshipTopic.find({ mentor: mentorId });
        res.json(topics);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching mentorship topics' });
    }
});



module.exports = router;
