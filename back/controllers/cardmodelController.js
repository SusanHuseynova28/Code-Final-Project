
const mongoose = require('mongoose');
const Card = require('../models/cardModels');


exports.getCardById = async (req, res) => {
  try {
    const { id } = req.params;

   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid card ID format' });
    }

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ message: 'Error fetching card' });
  }
};


exports.addToCart = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid card ID format' });
    }

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({ message: `Added ${quantity} of ${card.name} to cart` });
  } catch (error) {
    console.error('Error adding card to cart:', error);
    res.status(500).json({ message: 'Error adding card to cart' });
  }
};


exports.createCard = async (req, res) => {
  try {
    const { name, price, description, images } = req.body;

   
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of images' });
    }

    const newCard = new Card({
      name,
      price,
      description,
      images,
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ message: 'Error creating card' });
  }
};
