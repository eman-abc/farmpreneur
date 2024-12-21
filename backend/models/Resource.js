const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['PDF', 'Video', 'Link'],
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['Marketing', 'Finance', 'Product Development'],
            required: true,
        },
        uploaderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Resource', resourceSchema);
