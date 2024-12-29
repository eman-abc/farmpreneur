const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust path to your User model file

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/farmpreneur', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Sample data
const users = [
    {
        name: 'Kiran Bibi',
        email: 'kiran.bibi@example.com',
        password: 'entrepass', // This will be hashed
        role: 'Entrepreneur',
        location: 'Peshawar, Khyber Pakhtunkhwa',
        contactNumber: '03001234567',
        profileImage: 'http://example.com/images/kiran.jpg',
        products: [], // You can add references to actual products later
    },
    {
        name: 'Bushra Bibi',
        email: 'bushra.bibi@example.com',
        password: 'ngopass', // This will be hashed
        role: 'NGO',
        location: 'Dera Ismail Khan, Khyber Pakhtunkhwa',
        contactNumber: '03101234567',
        profileImage: 'http://example.com/images/bushra.jpg',
        resources: [], // You can add references to actual resources later
    },
    {
        name: 'Faisal Khan',
        email: 'faisal.khan@example.com',
        password: 'mentorpass', // This will be hashed
        role: 'Mentor',
        location: 'Sargodha, Punjab',
        contactNumber: '03201234567',
        profileImage: 'http://example.com/images/faisal.jpg',
        mentorships: [], // You can add references to actual mentorships later
    },
];

// Function to hash the password and save users to the database
const createUsers = async () => {
    try {
        for (let userData of users) {
            const user = new User(userData);
            await user.save();
            console.log(`${user.name} added successfully!`);
        }
    } catch (error) {
        console.error('Error creating users:', error);
    } finally {
        mongoose.connection.close(); // Close the connection once done
    }
};

// Run the script to populate data
createUsers();
