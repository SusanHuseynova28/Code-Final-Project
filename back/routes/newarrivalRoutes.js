const express = require('express');
const newArrivalController = require('../controllers/newarrivalController');

const router = express.Router();

// CRUD marşrutları
router.get('/', newArrivalController.getNewArrivals); // Bütün məhsulları çəkmək
router.post('/', newArrivalController.createNewArrival); // Yeni məhsul yaratmaq
router.put('/:id', newArrivalController.updateNewArrival); // Məhsulu yeniləmək
router.delete('/:id', newArrivalController.deleteNewArrival); // Məhsulu silmək

module.exports = router;
