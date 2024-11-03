const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticleBySlug,
  createArticle,
  deleteArticle,
} = require('../controllers/articleController');


router.get('/', getArticles);                
router.get('/:slug', getArticleBySlug);         
router.post('/', createArticle);               
router.delete('/:id', deleteArticle);           

module.exports = router;
