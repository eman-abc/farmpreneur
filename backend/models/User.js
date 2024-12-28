const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing passwords

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Entrepreneur', 'Mentor', 'Admin', 'NGO'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String, // URL or file path to profile image
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Reference to products for Entrepreneurs
    mentorships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentorship' }], // Reference to mentorships for Mentors
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }], // Reference to resources for NGOs
    emailVerified: {
      type: Boolean,
      default: false, // Set to false initially until user verifies email
    },
    resetPasswordToken: String, // Used for password reset
    resetPasswordExpires: Date, // Expiry time for reset token
  },
  { timestamps: true }
);

// Add comparePassword method to the schema
userSchema.methods.comparePassword = async function (password) {
  try {
    console.log('Comparing:', password, 'with hash:', this.password);
    return await bcrypt.compare(password, this.password);  // Compare hashed password
  } catch (error) {
    throw new Error('Error comparing password');
  }
};

// Hash the password before saving (if not already hashed)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Create the User model

module.exports = mongoose.model('User', userSchema);
