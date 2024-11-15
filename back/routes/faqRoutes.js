const express = require('express');
const { getAllFAQs, getFAQById, addFAQ, updateFAQ, deleteFAQ } = require('../controllers/faqController');

const router = express.Router();

router.get('/faqs', getAllFAQs); 
router.get('/faqs/:id', getFAQById); 
router.post('/faqs', addFAQ); 
router.put('/faqs/:id', updateFAQ);
router.delete('/faqs/:id', deleteFAQ); 

module.exports = router;
