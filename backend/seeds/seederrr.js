// const mongoose = require('mongoose');
// const Product = require('../models/Product');
// const User = require('../models/User');

// const Mentorship = require('../models/Mentorship');
// const MentorshipTopic = require('../models/MentorshipTopic');
// const Order = require('../models/Order');

// mongoose.connect('mongodb://localhost:27017/farmpreneur', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('Connected to the database'))
//     .catch((error) => console.log('Error connecting to the database:', error));

// const seedDatabase = async () => {
//     try {
//         // Clear existing data
//         await Product.deleteMany({});
//         await User.deleteMany({});
//         await Cart.deleteMany({});
//         await Mentorship.deleteMany({});
//         await MentorshipTopic.deleteMany({});
//         await Order.deleteMany({});

//         // Create Users
//         const users = [
//             {
//                 name: 'John Doe',
//                 email: 'john@example.com',
//                 password: 'password123',
//                 role: 'Entrepreneur',
//                 location: 'Lahore, Pakistan',
//                 contactNumber: '1234567890',
//             },
//             {
//                 name: 'Jane Smith',
//                 email: 'jane@example.com',
//                 password: 'password123',
//                 role: 'Mentor',
//                 location: 'Karachi, Pakistan',
//                 contactNumber: '0987654321',
//             },
//             {
//                 name: 'Admin User',
//                 email: 'admin@example.com',
//                 password: 'admin123',
//                 role: 'Admin',
//                 location: 'Islamabad, Pakistan',
//                 contactNumber: '1122334455',
//             },
//         ];

//         const createdUsers = await User.insertMany(users);

//         // Create Products
//         const products = [
//             {
//                 title: 'Organic Tomatoes',
//                 description: 'Fresh and organic tomatoes grown in the local farm.',
//                 price: 300,
//                 ownerId: createdUsers[0]._id, // Reference to the entrepreneur user
//                 category: 'Organic Produce',
//                 imageUrl: ['https://example.com/images/tomatoes.jpg'],
//             },
//             {
//                 title: 'Handmade Pottery Mug',
//                 description: 'Beautiful handmade pottery mug for your morning coffee.',
//                 price: 500,
//                 ownerId: createdUsers[0]._id, // Reference to the entrepreneur user
//                 category: 'Handicrafts',
//                 imageUrl: ['https://example.com/images/mug.jpg'],
//             },
//         ];

//         const createdProducts = await Product.insertMany(products);

//         // Create Cart
//         const carts = createdUsers.map(user => ({
//             userId: user._id,
//             items: [
//                 {
//                     productId: createdProducts[0]._id,
//                     quantity: 2,
//                 },
//             ],
//         }));

//         await Cart.insertMany(carts);

//         // Create Mentorship Topics
//         const mentorshipTopics = [
//             {
//                 title: 'Sustainable Farming Practices',
//                 description: 'Learn how to implement sustainable farming practices to improve yield and reduce environmental impact.',
//                 mentor: createdUsers[1]._id, // Reference to mentor
//                 category: 'Agriculture & Farming',
//             },
//             {
//                 title: 'Basic Business Marketing',
//                 description: 'A session on how to market your small business online and offline.',
//                 mentor: createdUsers[1]._id, // Reference to mentor
//                 category: 'Business & Marketing',
//             },
//         ];

//         const createdMentorshipTopics = await MentorshipTopic.insertMany(mentorshipTopics);

//         // Create Orders
//         const orders = [
//             {
//                 buyerId: createdUsers[0]._id, // Reference to buyer (entrepreneur)
//                 productId: createdProducts[0]._id, // Reference to product
//                 quantity: 1,
//                 totalPrice: 300,
//                 status: 'Confirmed',
//             },
//             {
//                 buyerId: createdUsers[0]._id, // Reference to buyer (entrepreneur)
//                 productId: createdProducts[1]._id, // Reference to product
//                 quantity: 1,
//                 totalPrice: 500,
//                 status: 'Pending',
//             },
//         ];

//         await Order.insertMany(orders);

//         console.log('Data seeding completed');
//     } catch (error) {
//         console.error('Error during data seeding:', error);
//     } finally {
//         mongoose.disconnect();
//     }
// };

// seedDatabase();


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User'); // Adjust path as needed

// async function hashPasswords() {
//     await mongoose.connect('mongodb://localhost:27017/farmpreneur', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });

//     const users = await User.find();

//     for (const user of users) {
//         if (!user.password.startsWith('$2')) { // Check if password is not already hashed
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(user.password, salt);
//             await user.save();
//             console.log(`Password hashed for user: ${user.email}`);
//         }
//     }

//     console.log('Password hashing complete.');
//     mongoose.disconnect();
// }

// hashPasswords();


// const bcrypt = require('bcryptjs');

// const storedHash = '$2a$10$XKiacg8FuTA.ZJfiAtyd7O8zX8eG06zA5xCFr.uB/6neKpb/Idlxa';
// const plainPassword = 'password123';

// async function checkPassword() {
//     try {
//         const isMatch = await bcrypt.compare(plainPassword, storedHash);
//         console.log('Password Match:', isMatch); // Should print true
//     } catch (err) {
//         console.error('Error comparing password:', err);
//     }
// }

// checkPassword();

const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const { ObjectId } = mongoose.Types;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/farmpreneur')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection error:', err));

// Example to find a cart and populate the userId field
Cart.findOne({ userId: new ObjectId('676fa427fe8bac1fce1cde4e') })
    .populate('userId')  // Populates the user details from the 'User' model
    .populate('items.productId')  // Populates the product details from the 'Product' model
    .then(cart => {
        console.log(JSON.stringify(cart, null, 2));  // Use JSON.stringify to format the output
    })
    .catch(err => {
        console.error('Error fetching cart:', err);
    });


