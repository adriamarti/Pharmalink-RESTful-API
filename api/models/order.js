const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: { type: Array, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: `Product` },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);