const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        category: { type: String, enum: ['Handicrafts', 'Organic Produce'], required: true },
        imageUrl: [{ type: String }],
        status: { type: String, enum: ['Available', 'Sold', 'Out of Stock'], default: 'Available' },
        ratings: { type: [Number], default: [] },
        stock: { type: Number, default: 1 },
        soldCount: { type: Number, default: 0 },
        tags: { type: [String], default: [] },
        reviews: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                comment: { type: String },
                rating: { type: Number, min: 1, max: 5 },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
