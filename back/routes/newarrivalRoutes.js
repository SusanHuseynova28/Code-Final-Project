const express = require('express');
const newArrivalController = require('../controllers/newarrivalController');

const router = express.Router();


router.get('/', newArrivalController.getNewArrivals); 
router.post('/', newArrivalController.createNewArrival); 
router.put('/:id', newArrivalController.updateNewArrival); 
router.delete('/:id', newArrivalController.deleteNewArrival);

module.exports = router;
