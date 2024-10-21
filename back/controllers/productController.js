const Product = require('../models/productModel');

// GET products by category
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const filter = category ? { category } : {}; // Apply filter if category exists
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};



// POST create a new product
exports.createProduct = async (req, res) => {
    try {
      const { name, price, salePrice, isOnSale, category, images, hoverImage, description, stock } = req.body;
  
      // Gerekli alanların kontrolü
      if (!name || !price || !category || !images || !hoverImage) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
      }
  
      const parsedImages = Array.isArray(images) ? images : JSON.parse(images);
  
      const newProduct = new Product({
        name,
        price,
        salePrice,
        isOnSale,
        category,
        images: parsedImages,
        hoverImage,
        description,
        stock,
      });
  
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error); // Hata mesajını konsola yazdır
      res.status(500).json({ message: 'Error creating product.' });
    }
  };
  
// DELETE product by ID
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
