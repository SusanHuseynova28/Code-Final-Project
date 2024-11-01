const Wishlist = require("../models/wishlistModel");


exports.addToWishlist = async (req, res) => {
  try {
    const { _id, name, price, images, hoverImage } = req.body;


    let wishlistItem = await Wishlist.findOne({ _id });

    if (wishlistItem) {
      wishlistItem.isDeleted = false;
      await wishlistItem.save();
      return res.status(200).json(wishlistItem);
    }

   
    const newWishlistItem = new Wishlist({ _id, name, price, images, hoverImage, isDeleted: false });
    await newWishlistItem.save();
    res.status(201).json(newWishlistItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist" });
  }
};


exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ isDeleted: false });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { _id } = req.body;
    const wishlistItem = await Wishlist.findOneAndUpdate(
      { _id },
      { isDeleted: true },
      { new: true }
    );

    if (!wishlistItem) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    res.status(200).json({ message: "Product visually removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error removing product from wishlist" });
  }
};
