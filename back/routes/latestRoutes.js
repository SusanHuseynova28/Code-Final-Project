// routes/latestRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllLatest,
  getLatestById,
  createLatest,
  updateLatest,
  deleteLatest,
} = require('../controllers/latestControllers');

// Bütün məlumatları əldə et
router.get('/', getAllLatest);

// ID ilə məlumat əldə et
router.get('/:id', getLatestById);

// Yeni məlumat yarat
router.post('/', createLatest);

// Mövcud məlumatı yenilə
router.put('/:id', updateLatest);

// Məlumatı sil
router.delete('/:id', deleteLatest);

module.exports = router;
