const express = require('express');
const router = express.Router();
const mentorshipController = require('../controllers/mentorshipController');

// Add routes for mentorship CRUD operations here

// Mentorship Routes
router.post('/mentorships', mentorshipController.createMentorship);
router.get('/mentorships', mentorshipController.getAllMentorships);
router.get('/mentorships/:id', mentorshipController.getMentorshipById);
router.put('/mentorships/:id', mentorshipController.updateMentorship);
router.delete('/mentorships/:id', mentorshipController.deleteMentorship);

module.exports = router;
