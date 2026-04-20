import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock list of doctors
  const doctors = [
    { id: 'doc1', name: 'Dr. Sarah Jenkins', spec: 'Cardiologist', fee: 1500, rating: 4.8 },
    { id: 'doc2', name: 'Dr. Alok Verma', spec: 'General Physician', fee: 800, rating: 4.5 },
  ];

  const handleBooking = () => {
    setIsProcessing(true);
    // Simulate API call to /payment/checkout
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div>
      <h1 className="page-title">Book an Appointment</h1>
      <p className="page-subtitle">Select a specialist and confirm your timeslot.</p>

      {step === 1 && (
        <div className="metrics-grid">
          {doctors.map(doc => (
            <div key={doc.id} className="glass-panel">
              <h3 style={{ fontSize: '1.2rem' }}>{doc.name}</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>{doc.spec} • ⭐ {doc.rating}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>₹{doc.fee}</span>
                <button className="btn-primary" onClick={() => setStep(2)}>Select</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="glass-panel" style={{ maxWidth: '500px' }}>
          <h3>Confirm Payment</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>Proceed with secure checkout via mock payment gateway.</p>
          
          <div style={{ padding: '16px', background: 'rgba(79, 70, 229, 0.05)', borderRadius: '8px', marginBottom: '24px' }}>
             <p><strong>Date:</strong> Tomorrow, 10:00 AM</p>
             <p><strong>Mode:</strong> Video Consultation</p>
             <hr style={{ margin: '12px 0', borderColor: 'rgba(0,0,0,0.05)' }} />
             <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total: ₹1500</p>
          </div>

          <button className="btn-primary" style={{ width: '100%' }} onClick={handleBooking} disabled={isProcessing}>
            {isProcessing ? 'Processing Payment...' : 'Pay & Confirm'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="glass-panel" style={{ maxWidth: '500px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--success)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 16px' }}>✓</div>
          <h3>Booking Confirmed!</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>Your video consultation is successfully scheduled.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-secondary" onClick={() => navigate('/patient')}>Return to Dashboard</button>
            <button className="btn-primary" onClick={() => navigate('/consultation/demo123')}>Join Room Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
