const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  medicineId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  zip: { type: String, required: true },
  notes: { type: String, default: '' },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
