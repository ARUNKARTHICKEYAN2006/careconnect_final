const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Simple plain text for demo, use bcrypt in prod
  age: Number,
  gender: String,
  bloodGroup: String,
  allergies: [String],
  existingConditions: [String],
  healthMetrics: [{
    date: { type: Date, default: Date.now },
    weight: Number,
    height: Number,
    bmi: Number,
    bloodPressureSys: Number,
    bloodPressureDia: Number,
    sugarLevel: Number
  }],
  prescriptions: [{
    fileName: String,
    url: String,
    date: { type: Date, default: Date.now }
  }],
  reports: [{
    fileName: String,
    url: String,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Patient', PatientSchema);
