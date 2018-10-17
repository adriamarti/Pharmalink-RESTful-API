const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: String, required: true },
  productImage: { type: String, required: false },
  weight: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);