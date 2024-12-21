const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
        orderDate: {
            type: Date,
            default: Date.now,
        },
        deliveryDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
