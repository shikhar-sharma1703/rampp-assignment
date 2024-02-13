const Product = require('../../model/products');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({...req.body, storeId: req.body.storeId});
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const storeId = req.body.storeId;
    const products = await Product.find(
      { storeId }
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an existing product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search for products
exports.searchProducts = async (req, res) => {
  try {
    const { category, minAmount, maxAmount, amount } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }
    
    if (minAmount || maxAmount) {
      query.amount = {};
    
      if (minAmount) {
        query.amount.$gte = minAmount;
      }
    
      if (maxAmount) {
        query.amount.$lte = maxAmount;
      }
    } else if (amount) {
      query.amount = amount;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
