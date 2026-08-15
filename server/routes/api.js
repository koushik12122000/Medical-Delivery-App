const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Zip = require('../models/Zip');
const Medicine = require('../models/Medicine');
const Order = require('../models/Order');

// --- Auth Routes ---
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid Credentials');
    }
    res.json({ message: 'Login successful', username: user.username });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- ZIP Code Routes ---
router.get('/zip', async (req, res) => {
  try {
    const zips = await Zip.find({});
    res.json(zips.map(z => z.zip));
  } catch (err) {
    res.status(500).json([]);
  }
});

router.post('/add_zip', async (req, res) => {
  try {
    const { zip } = req.body;
    if (!zip) return res.status(400).send('ZIP required');
    const existing = await Zip.findOne({ zip: zip.toString() });
    if (!existing) {
      await Zip.create({ zip: zip.toString() });
    }
    res.json({ message: 'ZIP added' });
  } catch (err) {
    res.status(500).send('Failed to add ZIP');
  }
});

router.post('/delete_zip', async (req, res) => {
  try {
    const { zip } = req.body;
    await Zip.deleteOne({ zip: zip.toString() });
    res.json({ message: 'ZIP deleted' });
  } catch (err) {
    res.status(500).send('Failed to delete ZIP');
  }
});

// --- Appointment Routes ---
router.get('/appointments', async (req, res) => {
  try {
    const { doctor, date, appointmentType, service } = req.query;
    let filter = {};
    if (date) filter.date = date;
    if (appointmentType && appointmentType !== 'Choose...') filter.appointmentType = appointmentType;
    if (service && service !== 'Choose...') filter.service = service;

    const appointments = await Appointment.find(filter).sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json([]);
  }
});

router.post('/appointments', async (req, res) => {
  try {
    const appointmentData = req.body;
    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();
    res.status(201).json({ message: 'Booked successfully', appointment: newAppointment });
  } catch (err) {
    res.status(400).json({ error: 'Failed to book appointment' });
  }
});

router.get('/timeSlots', async (req, res) => {
  try {
    const { date, appointmentType } = req.query;
    if (!date) return res.json([]);
    const query = { date };
    if (appointmentType) query.appointmentType = appointmentType;
    const appointments = await Appointment.find(query);
    const takenSlots = appointments.map(a => a.time).filter(t => t);
    res.json(takenSlots);
  } catch (err) {
    res.status(500).json([]);
  }
});

// --- Medicine Routes ---
router.get('/medicines', async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    const medicines = await Medicine.find(filter);
    res.json(medicines);
  } catch (err) {
    res.status(500).json([]);
  }
});

router.post('/medicines', async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add medicine' });
  }
});

// --- Order Routes ---
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json([]);
  }
});

router.post('/orders', async (req, res) => {
  try {
    const { customerName, phone, email, address, zip, notes, items, totalAmount, paymentMethod } = req.body;

    if (!customerName || !phone || !address || !zip || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required order details' });
    }

    // Verify zip availability
    const validZip = await Zip.findOne({ zip: zip.toString() });
    if (!validZip) {
      return res.status(400).json({ error: 'Delivery is currently not available in your area/PIN code.' });
    }

    const order = new Order({
      customerName,
      phone,
      email,
      address,
      zip,
      notes,
      items,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: 'Pending'
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

module.exports = router;
