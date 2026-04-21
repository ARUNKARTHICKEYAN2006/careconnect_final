import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../../config';

const Records = () => {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append('report', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload/report`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Error connecting to the server.');
    } finally {
      setUploading(false);
    }
  };

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

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants} style={{ paddingBottom: '2rem' }}>
      <motion.div variants={itemVariants}>
        <h1 className="page-title">My Records</h1>
        <p className="page-subtitle">Upload lab reports and view past prescriptions securely.</p>
      </motion.div>
      
      <div className="metrics-grid">
        <motion.div variants={itemVariants} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Upload Health Report</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '0.9rem' }}>Upload X-Rays, Scans, and lab results here.</p>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            style={{ display: 'none' }} 
            accept=".pdf,.jpg,.jpeg,.png"
          />

          <motion.div 
            onClick={() => !uploading && fileInputRef.current.click()}
            whileHover={!uploading ? { scale: 1.02, backgroundColor: 'rgba(255,255,255,0.8)' } : {}}
            whileTap={!uploading ? { scale: 0.98 } : {}}
            animate={uploading ? { border: '2px dashed var(--primary)', backgroundColor: 'rgba(79, 70, 229, 0.05)' } : { border: '2px dashed var(--glass-border)' }}
            style={{ 
              padding: '40px', 
              textAlign: 'center', 
              borderRadius: '16px', 
              cursor: uploading ? 'not-allowed' : 'pointer', 
              background: 'rgba(255,255,255,0.5)',
              transition: 'background-color 0.3s ease',
              marginTop: 'auto'
            }}
          >
            {uploading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'inline-block', margin: '0 auto 12px' }}>
                <Loader2 size={36} color="var(--primary)" />
              </motion.div>
            ) : success ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} style={{ margin: '0 auto 12px' }}>
                <CheckCircle size={36} color="var(--success)" />
              </motion.div>
            ) : (
              <Upload size={36} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
            )}
            
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>
              {uploading ? 'Encrypting & Uploading...' : success ? 'Upload Successful!' : 'Click to browse files'}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '8px' }}>PDF, PNG, JPG up to 10MB</p>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Recent Prescriptions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {[
              { title: 'Dr. Sarah (Consultation)', date: 'May 14, 2026' },
              { title: 'Annual Health Check', date: 'April 20, 2026' },
              { title: 'Blood Work Results', date: 'March 05, 2026' }
            ].map((doc, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 5, backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.5)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer' }}
              >
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '10px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '10px' }}>
                    <FileText color="var(--primary)" size={20} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>{doc.title}</p>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.8rem', margin: 0 }}>{doc.date}</p>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="btn-secondary" style={{ padding: '8px', border: 'none', background: 'transparent' }}>
                  <Download size={20} color="var(--text-dark)" />
                </motion.button>
              </motion.div>
            ))}

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Records;
