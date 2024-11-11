const mongoose = require('mongoose');

const filterCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  isOnSale: { type: Boolean, default: false },
  images: [{ type: String, required: true }], 
  hoverImage: { type: String, required: true }, 
  description: { type: String }, 
  stock: { type: Number, default: 0 }, 
  category: { type: String, required: true }, 
  size: { type: String, enum: ["S", "M", "L", "XL", "XXL"], default: "M" },
  color: { type: String }, 
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
});

filterCardSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('FilterCard', filterCardSchema);
