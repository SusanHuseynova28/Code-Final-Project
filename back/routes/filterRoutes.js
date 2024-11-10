
const express = require('express');
const {
  getPaginatedFilterCards,
  getFilterCardById,
  createFilterCard,
  updateFilterCard,
  deleteFilterCard,

} = require('../controllers/filtercardController');

const router = express.Router();

router.get('/filtercards', getPaginatedFilterCards);
router.get('/filtercards/:id', getFilterCardById); 
router.post('/filtercards', createFilterCard);
router.put('/filtercards/:id', updateFilterCard); 
router.delete('/filtercards/:id', deleteFilterCard); 

module.exports = router;
