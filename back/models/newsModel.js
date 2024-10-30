const mongoose = require("mongoose");


const newsSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  author: { type: String, required: true },
});


const News = mongoose.model("News", newsSchema);

module.exports = News;
