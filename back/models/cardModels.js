// models/cardModel.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: [{ type: String, required: true }], // Array of image URLs
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
