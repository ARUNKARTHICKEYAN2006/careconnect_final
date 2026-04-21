import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

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

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 }
  };

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <h1 className="page-title">Book an Appointment</h1>
      <p className="page-subtitle">Select a specialist and confirm your timeslot.</p>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1" 
            initial="initial" animate="in" exit="out" variants={pageVariants}
            className="metrics-grid"
          >
            {doctors.map((doc, idx) => (
              <motion.div 
                key={doc.id} 
                className="glass-panel" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(79, 70, 229, 0.15)' }}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{doc.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{doc.spec}</p>
                    <span style={{ background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>⭐ {doc.rating}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary)' }}>₹{doc.fee}</span>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" onClick={() => setStep(2)}>
                    Select
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2" 
            initial="initial" animate="in" exit="out" variants={pageVariants}
            className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Confirm Payment</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>Proceed with secure checkout via mock payment gateway.</p>
            
            <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(79, 70, 229, 0.1))', borderRadius: '12px', marginBottom: '24px', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                 <span style={{ color: 'var(--text-light)' }}>Date</span>
                 <span style={{ fontWeight: 500 }}>Tomorrow, 10:00 AM</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                 <span style={{ color: 'var(--text-light)' }}>Mode</span>
                 <span style={{ fontWeight: 500 }}>Video Consultation</span>
               </div>
               <hr style={{ margin: '16px 0', borderColor: 'rgba(79, 70, 229, 0.1)' }} />
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total</span>
                 <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>₹1500</span>
               </div>
            </div>

            <motion.button 
              whileHover={{ scale: isProcessing ? 1 : 1.02 }} 
              whileTap={{ scale: isProcessing ? 1 : 0.98 }} 
              className="btn-primary" 
              style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }} 
              onClick={handleBooking} 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
                  Processing Payment...
                </div>
              ) : 'Pay & Confirm'}
            </motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3" 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}
            className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', padding: '40px 24px' }}
          >
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
              style={{ margin: '0 auto 24px', display: 'flex', justifyContent: 'center' }}
            >
              <CheckCircle size={80} color="var(--success)" />
            </motion.div>
            <h3 style={{ fontSize: '2rem', marginBottom: '8px' }}>Booking Confirmed!</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '1.1rem' }}>Your video consultation is successfully scheduled.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <motion.button whileHover={{ scale: 1.05 }} className="btn-secondary" onClick={() => navigate('/patient')}>Dashboard</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} className="btn-primary" onClick={() => navigate('/consultation/demo123')}>Join Room Now</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookAppointment;
