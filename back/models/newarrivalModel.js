const mongoose = require('mongoose');


const validateURL = (url) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + 
    '((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|' + 
    'localhost|' + 
    '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + 
    '\\[?[a-fA-F0-9:.]+\\]?)' + 
    '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%._+~#=]*)*' + 
    '(\\?[;&a-zA-Z0-9%._+~#=]*)?' + 
    '(\\#[-a-zA-Z0-9_]*)?$', 'i'
  );
  return !!urlPattern.test(url); 
};

const newArrivalSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, default: null, min: 0 },
  isOnSale: { type: Boolean, default: false },
  hoverImage: {
    type: String,
    required: true,
    validate: [validateURL, 'Invalid URL format for hoverImage'],
  },
  image: {
    type: String,
    required: true,
    validate: [validateURL, 'Invalid URL format for image'],
  },
}, { timestamps: true });

const NewArrival = mongoose.model('NewArrival', newArrivalSchema);

module.exports = NewArrival;
