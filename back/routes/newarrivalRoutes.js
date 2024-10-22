// routes/newarrivalRoutes.js
const express = require('express');
const multer = require('multer');
const newarrivalController = require('../controllers/newarrivalController');

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this matches your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// File filter for image types
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maximum file size 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Allowed file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG files are allowed!'));
    }
  },
});

// Define routes
router.get('/newarrivals', newarrivalController.getNewArrivals);
router.post('/newarrivals', upload.array('images', 5), newarrivalController.createNewArrivals);
router.delete('/newarrivals/:id', newarrivalController.deleteNewArrival);
router.put('/newarrivals/:id', newarrivalController.updateNewArrival);

module.exports = router;
