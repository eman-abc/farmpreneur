const mongoose = require('mongoose');
const User = require('./User');

const financialAidSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    eligibilityCriteria: { type: String },
    amount: { type: Number, required: true },
    contactEmail: { type: String, required: true }, // Added contact email
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FinancialAid', financialAidSchema);
