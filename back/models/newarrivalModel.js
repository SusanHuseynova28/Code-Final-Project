const mongoose = require('mongoose');

const newArrivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number, default: null },
  isOnSale: { type: Boolean, default: false },
  images: [{ type: String, required: true }], // Array of image file names
  hoverImage: { type: String, required: true }, // Single hover image file name
  description: { type: String, default: '' },
  stock: { type: Number, default: 0 },
});

// Create the model
const NewArrival = mongoose.model('NewArrival', newArrivalSchema);

module.exports = NewArrival;
