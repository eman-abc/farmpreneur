// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    try {
        const user = await User.findOne({ email });
        console.log("hitting thisss");
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.session.user = user;
        console.log('Session after login:', req.session);
        console.log('Login route hit, user:', user);

        res.status(200).json({
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                contactNumber: user.contactNumber,
            },
        });
        console.log('Session Data:', req.session.user);  // Check if session is set correctly

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server errorrrrrrrrr' });
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
