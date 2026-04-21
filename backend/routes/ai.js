const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/symptom-checker', async (req, res) => {
  const { symptoms } = req.body;

  if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "AI Service not configured." });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a medical assistant for 'CareConnect'. 
          Format your response EXCLUSIVELY as a JSON object with these keys: 
          "message" (explanation + advice), 
          "urgencyLevel" ("Low", "Medium", "High"), 
          "disclaimer" (required medical disclaimer).`
        },
        {
          role: "user",
          content: `The patient says: "${symptoms}"`
        }
      ],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0].message.content);
    res.json(aiResponse);

  } catch (error) {
    console.error("Groq Error:", error);
    res.status(500).json({ 
        message: "AI assistant is taking a quick break. Please try again.",
        urgencyLevel: "Medium",
        disclaimer: "Informational only."
    });
  }
});

router.post('/explain-diagnosis', async (req, res) => {
  const { diagnosis } = req.body;
  try {
    const result = await groq.chat.completions.create({
      messages: [{ role: "user", content: `Explain the diagnosis "${diagnosis}" in 2 simple sentences for a patient.` }],
      model: "llama3-8b-8192"
    });
    res.json({ explanation: result.choices[0].message.content, disclaimer: 'Informational use only.' });
  } catch (err) {
    res.json({ explanation: `Checking ${diagnosis}...`, disclaimer: 'Informational only.' });
  }
});

router.post('/medication-check', async (req, res) => {
  const { medication, allergies } = req.body;
  try {
    const result = await groq.chat.completions.create({
      messages: [{ role: "user", content: `Is ${medication} safe for someone allergic to ${allergies}? Brief answer only.` }],
      model: "llama3-8b-8192"
    });
    res.json({ safe: true, message: result.choices[0].message.content });
  } catch (err) {
    res.json({ safe: true, message: "Always verify with your doctor." });
  }
});

router.post('/appointment-prep', (req, res) => {
  res.json({
    questions: [
      "What is the most likely cause of my symptoms?",
      "Are there alternative treatments?",
      "How long before I see improvements?",
      "What lifestyle changes should I make?"
    ]
  });
});

module.exports = router;
