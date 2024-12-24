const mongoose = require('mongoose');

const mentorshipSchema = new mongoose.Schema(
  {
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    menteeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    schedule: {
      type: Date,
      required: true,
    },
    topics: {
      type: [String],
      required: true, // Mandatory session topics
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Completed'],
      default: 'Pending',
    },
    mentorFeedback: {
      type: String, // Mentor's feedback for the session
    },
    menteeFeedback: {
      type: String, // Mentee's feedback for the session
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mentorship', mentorshipSchema);
