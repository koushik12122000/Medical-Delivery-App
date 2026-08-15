const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 50 },
  img: { type: String, default: '' },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Medicine', medicineSchema);
