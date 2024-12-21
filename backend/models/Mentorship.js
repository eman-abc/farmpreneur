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
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Completed'],
      default: 'Pending',
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mentorship', mentorshipSchema);
