
const express = require('express');
const router = express.Router();
const {
  getAllLatest,
  getLatestById,
  createLatest,
  updateLatest,
  deleteLatest,
} = require('../controllers/latestControllers');


router.get('/', getAllLatest);


router.get('/:id', getLatestById);


router.post('/', createLatest);

router.put('/:id', updateLatest);


router.delete('/:id', deleteLatest);

module.exports = router;
