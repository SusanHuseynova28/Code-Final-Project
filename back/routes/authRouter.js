const express = require("express");
const router = express.Router();
const { signup, login, logout, getMe } = require("../controllers/authController");

// Authentication routes
router.post("/signup", signup); // Register new user
router.post("/login", login);   // Login user

// User routes
router.get("/me", getMe); // Get logged-in user details

// Logout route
router.post("/logout", logout); // Logout user

module.exports = router;
