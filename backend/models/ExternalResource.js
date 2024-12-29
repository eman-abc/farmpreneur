const mongoose = require('mongoose');

const externalResourceSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the resource
    // description: { type: String, required: true }, // A brief description of the link
    url: { 
        type: String, 
        required: true, 
        validate: {
            validator: function (v) {
                return /^(http|https):\/\/[^ "]+$/.test(v); // Validates the URL format
            },
            message: props => `${props.value} is not a valid URL!`
        },
    },
    category: { type: String, required: true }, // e.g., "Education", "Finance"
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true }, // Reference to NGO
    createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('ExternalResource', externalResourceSchema);
