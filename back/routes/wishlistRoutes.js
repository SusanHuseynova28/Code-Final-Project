const express = require("express");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

router.post("/add", addToWishlist);
router.get("/", getWishlist);
router.delete("/remove", removeFromWishlist);

module.exports = router;
