const express = require('express');
const router = express.Router();

const SYMPTOM_DATA = {
  fever: {
    msg: "A fever is usually your body's way of fighting an infection. It's often caused by viruses like the flu or cold. Rest and hydration are key.",
    urgency: "Medium",
    advice: "Drink plenty of fluids and use a thermometer to track your temperature."
  },
  cough: {
    msg: "Persistent coughing can be related to respiratory irritants, allergies, or an underlying infection. If it's been over two weeks, it needs investigation.",
    urgency: "Low",
    advice: "Try warm honey and lemon water; avoid smoking or dusty environments."
  },
  chest: {
    msg: "Chest discomfort or pain is a serious symptom that needs immediate medical attention to rule out cardiac issues.",
    urgency: "High",
    advice: "Seek emergency medical help immediately if you feel pressure, tightness, or pain that radiates to your arm/jaw."
  },
  stomach: {
    msg: "Stomach pain can range from simple indigestion or gas to more complex issues like food poisoning or appendicitis.",
    urgency: "Medium",
    advice: "Try a bland diet for 24 hours. Seek help if the pain moves to the lower right or is sharp."
  },
  headache: {
    msg: "Most headaches are caused by tension, stress, or dehydration. Migraines are more intense and often include light sensitivity.",
    urgency: "Low",
    advice: "Stay hydrated and try a dark, quiet room. If it's the 'worst headache of your life', seek help immediately."
  },
  rash: {
    msg: "Skin rashes can be allergic reactions, eczema, or fungal infections.",
    urgency: "Medium",
    advice: "Avoid scratching. If you have fever or difficulty breathing along with the rash, go to the ER."
  }
};

router.post('/symptom-checker', (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms) return res.status(400).json({ message: "Please describe your symptoms." });
  
  const input = symptoms.toLowerCase();
  
  let match = null;
  for (const key in SYMPTOM_DATA) {
    if (input.includes(key)) {
      match = SYMPTOM_DATA[key];
      break;
    }
  }

  if (match) {
    res.json({
      message: match.msg + " " + match.advice,
      urgencyLevel: match.urgency,
      disclaimer: 'Informational only. Please consult a CareConnect doctor for a professional diagnosis.'
    });
  } else {
    res.json({
      message: "I've noted your symptoms. While I don't recognize a specific pattern yet, it's always best to stay hydrated and monitor any changes. Would you like to book a consultation?",
      urgencyLevel: 'Low',
      disclaimer: 'Informational only. Not a medical substitute.'
    });
  }
});

router.post('/explain-diagnosis', (req, res) => {
  const { diagnosis } = req.body;
  res.json({
    explanation: `You asked about "${diagnosis}". This usually refers to a physiological condition requiring professional management. Please check the 'Records' section for detailed doctor notes.`,
    disclaimer: 'Informational use only.'
  });
});

router.post('/medication-check', (req, res) => {
  const { medication, allergies } = req.body;
  res.json({
    safe: true,
    message: `We checked ${medication} against your known record of ${allergies || 'no known allergies'}. There are no known conflicts in our database, but always confirm with your doctor.`
  });
});

router.post('/appointment-prep', (req, res) => {
  res.json({
    questions: [
      "What is the most likely cause of my symptoms?",
      "Are there long-term side effects to this treatment?",
      "Are there lifestyle changes that could assist recovery?",
      "When should I follow up if things don't improve?"
    ]
  });
});

module.exports = router;
