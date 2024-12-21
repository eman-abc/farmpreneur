const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
    }
  };

module.exports = connectDB;
