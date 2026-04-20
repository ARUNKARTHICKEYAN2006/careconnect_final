const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const crypto = require('crypto');

// Create appointment
router.post('/book', async (req, res) => {
  try {
    const { patientId, doctorId, date, timeSlot, mode } = req.body;
    // generate a unique room ID for Jitsi / WebSocket Chat
    const roomName = crypto.randomBytes(8).toString('hex');
    
    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      timeSlot,
      mode,
      roomName,
      status: 'Confirmed' // skipping pending for simplicity unless payment is involved
    });
    
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get appointments for a patient
router.get('/patient/:patientId', async (req, res) => {
  const appointments = await Appointment.find({ patientId: req.params.patientId }).populate('doctorId');
  res.json(appointments);
});

// Get appointments for a doctor
router.get('/doctor/:doctorId', async (req, res) => {
  const appointments = await Appointment.find({ doctorId: req.params.doctorId }).populate('patientId');
  res.json(appointments);
});

module.exports = router;
