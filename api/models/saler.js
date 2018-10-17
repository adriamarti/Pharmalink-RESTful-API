const mongoose = require('mongoose');

const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const salerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, match: emailRegEx },
  legalData: { type: Object, default: null },
  name: { type: String, default: null },
  password: { type: String, required: true },
  contactPoints: { type: Array, default: null },
  validAccount: { type: Boolean, default: true }
});

module.exports = mongoose.model('Saler', salerSchema);