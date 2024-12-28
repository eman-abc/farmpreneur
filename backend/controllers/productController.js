const Product = require('../models/Product');

// Add CRUD operations for products here

// Create a new product
const updateProductStock = async (productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) return;

  product.stock -= quantity;
  await product.save();
};

module.exports = { updateProductStock };


exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, ownerId, category, imageUrl } = req.body;
    const product = new Product({ title, description, price, ownerId, category, imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

// Update product details
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};



// controllers/productController.js
exports.getEntrepreneurProducts = async (req, res) => {
  console.log('controller entered');
  try {
    // Ensure the user is authenticated and has the 'Entrepreneur' role
    if (!req.session.user || req.session.user.role !== 'Entrepreneur') {
      return res.status(403).json({ message: 'Access denied. Entrepreneur role required.' });
    }

    // Fetch products for the logged-in entrepreneur based on their userId (ownerId)
    const products = await Product.find({ ownerId: req.session.user._id });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this entrepreneur.' });
    }

    console.log(products);
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products.' });
  }
};
