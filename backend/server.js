const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;  // Access MONGO_URI from environment variables
const cors = require('cors');
const connectDB = require('./db');



// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/api', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.get('/test-db', async (req, res) => {
    try {
      const result = await mongoose.connection.db.collection('user').findOne({});
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data from database', error });
    }
  });
  