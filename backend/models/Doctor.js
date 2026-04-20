const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialisation: String,
  languages: [String],
  experienceYears: Number,
  licenseNumber: String,
  consultationFee: Number,
  isApproved: { type: Boolean, default: false }, // Requires admin approval
  rating: { type: Number, default: 0 },
  totalConsultations: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  availability: [{
    date: String, // format YYYY-MM-DD
    slots: [String] // format HH:mm e.g., '14:30'
  }]
});

module.exports = mongoose.model('Doctor', DoctorSchema);
