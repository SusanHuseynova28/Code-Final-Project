const Product = require('../models/productModel');


exports.getProductsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('Requested Product ID:', id);

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const { name, price, salePrice, isOnSale, category, images, hoverImage, description, stock } = req.body;

    if (!name || !price || !category || !images || !hoverImage) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newProduct = new Product({
      name,
      price,
      salePrice,
      isOnSale,
      category,
      images: Array.isArray(images) ? images : JSON.parse(images),
      hoverImage,
      description,
      stock,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product.' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product.' });
  }
};
