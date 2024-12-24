const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the login routes
const mentorshipRoutes = require('./routes/mentorshipRoutes');
const mentorshipTopicRoutes = require('./routes/mentorshipTopicRoutes');


// Connect to the database
connectDB();

const app = express();

// Session middleware
const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend to make requests to the backend
  credentials: true // Allow cookies to be sent with requests
}));
app.use(express.json());

// Register the auth routes
app.use('/api/auth', authRoutes);


// Register dashboard routes
app.use('/api/dashboard', dashboardRoutes);

// Register the mentorship routes
app.use('/api/mentorship', mentorshipRoutes);

// Register the mentorship routes
app.use('/api/topics', mentorshipTopicRoutes);

//testing 
// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Generic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error for debugging
  res.status(500).json({ message: 'Something went wrong!' });  // Send a user-friendly message
});
