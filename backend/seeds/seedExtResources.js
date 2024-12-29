const mongoose = require('mongoose');
const ExternalResource = require('../models/ExternalResource'); // Assuming the model is in models/ExternalResource.js

// Sample user ID for NGO user
const ngoUserId = '67715d2416f464dcd1421c94'; // Replace with the actual NGO user ID from the User model

const resources = [
    {
        title: 'Women Entrepreneurship Development Program',
        description: 'A comprehensive program aimed at empowering women in rural areas with the skills and resources needed to start and manage businesses.',
        url: 'https://www.womenentrepreneurship.org',
        category: 'Education',
        createdBy: ngoUserId,
    },
    {
        title: 'Financial Literacy for Rural Women',
        description: 'An online course offering financial education to rural women, helping them manage personal and business finances effectively.',
        url: 'https://www.financeliteracy.org',
        category: 'Finance',
        createdBy: ngoUserId,
    },
    {
        title: 'Rural Women Empowerment Fund',
        description: 'A fund aimed at providing financial support for women entrepreneurs in rural areas to start and scale their businesses.',
        url: 'https://www.ruralwomenfund.org',
        category: 'Finance',
        createdBy: ngoUserId,
    },
];

const addResources = async () => {
    try {
        for (let resource of resources) {
            const newResource = new ExternalResource(resource);
            await newResource.save();
        }
        console.log('Resources added successfully!');
    } catch (error) {
        console.error('Error adding resources:', error);
    }
};

// Connect to MongoDB and add resources
mongoose.connect('mongodb://localhost:27017/farmpreneur', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        addResources();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
