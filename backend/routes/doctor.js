const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email, password });
  if (doctor) {
    if(!doctor.isApproved) return res.status(403).json({ error: 'Awaiting admin approval' });
    res.json(doctor);
  } else res.status(401).json({ error: 'Invalid credentials' });
});

// Register
router.post('/register', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json({ message: 'Registered. Waiting for Admin approval.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all approved doctors
router.get('/', async (req, res) => {
  const doctors = await Doctor.find({ isApproved: true });
  res.json(doctors);
});

// Admin ONLY: Get all doctors (including unapproved)
router.get('/all', async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// Admin ONLY: Approve doctor
router.post('/:id/approve', async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { isApproved: true });
  res.json({ success: true });
});

module.exports = router;
