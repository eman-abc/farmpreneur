// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/check-session', authMiddleware, (req, res) => {
    console.log('Session Data:', req.session);  // Debugging session
    return res.status(200).json({
        message: 'User authenticated',
        user: req.session.user,  // Send user data if session exists
    });
});


// Get current logged-in user's details
router.get('/current', authMiddleware, (req, res) => {
    // The user should be in session if logged in
    if (req.session.user) {
        return res.status(200).json({
            message: 'User authenticated',
            user: {
                name: req.session.user.name,
                email: req.session.user.email,
                role: req.session.user.role,
                location: req.session.user.location,
                contactNumber: req.session.user.contactNumber,
            }
        });
    } else {
        return res.status(401).json({ message: 'Not authenticated' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password.' });
        }

        console.log(email, password);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Invalid credentials no user');
            return res.status(401).json({ message: 'Invalid credentials no user' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {

            console.log('Invalid credentials no match');
            return res.status(401).json({ message: 'Invalid credentials no match' });
        }

        req.session.user = {
            _id: user._id, name: user.name, email: user.email, role: user.role, // Add role here
            location: user.location, // Add location here
            contactNumber: user.contactNumber, // Add contactNumber here
            createdAt: user.createdAt, 
        };
        res.status(200).json({
            message: 'Login successful',
            user: { name: user.name, email: user.email, role: user.role, location: user.location, contactNumber: user.contactNumber ,createdAt: user.createdAt},
        });

        console.log('Session Data:', req.session.user);
    } catch (error) {
        console.error('Caught Error:', error); // Ensure the error is logged
        res.status(500).json({ message: 'Server error' });
    }
});



// Logout route
router.post('/logout', authMiddleware, (req, res) => {
    // Destroy the session when logging out
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error destroying session' });
        }

        // Send response confirming logout
        res.status(200).json({ message: 'Logout successful' });
    });
});


// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, role, location, contactNumber } = req.body;

    if (!name || !email || !password || !role || !location || !contactNumber) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password,
            role,
            location,
            contactNumber,
        });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
