const mongoose = require('mongoose');

// URL-ləri yoxlayan funksiya
const validateURL = (url) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // http və ya https ilə başlamalıdır
    '((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|' + // Domain adı
    'localhost|' + // Yerli host
    '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP adresi
    '\\[?[a-fA-F0-9:.]+\\]?)' + // IPv6
    '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%._+~#=]*)*' + // Port və yol
    '(\\?[;&a-zA-Z0-9%._+~#=]*)?' + // Sorğu stringi
    '(\\#[-a-zA-Z0-9_]*)?$', 'i'
  );
  return !!urlPattern.test(url); // URL düzgün olub-olmadığını yoxlayır
};

const newArrivalSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, default: null, min: 0 }, // Endirim qiyməti
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
}, { timestamps: true }); // Timestamps əlavə edilir (createdAt və updatedAt)

const NewArrival = mongoose.model('NewArrival', newArrivalSchema);

module.exports = NewArrival;
