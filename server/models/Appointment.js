const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentType: { type: String, required: true },
  service: { type: String, default: '' },
  zip: { type: String, default: '' },
  date: { type: String, required: true },
  time: { type: Number, default: 0 },
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
