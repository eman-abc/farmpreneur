const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add or update product in cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  // Check if product exists and get the stock
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (quantity > product.stock) {
    return res.status(400).json({ message: 'Insufficient stock available' });
  }

  // Check if the cart already exists for the user
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    // Create a new cart if not exists
    cart = new Cart({ userId, items: [{ productId, quantity }] });
  } else {
    // If the product is already in the cart, update the quantity
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  await cart.save();
  res.status(200).json(cart);
};

// Update product quantity in cart
const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find(item => item.productId.toString() === productId);
  if (!item) return res.status(404).json({ message: 'Product not in cart' });

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (quantity > product.stock) {
    return res.status(400).json({ message: 'Insufficient stock available' });
  }

  item.quantity = quantity;
  await cart.save();

  res.status(200).json(cart);
};

module.exports = { addToCart, updateQuantity };
