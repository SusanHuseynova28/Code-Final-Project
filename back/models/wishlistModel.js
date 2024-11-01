const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  hoverImage: { type: String },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
