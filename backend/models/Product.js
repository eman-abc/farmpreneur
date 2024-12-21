const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        category: {
            type: String,
            enum: ['Handicrafts', 'Organic Produce'],
            required: true,
        },
        imageUrl: [
            {
                type: String, // Array of image URLs
            },
        ],
        status: {
            type: String,
            enum: ['Available', 'Sold'],
            default: 'Available',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
