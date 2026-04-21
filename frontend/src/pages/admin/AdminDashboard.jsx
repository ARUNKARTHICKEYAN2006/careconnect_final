import React, { useState } from 'react';
import { CheckCircle, XCircle, Users, UserCheck, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([
    { id: '1', name: 'Dr. Jane Smith', spec: 'Neurologist', license: 'MED12345', status: 'Pending' },
    { id: '2', name: 'Dr. Rahul Patel', spec: 'Dermatologist', license: 'MED54321', status: 'Pending' },
  ]);

  const approveDoctor = (id) => {
    setDoctors(prev => prev.map(doc => doc.id === id ? { ...doc, status: 'Approved' } : doc));
  };

  const rejectDoctor = (id) => {
    setDoctors(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants} style={{ paddingBottom: '2rem' }}>
      <motion.div variants={itemVariants}>
        <h1 className="page-title">Platform Administration</h1>
        <p className="page-subtitle">Manage doctor approvals and view system analytics.</p>
      </motion.div>

      <div className="metrics-grid" style={{ marginBottom: '32px' }}>
        <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(0,0,0,0.05)' }} className="glass-panel" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px' }}><Users size={32} color="#3b82f6" /></div>
          <div>
            <h3 style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Registered Patients</h3>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--text-dark)', margin: 0, lineHeight: 1 }}>1,245</h1>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(16, 185, 129, 0.05)' }} className="glass-panel" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px' }}><UserCheck size={32} color="#10b981" /></div>
          <div>
            <h3 style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Verified Doctors</h3>
            <h1 style={{ fontSize: '2.5rem', color: '#059669', margin: 0, lineHeight: 1 }}>156</h1>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(239, 68, 68, 0.05)' }} className="glass-panel" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '16px' }}><Clock size={32} color="#ef4444" /></div>
          <div>
            <h3 style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Pending Approvals</h3>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--danger)', margin: 0, lineHeight: 1 }}>{doctors.filter(d => d.status === 'Pending').length}</h1>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', background: '#ffffff' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Doctor Approvals Queue</h3>
        </div>
        
        {doctors.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-light)' }}>No doctors currently in the queue.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fafafa' }}>
            <thead style={{ background: '#f1f5f9', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Doctor Name</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Specialisation</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>License No.</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {doctors.map(doc => (
                  <motion.tr 
                    key={doc.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.2 }}
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', background: '#ffffff' }}
                  >
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #ec4899)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                          {doc.name.charAt(4)}
                        </div>
                        <strong style={{ fontSize: '1.05rem' }}>{doc.name}</strong>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-light)' }}>{doc.spec}</td>
                    <td style={{ padding: '16px 24px', fontFamily: 'monospace', letterSpacing: '1px' }}>{doc.license}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ 
                        padding: '6px 12px', 
                        backgroundColor: doc.status === 'Pending' ? 'rgba(250, 204, 21, 0.2)' : 'rgba(16, 185, 129, 0.1)', 
                        color: doc.status === 'Pending' ? '#a16207' : '#059669', 
                        borderRadius: '20px', 
                        fontSize: '0.85rem', 
                        fontWeight: 700 
                      }}>
                        • {doc.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      {doc.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <motion.button 
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="btn-primary" 
                            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--success)', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }} 
                            onClick={() => approveDoctor(doc.id)}
                          >
                            <CheckCircle size={18} />
                            <span style={{ fontSize: '0.9rem' }}>Approve</span>
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="btn-secondary" 
                            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--danger)', borderColor: 'var(--danger)', background: 'transparent' }}
                            onClick={() => rejectDoctor(doc.id)}
                          >
                            <XCircle size={18} />
                            <span style={{ fontSize: '0.9rem' }}>Reject</span>
                          </motion.button>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-light)', fontStyle: 'italic', fontSize: '0.9rem' }}>Processed</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
