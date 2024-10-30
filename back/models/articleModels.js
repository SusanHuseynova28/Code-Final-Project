const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  slug: { type: String, required: true, unique: true },  // New slug field
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
