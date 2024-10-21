const mongoose = require('mongoose');

// Product schema
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
  images: [{ type: String, required: true }], // Görsel URL'leri
  hoverImage: { type: String, required: true }, // Hover görseli URL'si
  description: { type: String }, // Ürün açıklaması
  stock: { type: Number, default: 0 }, // Stok durumu
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
