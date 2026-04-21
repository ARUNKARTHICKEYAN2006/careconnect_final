const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

router.post('/symptom-checker', async (req, res) => {
  const { symptoms } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
      console.error("GROQ_API_KEY is missing from Render env vars!");
      return res.status(500).json({ error: "AI Service not configured on Render yet." });
  }

  try {
    const groq = new Groq({ apiKey });
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional medical assistant for 'CareConnect'. Output ONLY JSON with keys: message, urgencyLevel, disclaimer."
        },
        {
          role: "user",
          content: `Analyze symptoms: ${symptoms}`
        }
      ],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" }
    });

    res.json(JSON.parse(chatCompletion.choices[0].message.content));

  } catch (error) {
    console.error("GROQ_ERROR:", error.message);
    res.status(500).json({ 
        message: `Groq error: ${error.message}. Check your API Key in Render.`,
        urgencyLevel: "Medium",
        disclaimer: "Informational only."
    });
  }
});

router.post('/explain-diagnosis', async (req, res) => {
  const { diagnosis } = req.body;
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const result = await groq.chat.completions.create({
      messages: [{ role: "user", content: `Explain diagnosis ${diagnosis} simply.` }],
      model: "llama-3.1-8b-instant"
    });
    res.json({ explanation: result.choices[0].message.content, disclaimer: 'Informational use only.' });
  } catch (err) {
    res.json({ explanation: "Unable to explain at this moment.", disclaimer: 'Informational only.' });
  }
});

router.post('/medication-check', async (req, res) => {
  const { medication, allergies } = req.body;
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const result = await groq.chat.completions.create({
      messages: [{ role: "user", content: `Safety of ${medication} for ${allergies} allergies?` }],
      model: "llama-3.1-8b-instant"
    });
    res.json({ safe: true, message: result.choices[0].message.content });
  } catch (err) {
    res.json({ safe: true, message: "Consult your doctor for safety checks." });
  }
});

router.post('/appointment-prep', (req, res) => {
  res.json({
    questions: ["Cause?", "Treatment duration?", "Side effects?", "Follow-up?"]
  });
});

module.exports = router;
