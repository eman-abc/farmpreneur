const mongoose = require('mongoose');
const FinancialAid = require('../models/FinancialAid'); // Assuming the model is in models/FinancialAid.js

// Sample user ID for NGO user
const ngoUserId = '67715d2416f464dcd1421c94'; // Replace with the actual NGO user ID from the User model

const financialAids = [
    {
        title: 'Rural Women Business Loan Program',
        description: 'A loan program for rural women entrepreneurs to help them start or expand their small businesses in agriculture, handicrafts, and more.',
        eligibilityCriteria: 'Must be a woman aged 18-55, residing in rural areas, and involved in entrepreneurship.',
        amount: 50000, // PKR
        contactEmail: 'info@ruralwomensloan.org',
        createdBy: ngoUserId,
    },
    {
        title: 'Women in Agriculture Subsidy Program',
        description: 'A subsidy to help women in rural areas purchase agricultural equipment and inputs like seeds and fertilizers.',
        eligibilityCriteria: 'Must be a woman engaged in agriculture in rural areas for at least 1 year.',
        amount: 30000, // PKR
        contactEmail: 'support@womenagriculture.org',
        createdBy: ngoUserId,
    },
    {
        title: 'Microcredit for Women Entrepreneurs',
        description: 'Microcredit loans aimed at empowering rural women entrepreneurs by providing them with small loans to start or expand their businesses.',
        eligibilityCriteria: 'Must have a business plan and a history of entrepreneurship.',
        amount: 20000, // PKR
        contactEmail: 'microcredit@womenentrepreneurs.org',
        createdBy: ngoUserId,
    },
];

const addFinancialAids = async () => {
    try {
        for (let aid of financialAids) {
            const newAid = new FinancialAid(aid);
            await newAid.save();
        }
        console.log('Financial aids added successfully!');
    } catch (error) {
        console.error('Error adding financial aids:', error);
    }
};

// Connect to MongoDB and add financial aids
mongoose.connect('mongodb://localhost:27017/farmpreneur', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        addFinancialAids();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
