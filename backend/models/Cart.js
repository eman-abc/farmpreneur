const mongoose = require('mongoose');
const User = require('./User');  // Make sure this path is correct
const Product = require('./Product');  // Ensure this is correct

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: Product, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
