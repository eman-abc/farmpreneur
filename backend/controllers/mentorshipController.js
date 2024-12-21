const Mentorship = require('../models/Mentorship');

// Add CRUD operations for mentorship here

// Create a new mentorship
exports.createMentorship = async (req, res) => {
  try {
    const { mentorId, menteeId, topic, schedule } = req.body;
    const mentorship = new Mentorship({ mentorId, menteeId, topic, schedule });
    await mentorship.save();
    res.status(201).json(mentorship);
  } catch (err) {
    res.status(500).json({ message: 'Error creating mentorship', error: err.message });
  }
};

// Get all mentorships
exports.getAllMentorships = async (req, res) => {
  try {
    const mentorships = await Mentorship.find();
    res.status(200).json(mentorships);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching mentorships', error: err.message });
  }
};

// Get a single mentorship by ID
exports.getMentorshipById = async (req, res) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id);
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    res.status(200).json(mentorship);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching mentorship', error: err.message });
  }
};

// Update mentorship details
exports.updateMentorship = async (req, res) => {
  try {
    const updatedMentorship = await Mentorship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    res.status(200).json(updatedMentorship);
  } catch (err) {
    res.status(500).json({ message: 'Error updating mentorship', error: err.message });
  }
};

// Delete a mentorship
exports.deleteMentorship = async (req, res) => {
  try {
    const deletedMentorship = await Mentorship.findByIdAndDelete(req.params.id);
    if (!deletedMentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    res.status(200).json({ message: 'Mentorship deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting mentorship', error: err.message });
  }
};
