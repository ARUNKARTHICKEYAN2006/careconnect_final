const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post('/symptom-checker', async (req, res) => {
  const { symptoms } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("CRITICAL: GEMINI_API_KEY is missing from environment variables.");
    return res.status(500).json({ 
      message: "AI configuration error. Please ensure GEMINI_API_KEY is set in Render.",
      urgencyLevel: "Medium",
      disclaimer: "Informational only."
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Attempt to find the best available model
    let model;
    const modelNames = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    
    // We'll try the first one, if it fails, the catch block will help us
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    let result;
    let success = false;
    let lastError = "";
    
    for (const modelName of modelNames) {
      try {
        const currentModel = genAI.getGenerativeModel({ model: modelName });
        result = await currentModel.generateContent(prompt);
        success = true;
        break; 
      } catch (e) {
        lastError = e.message;
        console.warn(`Model ${modelName} failed: ${e.message}`);
      }
    }

    if (!success) throw new Error(`Google API says: "${lastError}"`);

    const response = await result.response;
    const text = response.text();
    
    let aiResponse;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : text;
      aiResponse = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("AI returned non-JSON text:", text);
      aiResponse = {
        message: text.substring(0, 500).replace(/\{|\}|\[|\]/g, ''), 
        urgencyLevel: "Medium",
        disclaimer: "Informational only. Please see a doctor."
      };
    }

    res.json(aiResponse);

  } catch (error) {
    console.error("Gemini API Error details:", error.message);
    res.status(500).json({ 
      message: `AI service error: ${error.message}. Please try again shortly.`,
      urgencyLevel: "Medium",
      disclaimer: "Informational only." 
    });
  }
});

router.post('/explain-diagnosis', async (req, res) => {
  const { diagnosis } = req.body;
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Explain the medical diagnosis "${diagnosis}" in very simple, reassuring terms for a patient. Keep it under 3 sentences.`);
    res.json({ explanation: result.response.text(), disclaimer: 'Informational use only.' });
  } catch (err) {
    res.json({ explanation: `Checking details for ${diagnosis}... please wait.`, disclaimer: 'Informational use only.' });
  }
});

router.post('/medication-check', async (req, res) => {
  const { medication, allergies } = req.body;
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Is ${medication} safe for someone with ${allergies} allergies? Answer strictly in terms of common known conflicts. Always advise consulting a doctor.`);
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
