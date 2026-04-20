# 🏥 CareConnect - Modern Web Telemedicine Platform

> **CareConnect** is a robust, dynamic, and full-stack telemedicine and healthcare management platform that easily bridges the gap between patients, healthcare professionals, and system administrators. 

## 🌟 Key Features

CareConnect features distinct portals seamlessly connected to a robust Node.js backend:

- **🧑‍⚕️ Patient Portal**: Securely book appointments, review medical records, and check symptoms with an AI-driven health assistant.
- **🩺 Doctor Portal**: Manage active patient queues, access digital consultation rooms (via Jitsi), write digital prescriptions, and track daily schedules.
- **🛡️ Admin Portal**: Monitor complex system analytics and rapidly approve or manage onboarding doctors.
- **⚡ Real-time Interactivity**: Real-time websocket infrastructure ensures live updates, notifications, and instantaneous chat features.
- **✨ Premium UI/UX**: Designed using Vite, React, vanilla CSS, and Framer Motion, delivering staggering frame-perfect animations, snappy responsive layouts, and glassmorphism styling.

## 🛠️ Technology Stack

**Frontend Architecture**:
- ⚛️ **React 19** & **Vite**: Ultra-fast build tool and modern frontend library.
- 🎬 **Framer Motion**: State-of-the-art interactive micro-animations and route transitions.
- 📊 **Recharts** & **Lucide-React**: Dynamic data handling and scalable modern icons.

**Backend Infrastructure**:
- 🟢 **Node.js** & **Express**: Blazing fast server handling scaling APIs.
- 🍃 **MongoDB** & **Mongoose**: Flexible NoSQL document database.
- 🔌 **Socket.io**: Real-time bidirectional event-based communication.

## 🚀 Getting Started

To get a local instance of CareConnect running on your machine:

### 1. Backend Setup:
Navigate to the backend directory, install the required dependencies, and boot the server.
```bash
cd backend
npm install
node server.js
```
*(Ensure you have a MongoDB instance running for database connections).*

### 2. Frontend Setup:
In a new terminal window, initialize the Vite React app.
```bash
cd frontend
npm install
npm run dev
```

### 3. Usage:
Open your browser and navigate to `http://localhost:5173/` (or the port specified by Vite) to explore the CareConnect platform.
