const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const patient = await Patient.findOne({ email, password });
  if (patient) res.json(patient);
  else res.status(401).json({ error: 'Invalid credentials' });
});

// Register
router.post('/register', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all (for Admin or Doctor)
router.get('/', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

// Add health metric
router.post('/:id/metrics', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    patient.healthMetrics.push(req.body);
    await patient.save();
    res.json(patient.healthMetrics);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
