const mongoose = require('mongoose');

const contactPointSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  owner: mongoose.Schema.Types.ObjectId,
  type: { type: String, required: true },
  value: { type: String, required: true }, 
})

module.exports = mongoose.model('ContactPoint', contactPointSchema);