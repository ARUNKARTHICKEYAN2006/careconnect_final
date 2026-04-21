const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const fs = require('fs');

// Ensure directories exist
const uploadDirs = ['uploads/prescriptions', 'uploads/reports'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
});

// Set up Multer for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'prescription') {
      cb(null, 'uploads/prescriptions/');
    } else {
      cb(null, 'uploads/reports/');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Upload a single lab report
router.post('/report', upload.single('report'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // The file path that can be served via Express static
  const fileUrl = `/uploads/reports/${req.file.filename}`;
  res.json({ message: 'Report uploaded successfully', url: fileUrl });
});

// Upload a single prescription
router.post('/prescription', upload.single('prescription'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `/uploads/prescriptions/${req.file.filename}`;
  res.json({ message: 'Prescription uploaded successfully', url: fileUrl });
});

module.exports = router;
