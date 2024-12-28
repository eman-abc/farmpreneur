const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');

// MongoDB connection string
const DATABASE_URL = 'mongodb://localhost:27017/your_database_name'; // Replace with your database name

// Connect to MongoDB
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const populateDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});

        // Create users
        const users = [
            {
                name: 'Ayesha Bibi',
                email: 'ayesha.bibi@example.com',
                password: 'password123',
                role: 'Entrepreneur',
                location: 'Tharparkar',
                contactNumber: '03451234567',
                profileImage: 'https://via.placeholder.com/150',
            },
            {
                name: 'Ali Khan',
                email: 'ali.khan@example.com',
                password: 'password123',
                role: 'Entrepreneur',
                location: 'Chitral',
                contactNumber: '03459876543',
                profileImage: 'https://via.placeholder.com/150',
            },
            {
                name: 'Fatima Riaz',
                email: 'fatima.riaz@example.com',
                password: 'password123',
                role: 'Entrepreneur',
                location: 'Dera Ghazi Khan',
                contactNumber: '03123456789',
                profileImage: 'https://via.placeholder.com/150',
            },
        ];

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        }

        const createdUsers = await User.insertMany(users);

        // Create products
        const products = [
            {
                title: 'Handwoven Ralli Quilt',
                description: 'Traditional handwoven quilt from Tharparkar.',
                price: 3500,
                ownerId: createdUsers[0]._id,
                category: 'Handicrafts',
                imageUrl: ['https://via.placeholder.com/200'],
                stock: 10,
                soldCount: 5,
                reviews: [
                    { user: createdUsers[1]._id, comment: 'Beautiful craftsmanship!', rating: 5 },
                ],
            },
            {
                title: 'Organic Honey',
                description: 'Pure organic honey from Chitral valleys.',
                price: 1200,
                ownerId: createdUsers[1]._id,
                category: 'Organic Produce',
                imageUrl: ['https://via.placeholder.com/200'],
                stock: 3,
                soldCount: 7,
                reviews: [
                    { user: createdUsers[0]._id, comment: 'Rich and tasty!', rating: 4 },
                ],
            },
            {
                title: 'Handmade Clay Pots',
                description: 'Beautiful clay pots for rural households.',
                price: 800,
                ownerId: createdUsers[0]._id,
                category: 'Handicrafts',
                imageUrl: ['https://via.placeholder.com/200'],
                stock: 0, // Sold out
                soldCount: 20,
                reviews: [],
            },
            {
                title: 'Organic Wheat Flour',
                description: 'High-quality organic wheat flour from Dera Ghazi Khan.',
                price: 1500,
                ownerId: createdUsers[2]._id,
                category: 'Organic Produce',
                imageUrl: ['https://via.placeholder.com/200'],
                stock: 15,
                soldCount: 5,
                reviews: [
                    { user: createdUsers[1]._id, comment: 'Great quality!', rating: 5 },
                ],
            },
            {
                title: 'Camel Wool Shawl',
                description: 'Luxurious shawl made from camel wool.',
                price: 5000,
                ownerId: createdUsers[0]._id,
                category: 'Handicrafts',
                imageUrl: ['https://via.placeholder.com/200'],
                stock: 2,
                soldCount: 8,
                reviews: [],
            },
            {
                title: 'Organic Olive Oil',
                description: 'Pure organic olive oil from Swat valley.',
                price: 2000,
                ownerId: createdUsers[1]._id,
                category: 'Organic Produce',
                imageUrl: ['https://via.placeholder.com/200'],
                stock: 8,
                soldCount: 12,
                reviews: [
                    { user: createdUsers[2]._id, comment: 'Perfect for cooking!', rating: 5 },
                ],
            },
            {
                title: 'Wooden Carved Box',
                description: 'Exquisite hand-carved wooden box.',
                price: 2500,
                ownerId: createdUsers[0]._id,
                category: 'Handicrafts',
                imageUrl: ['https://via.placeholder.com/200'],
                stock: 5,
                soldCount: 2,
                reviews: [],
            },
            {
                title: 'Organic Brown Rice',
                description: 'Healthy and organic brown rice.',
                price: 1800,
                ownerId: createdUsers[2]._id,
                category: 'Organic Produce',
                imageUrl: ['https://via.placeholder.com/200'],
                stock: 20,
                soldCount: 0,
                reviews: [],
            },
            {
                title: 'Handwoven Woolen Cap',
                description: 'Traditional woolen cap from Chitral.',
                price: 1200,
                ownerId: createdUsers[1]._id,
                category: 'Handicrafts',
                imageUrl: ['https://via.placeholder.com/200'],
                stock: 0, // Sold out
                soldCount: 10,
                reviews: [
                    { user: createdUsers[0]._id, comment: 'Warm and cozy!', rating: 5 },
                ],
            },
            {
                title: 'Organic Desi Ghee',
                description: 'Traditional desi ghee from Punjab.',
                price: 3000,
                ownerId: createdUsers[2]._id,
                category: 'Organic Produce',
                imageUrl: ['https://via.placeholder.com/200'],
                stock: 6,
                soldCount: 4,
                reviews: [],
            },
        ];

        await Product.insertMany(products);

        console.log('Database populated successfully!');
        process.exit();
    } catch (err) {
        console.error('Error populating database:', err);
        process.exit(1);
    }
};

populateDatabase();
