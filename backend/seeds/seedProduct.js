const mongoose = require('mongoose');
const Product = require('../models/Product'); // Adjust path to your Product model file
const User = require('../models/User'); // Adjust path to your User model file

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/farmpreneur', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Kiran Bibi's ObjectId (assuming you already have this from your User collection)
const kiranBibiId = '67715cbf7fb108bdd74b9c28';

// Sample products data
const products = [
    {
        title: 'Handwoven Woolen Shawl',
        description: 'A handwoven shawl made from fine wool, perfect for the winter season.',
        price: 1200,
        ownerId: kiranBibiId,
        category: 'Handicrafts',
        imageUrl: ['http://example.com/images/shawl1.jpg'],
        status: 'Available',
        stock: 200, // High stock
        soldCount: 0,
        tags: ['winter', 'handmade', 'wool'],
        reviews: [],
    },
    {
        title: 'Organic Green Tea',
        description: 'Organic green tea leaves grown in the local fields, handpicked and dried naturally.',
        price: 350,
        ownerId: kiranBibiId,
        category: 'Organic Produce',
        imageUrl: ['http://example.com/images/greentea1.jpg'],
        status: 'Available',
        stock: 150, // High stock
        soldCount: 0,
        tags: ['organic', 'tea', 'green tea'],
        reviews: [],
    },
    {
        title: 'Handmade Cotton Bedsheet',
        description: 'A soft and breathable cotton bedsheet, hand-stitched by women from the local community.',
        price: 800,
        ownerId: kiranBibiId,
        category: 'Handicrafts',
        imageUrl: ['http://example.com/images/bedsheet1.jpg'],
        status: 'Available',
        stock: 50, // Mid stock
        soldCount: 0,
        tags: ['cotton', 'handmade', 'bedsheet'],
        reviews: [],
    },
    {
        title: 'Fresh Organic Tomatoes',
        description: 'Fresh tomatoes grown without pesticides, sourced directly from rural farms.',
        price: 150,
        ownerId: kiranBibiId,
        category: 'Organic Produce',
        imageUrl: ['http://example.com/images/tomatoes1.jpg'],
        status: 'Available',
        stock: 30, // Low stock
        soldCount: 0,
        tags: ['organic', 'produce', 'tomatoes'],
        reviews: [],
    },
    {
        title: 'Handcrafted Wooden Chair',
        description: 'A sturdy, hand-carved wooden chair, designed by rural women artisans.',
        price: 1800,
        ownerId: kiranBibiId,
        category: 'Handicrafts',
        imageUrl: ['http://example.com/images/chair1.jpg'],
        status: 'Available',
        stock: 60, // Mid stock
        soldCount: 0,
        tags: ['wooden', 'handcrafted', 'furniture'],
        reviews: [],
    },
    {
        title: 'Fresh Organic Carrots',
        description: 'Naturally grown carrots with no pesticides, sourced directly from rural farms.',
        price: 100,
        ownerId: kiranBibiId,
        category: 'Organic Produce',
        imageUrl: ['http://example.com/images/carrots1.jpg'],
        status: 'Available',
        stock: 20, // Low stock
        soldCount: 0,
        tags: ['organic', 'produce', 'carrots'],
        reviews: [],
    },
    {
        title: 'Homemade Jams - Mango',
        description: 'Delicious homemade mango jam made from fresh organic mangoes.',
        price: 350,
        ownerId: kiranBibiId,
        category: 'Organic Produce',
        imageUrl: ['http://example.com/images/mangojam1.jpg'],
        status: 'Available',
        stock: 70, // Mid stock
        soldCount: 0,
        tags: ['organic', 'jam', 'mango'],
        reviews: [],
    },
    {
        title: 'Handmade Clay Pottery Vase',
        description: 'Beautifully crafted clay pottery vase, made by local artisans.',
        price: 950,
        ownerId: kiranBibiId,
        category: 'Handicrafts',
        imageUrl: ['http://example.com/images/vase1.jpg'],
        status: 'Available',
        stock: 40, // Mid stock
        soldCount: 0,
        tags: ['pottery', 'handmade', 'clay'],
        reviews: [],
    },
    {
        title: 'Organic Fresh Eggs',
        description: 'Farm-fresh organic eggs, gathered from local rural farms.',
        price: 200,
        ownerId: kiranBibiId,
        category: 'Organic Produce',
        imageUrl: ['http://example.com/images/eggs1.jpg'],
        status: 'Available',
        stock: 50, // Mid stock
        soldCount: 0,
        tags: ['organic', 'eggs', 'fresh'],
        reviews: [],
    },
    {
        title: 'Handmade Woolen Scarf',
        description: 'A soft and warm woolen scarf, handwoven by women artisans from the village.',
        price: 650,
        ownerId: kiranBibiId,
        category: 'Handicrafts',
        imageUrl: ['http://example.com/images/scarf1.jpg'],
        status: 'Available',
        stock: 30, // Low stock
        soldCount: 0,
        tags: ['woolen', 'handmade', 'scarf'],
        reviews: [],
    },
];

// Function to populate the products data
const createProducts = async () => {
    try {
        for (let productData of products) {
            const product = new Product(productData);
            await product.save();
            console.log(`${product.title} added successfully!`);
        }
    } catch (error) {
        console.error('Error creating products:', error);
    } finally {
        mongoose.connection.close(); // Close the connection once done
    }
};

// Run the script to populate products
createProducts();
