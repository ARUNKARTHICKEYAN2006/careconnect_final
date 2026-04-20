import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import PatientPortal from './pages/patient/PatientPortal';
import DoctorPortal from './pages/doctor/DoctorPortal';
import AdminPortal from './pages/admin/AdminPortal';
import ConsultationRoom from './pages/shared/ConsultationRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Patient Routes */}
        <Route path="/patient/*" element={<PatientPortal />} />

        {/* Doctor Routes */}
        <Route path="/doctor/*" element={<DoctorPortal />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminPortal />} />

        {/* Shared Video/Chat Room */}
        <Route path="/consultation/:roomId" element={<ConsultationRoom />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
