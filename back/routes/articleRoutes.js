const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticleBySlug,
  createArticle,
  deleteArticle,
} = require('../controllers/articleController');

// Routes
router.get('/', getArticles);                    // Get all articles
router.get('/:slug', getArticleBySlug);          // Get article by slug
router.post('/', createArticle);                 // Add a new article
router.delete('/:id', deleteArticle);            // Delete article by ID

module.exports = router;
