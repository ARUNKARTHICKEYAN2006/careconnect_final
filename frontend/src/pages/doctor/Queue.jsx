import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, FilePlus2, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialPatients = [
  { id: '1', name: 'John Doe', time: '10:00 AM', status: 'Waiting' },
  { id: '2', name: 'Emily Smith', time: '10:30 AM', status: 'Scheduled' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" } }
};

const Queue = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(initialPatients);
  const [showPrescription, setShowPrescription] = useState(false);
  const [activePatient, setActivePatient] = useState(null);

  const handleRxClick = (patient) => {
    setActivePatient(patient);
    setShowPrescription(true);
  };

  const handleSendRx = () => {
    setShowPrescription(false);
    if(activePatient) {
      // Remove patient from queue to simulate completion
      setPatients(patients.filter(p => p.id !== activePatient.id));
      setActivePatient(null);
    }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants} style={{ paddingBottom: '2rem' }}>
      <motion.div variants={itemVariants}>
        <h1 className="page-title">Patient Queue</h1>
        <p className="page-subtitle">Manage today's appointments and ongoing consultations.</p>
      </motion.div>

      <AnimatePresence>
        {showPrescription && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(255,255,255,0.8) 100%)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FilePlus2 color="var(--primary)" /> Digital Prescription Writer for {activePatient?.name}
              </h3>
              <textarea 
                className="input-field" 
                rows={5} 
                placeholder="Write medicines, dosage, duration, and advice here..."
                style={{ marginBottom: '16px', resize: 'vertical' }}
              ></textarea>
              <div style={{ display: 'flex', gap: '12px' }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary" onClick={handleSendRx}>Generate & Send PDF</motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary" onClick={() => setShowPrescription(false)}>Cancel</motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '0', overflow: 'hidden', background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AnimatePresence>
            {patients.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel" style={{ textAlign: 'center', padding: '48px 24px' }}>
                 <CheckCircle size={48} color="var(--success)" style={{ margin: '0 auto 16px' }} />
                 <h3 style={{ fontSize: '1.4rem' }}>Queue is Empty</h3>
                 <p style={{ color: 'var(--text-light)' }}>You have no more patients waiting today! Great job.</p>
              </motion.div>
            ) : (
              patients.map(p => (
                <motion.div 
                  key={p.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                  className="glass-panel"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'rgba(255,255,255,0.6)' }}
                  whileHover={{ backgroundColor: '#ffffff', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', scale: 1.01 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 600 }}>
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', margin: '0 0 4px 0' }}>{p.name}</h4>
                      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> {p.time}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span style={{ padding: '6px 12px', backgroundColor: p.status === 'Waiting' ? '#fef08a' : '#e0e7ff', color: p.status === 'Waiting' ? '#854d0e' : '#3730a3', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                      • {p.status}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" style={{ padding: '10px 16px', display: 'flex', gap: '6px', alignItems: 'center' }} onClick={() => navigate('/consultation/demo123')}>
                        <Video size={18} /> Consult
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary" style={{ padding: '10px', display: 'flex', gap: '6px', alignItems: 'center' }} onClick={() => handleRxClick(p)}>
                        <FilePlus2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Queue;
