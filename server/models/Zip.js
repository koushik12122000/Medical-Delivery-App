const mongoose = require('mongoose');

const zipSchema = new mongoose.Schema({
  zip: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Zip', zipSchema);
