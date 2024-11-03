// routes/cardRoute.js
const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardmodelController');

// Route to create a new card
router.post('/create', cardController.createCard);

// Route to add a card to the cart
router.post('/add-to-cart', cardController.addToCart);

// Route to get a card by ID
router.get('/:id', cardController.getCardById);

module.exports = router;
