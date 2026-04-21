<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/activity.svg" width="80" height="80" alt="CareConnect Logo"/>
  <h1>🏥 CareConnect API & Platform</h1>
  <p><strong>A Modern, AI-Powered Telemedicine & Healthcare Management Masterpiece</strong></p>
</div>

<br/>

> **CareConnect** is a robust, dynamic, and full-stack telemedicine platform that bridges the gap between patients, healthcare professionals, and system administrators. It features ultra-premium "Silicon Valley" glassmorphism UI, real-time video consultations, and blazing-fast AI integrations.

## 🌐 Live Demonstrations

The platform is fully deployed and running live:

- 🖥️ **Frontend Portal**: [https://careconnect-frontend-iu76.onrender.com](https://careconnect-frontend-iu76.onrender.com)
- ⚙️ **Backend API**: [https://careconnect-backend-1i1r.onrender.com](https://careconnect-backend-1i1r.onrender.com)

---

## ✨ The "Masterpiece" Features

CareConnect features distinct portals seamlessly connected to a Node.js backend. The UI is built to feel like an expensive, highly-polished SaaS product.

### 🧑‍⚕️ For Patients
- **Beautiful Health Dashboards**: Track health vitals using vibrant, custom-gradient `Recharts` data visualizers and hovering glass micro-cards.
- **AI Symptom Checker (Groq Llama 3)**: A lightning-fast chat interface featuring smooth bubble animations and a glowing "typing" indicator. Get clinical insights on your symptoms under 800ms.
- **Appointment Engine**: Premium staging and interactive booking flows powered by `Framer Motion`.

### 🩺 For Doctors
- **Interactive Patient Queue**: A fluid queue system where patient rows gracefully enter and exit the screen seamlessly using `<AnimatePresence>`.
- **✨ Magic AI Auto-Prescribe**: Doctors simply type messy shorthand notes (e.g., _"fever 102, paracetamol 500mg, rest"_), and hit the Magic Assist button. **Groq's Llama-3.1-8b** neural network instantly formats it into a professional, printable digital prescription.
- **Video Consultations**: Enter dedicated digital rooms equipped for real-time WebRTC audio/video consultations.

### 🛡️ For Administrators
- **SaaS Control Center**: A sleek, high-end tabular grid to approve or reject doctor verifications with glowing, state-driven badges.

### 🌘 Global "Deep Space" Dark Mode
- An ultra-premium, system-wide dark mode toggle. Switching it repaints the entire screen from pristine whites to a deep onyx (`#0f172a`), retaining all glowing shadows, interactive borders, and smooth 60fps animations.

---

## 🛠️ Technology Stack

**Frontend Architecture**:
- ⚛️ **React 19** & **Vite**: Ultra-fast build tool and modern frontend framework.
- 🎬 **Framer Motion**: State-of-the-art physics-based micro-animations and route transitions.
- 📉 **Recharts**: Fluent, scalable SVG charting and dashboards.
- 🎨 **Vanilla CSS**: Purist glassmorphism design system using advanced CSS Variables.

**Backend & AI Engine**:
- 🟢 **Node.js** & **Express**: Blazing fast server handling RESTful APIs.
- 🧠 **Groq SDK (Llama 3.1 8B)**: Insanely fast LLM inference generating advanced clinical insights and automated prescriptions.
- 🍃 **MongoDB** (Architecture ready): Flexible database models.

---

## 🚀 Local Development

To get a local instance of CareConnect running on your machine:

### 1. Backend Setup:
Navigate to the backend directory, install the dependencies, configure your AI keys, and boot the server.
```bash
cd backend
npm install

# You must add your Groq API Key to an .env file
echo "GROQ_API_KEY=your_key_here" > .env

node server.js
```

### 2. Frontend Setup:
In a new terminal window, initialize the Vite React app.
```bash
cd frontend
npm install
npm run dev
```

### 3. Jump In!
Open `http://localhost:5173/` locally to explore the platform.

<div align="center">
  <p><i>Built to redefine digital healthcare expectations.</i></p>
</div>
