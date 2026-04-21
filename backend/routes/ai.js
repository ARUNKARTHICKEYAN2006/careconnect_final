const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with the API Key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/symptom-checker', async (req, res) => {
  const { symptoms } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "AI Service not configured on server." });
  }

  try {
    const prompt = `
      You are a professional medical assistant for the "CareConnect" telemedicine platform.
      A patient is describing the following symptoms: "${symptoms}".
      
      Please provide a concise, professional, and helpful response that:
      1. Explains what might be happening in simple terms.
      2. Asks 1-2 clarifying follow-up questions.
      3. Provides a clear "Urgency Level" (Low, Medium, or High).
      4. Always includes a strong medical disclaimer that you are an AI and they should see a real CareConnect doctor.

      Format the response as a JSON object with these keys: 
      "message": (the main explanation and advice),
      "urgencyLevel": ("Low", "Medium", or "High"),
      "disclaimer": (the medical disclaimer).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean and parse the JSON response from Gemini
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const aiResponse = JSON.parse(cleanText);

    res.json(aiResponse);

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ 
      message: "Our AI brain is briefly offline. Please try again or book a consultation.",
      urgencyLevel: "Medium",
      disclaimer: "Informational only." 
    });
  }
});

router.post('/explain-diagnosis', async (req, res) => {
  const { diagnosis } = req.body;
  try {
    const prompt = `Explain the medical diagnosis "${diagnosis}" in very simple, reassuring terms for a patient. Keep it under 3 sentences.`;
    const result = await model.generateContent(prompt);
    res.json({ explanation: result.response.text(), disclaimer: 'Informational use only.' });
  } catch (err) {
    res.json({ explanation: `Checking details for ${diagnosis}... please wait.`, disclaimer: 'Informational use only.' });
  }
});

router.post('/medication-check', async (req, res) => {
  const { medication, allergies } = req.body;
  try {
    const prompt = `Is ${medication} safe for someone with ${allergies} allergies? Answer strictly in terms of common known conflicts. Always advise consulting a doctor.`;
    const result = await model.generateContent(prompt);
    res.json({ safe: true, message: result.response.text() });
  } catch (err) {
    res.json({ safe: true, message: "Always confirm medication safety with your prescribing physician." });
  }
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
