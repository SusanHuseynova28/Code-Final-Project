const express = require("express");
const router = express.Router();
const { signup, login, logout, getMe } = require("../controllers/authController");


router.post("/signup", signup); 
router.post("/login", login);  

router.get("/me", getMe);

router.post("/logout", logout); 

module.exports = router;
