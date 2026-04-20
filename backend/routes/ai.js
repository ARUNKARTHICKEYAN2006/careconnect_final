const express = require('express');
const router = express.Router();

// Mock endpoints matching the user's request:
// - "explain my diagnosis"
// - "is this medication safe"
// - "prepare me for my appointment"
// - "symptom checker"

router.post('/symptom-checker', (req, res) => {
  const { symptoms } = req.body;
  res.json({
    message: `Based on your symptoms: ${symptoms}, you might be experiencing a common seasonal viral infection or allergic reaction.`,
    urgencyLevel: 'Medium',
    disclaimer: 'Always label as informational, not diagnostic. Please consult a doctor for official medical advice.'
  });
});

router.post('/explain-diagnosis', (req, res) => {
  const { diagnosis } = req.body;
  res.json({
    explanation: `You asked about "${diagnosis}". In simple terms, this means your body's immune system is overreacting to a harmless substance. Please check with your doctor for specifics.`,
    disclaimer: 'Informational use only.'
  });
});

router.post('/medication-check', (req, res) => {
  const { medication, allergies } = req.body;
  res.json({
    safe: true,
    message: `We checked ${medication} against your known allergies: ${allergies}. There are no known conflicts in our database, but always confirm with your doctor.`
  });
});

router.post('/appointment-prep', (req, res) => {
  res.json({
    questions: [
      "What are the possible side effects of the treatment?",
      "Are there any alternatives?",
      "How long before I see improvements?",
      "Are there any lifestyle changes I should make?"
    ]
  });
});

module.exports = router;
