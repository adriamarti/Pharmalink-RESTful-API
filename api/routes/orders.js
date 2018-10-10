const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

// GET request for all orders
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /orders"
  });
});

// Create Orders
router.post('/', (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    products: `productsArray`,
    name: req.body.name,
    price: req.body.price
  });

  res.status(201).json({
    message: "Order has been cerated",
    order: order
  });
});

module.exports = router;