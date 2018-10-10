const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/authorization')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./uploads/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}_${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === `image/png` || file.mimetype === `image/jpeg`) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024*1024*2 // Limit size of files to 2MB
  },
  fileFilter: fileFilter
});

const Product = require('../models/product');

// GET request for all products
router.get('/', (req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
      console.log(docs);
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(200).json({
          message: `No products found`
        });
      }
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// POST request to create a new product
router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  product.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: `Handling POST request to /products`,
        createdProduct: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

// GET request for single product
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(`From Data Base`, doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: `No valid product for the provided Product ID`
        });
      }
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
});

// PATCH (update) request for single product
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;

  Product.update({ _id: id }, { $set: req.body})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// DELETE (update) request for single product
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;

  Product.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;