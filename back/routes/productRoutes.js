const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
  
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(new Error('Only jpeg, jpg, and png files are allowed!'));
      }
    },
  });
  


router.get('/products', productController.getProductsByCategory);
router.post('/products', upload.array('images', 5), productController.createProduct);
router.delete('/products/:id', productController.deleteProduct);
router.put('/products/:id', productController.updateProduct);
router.post('/products', upload.array('images', 5), (req, res, next) => {
    console.log(req.files); 
    productController.createProduct(req, res);
  }); 
module.exports = router;
