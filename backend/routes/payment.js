const express = require('express');
const router = express.Router();

// Mock Stripe/Razorpay local API
router.post('/checkout', (req, res) => {
  const { amount, currency } = req.body;
  // In a real scenario, this returns a client secret or payment intent ID
  res.json({
    clientSecret: 'mock_secret_12345',
    status: 'success',
    amountProcessed: amount,
    message: 'Payment mock successfully processed locally.'
  });
});

module.exports = router;
