const mongoose = require('mongoose');

const latestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: String, // Tarixi mətn kimi saxlayırıq
    required: true,
    
  },
});

module.exports = mongoose.model('Latest', latestSchema);
