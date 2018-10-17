const mongoose = require('mongoose');

const legalDataSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true } 
})

module.exports = mongoose.model('LegalData', legalDataSchema);