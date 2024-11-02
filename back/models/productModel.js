const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  isOnSale: { type: Boolean, default: false },
  category: {
    type: String,
    enum: ['Featured', 'Latest', 'Bestseller'],
    required: true,
  },
  images: [{ type: String, required: true }], 
  hoverImage: { type: String, required: true }, 
  description: { type: String }, 
  stock: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
