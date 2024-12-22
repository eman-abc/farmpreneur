const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const Mentorship = require('../models/Mentorship');
const Order = require('../models/Order');
const Resource = require('../models/Resource');
const Review = require('../models/Review');

const connectDB = require('../db');

// Function to hash password before saving it
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Sample Users with hashed passwords
const users = [
    {
        name: 'Asma Khan',
        email: 'asma@example.com',
        password: 'password123', // Plain text password
        role: 'Entrepreneur',
        location: 'Lahore, Pakistan',
        contactNumber: '+92 300 1234567',
        profileImage: 'https://example.com/images/asma.jpg',
        products: [],
        mentorships: [],
        resources: [],
    },
    {
        name: 'Sara Ali',
        email: 'sara@example.com',
        password: 'password123', // Plain text password
        role: 'Mentor',
        location: 'Karachi, Pakistan',
        contactNumber: '+92 300 2345678',
        profileImage: 'https://example.com/images/sara.jpg',
        products: [],
        mentorships: [],
        resources: [],
    },
    {
        name: 'Inaya Shah',
        email: 'inaya@example.com',
        password: 'password123', // Plain text password
        role: 'Admin',
        location: 'Islamabad, Pakistan',
        contactNumber: '+92 300 3456789',
        profileImage: 'https://example.com/images/inaya.jpg',
        products: [],
        mentorships: [],
        resources: [],
    },
    {
        name: 'NGO Support',
        email: 'ngo@example.com',
        password: 'password123', // Plain text password
        role: 'NGO',
        location: 'Peshawar, Pakistan',
        contactNumber: '+92 300 4567890',
        profileImage: 'https://example.com/images/ngo.jpg',
        products: [],
        mentorships: [],
        resources: [],
    },
];

// Sample Products
const products = [
    {
        title: 'Handcrafted Wooden Chair',
        description: 'A beautifully handcrafted chair made from premium wood.',
        price: 5000, // PKR
        ownerId: null, // To be filled later
        category: 'Handicrafts',
        imageUrl: ['https://example.com/images/chair.jpg'],
        status: 'Available',
    },
    {
        title: 'Organic Tomatoes',
        description: 'Fresh and organic tomatoes grown in the local farm.',
        price: 300, // PKR
        ownerId: null, // To be filled later
        category: 'Organic Produce',
        imageUrl: ['https://example.com/images/tomatoes.jpg'],
        status: 'Available',
    },
];

// Sample Mentorships
const mentorships = [
    {
        mentorId: null, // To be filled later
        menteeId: null, // To be filled later
        schedule: new Date('2024-12-25'),
        status: 'Pending',
        feedback: '',
    },
    {
        mentorId: null, // To be filled later
        menteeId: null, // To be filled later
        schedule: new Date('2024-12-28'),
        status: 'Approved',
        feedback: 'Great progress so far.',
    },
];

// Sample Orders
const orders = [
    {
        buyerId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        quantity: 2,
        totalPrice: 10000, // PKR
        status: 'Pending',
        orderDate: new Date(),
        deliveryDate: new Date('2025-01-05'),
    },
    {
        buyerId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        quantity: 1,
        totalPrice: 5000, // PKR
        status: 'Confirmed',
        orderDate: new Date(),
        deliveryDate: new Date('2025-01-02'),
    },
];

// Sample Resources
const resources = [
    {
        title: 'Marketing for Small Businesses',
        type: 'PDF',
        url: 'https://example.com/resources/marketing-guide.pdf',
        category: 'Marketing',
        uploaderId: new mongoose.Types.ObjectId(),
    },
    {
        title: 'Financial Management Tips',
        type: 'Video',
        url: 'https://example.com/resources/finance-tips.mp4',
        category: 'Finance',
        uploaderId: new mongoose.Types.ObjectId(),
    },
];

// Sample Reviews
const reviews = [
    {
        userId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        rating: 5,
        comment: 'Amazing product, very comfortable!',
    },
    {
        userId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        rating: 4,
        comment: 'Good quality, but a bit expensive.',
    },
];

// Connect to the database
connectDB();

// Insert Sample Data into the Database
async function insertSampleData() {
    try {
        // Hash the passwords before inserting users
        const hashedUsers = await Promise.all(users.map(async (user) => {
            user.password = await hashPassword(user.password);
            return user;
        }));

        // Create Users
        const insertedUsers = await User.insertMany(hashedUsers);

        // Get the ObjectIds of inserted users
        const userIds = insertedUsers.map(user => user._id);

        // Assign ownerId, mentorId, menteeId to products and mentorships
        products[0].ownerId = userIds[0]; // Asma owns the chair
        products[1].ownerId = userIds[1]; // Sara owns the tomatoes

        mentorships[0].mentorId = userIds[1]; // Sara is mentoring Asma
        mentorships[0].menteeId = userIds[0]; // Asma is the mentee
        mentorships[1].mentorId = userIds[1]; // Sara is mentoring Inaya
        mentorships[1].menteeId = userIds[2]; // Inaya is the mentee

        // Create Products and Mentorships
        await Product.insertMany(products);
        await Mentorship.insertMany(mentorships);

        console.log('Sample data inserted successfully!');
    } catch (err) {
        console.error('Error inserting sample data:', err);
    }
}

insertSampleData();
